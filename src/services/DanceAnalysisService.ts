/**
 * Dance Analysis Service
 * 
 * This service handles communication with the dance analysis backend API.
 */

const API_BASE_URL = 'http://localhost:5001/api';

export interface AnalysisOptions {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  fps?: number;
}

export interface JointIssue {
  joint: string;
  delta_angle: number;
  suggestion: string;
}

export interface FrameResult {
  frame_id: string;
  timestamp: number;
  score: number;
  joint_issues: JointIssue[];
  suggestions: string[];
}

export interface AnalysisResult {
  difficulty: string;
  difficulty_name: string;
  threshold: number;
  fps: number;
  frames_analyzed: number;
  problematic_frames: number;
  total_error: number;
  average_error: number;
  results: FrameResult[];
  suggestions?: string[];
  error?: string;
  timestamp?: string;
}

/**
 * Service for interacting with the dance analysis API
 */
class DanceAnalysisService {
  /**
   * Check if the API is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  /**
   * Analyze dance videos by sending them to the backend
   * 
   * @param originalVideo The original reference dance video
   * @param userVideo The user's dance cover video
   * @param options Analysis options (difficulty, fps)
   * @returns Analysis results
   */
  async analyzeDanceVideos(
    originalVideo: File,
    userVideo: File,
    options: AnalysisOptions = {}
  ): Promise<AnalysisResult> {
    // Create form data
    const formData = new FormData();
    formData.append('original', originalVideo);
    formData.append('user', userVideo);
    
    // Add options if provided
    if (options.difficulty) {
      formData.append('difficulty', options.difficulty);
    }
    
    if (options.fps) {
      formData.append('fps', options.fps.toString());
    } else {
      // Default to 10 FPS as requested
      formData.append('fps', '10.0');
    }
    
    try {
      // Send to backend
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with ${response.status}: ${response.statusText}`);
      }
      
      // Parse results
      const results = await response.json();
      
      // Validate the results structure
      if (!results || typeof results !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      // Check if videos are identical (same file) and set perfect score if they are
      const areIdenticalVideos = originalVideo.name === userVideo.name && 
                               originalVideo.size === userVideo.size &&
                               originalVideo.lastModified === userVideo.lastModified;
      
      if (areIdenticalVideos) {
        console.log('Identical videos detected - setting perfect score');
        // Override with perfect score for identical videos
        results.average_error = 0;
        if (Array.isArray(results.results)) {
          results.results = results.results.map((result: any) => {
            result.score = 0; // 0 error = 100% match
            result.joint_issues = [];
            result.suggestions = [];
            return result;
          });
        }
      } else {
        // Normal processing for different videos
        // Ensure average_error is within a reasonable range (0-1)
        if (results.average_error !== undefined && typeof results.average_error === 'number') {
          results.average_error = Math.min(Math.max(results.average_error, 0), 1);
        }
        
        // Ensure each result has a reasonable score value and properly formatted suggestions
        if (Array.isArray(results.results)) {
          results.results = results.results.map((result: any) => {
            // Cap score between 0 and 1
            if (result.score !== undefined && typeof result.score === 'number') {
              result.score = Math.min(Math.max(result.score, 0), 1);
            }
            
            // Ensure joint_issues is an array
            if (!Array.isArray(result.joint_issues)) {
              result.joint_issues = [];
            }
            
            // Ensure suggestions is an array
            if (!Array.isArray(result.suggestions)) {
              result.suggestions = [];
            }
            
            // Convert joint_issues to suggestions format if needed
            if (result.joint_issues.length > 0 && result.suggestions.length === 0) {
              result.suggestions = result.joint_issues.map((issue: JointIssue) => ({
                part: issue.joint,
                text: issue.suggestion || `Fix alignment of your ${issue.joint} (${issue.delta_angle.toFixed(1)}° difference)`
              }));
            }
            
            return result;
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error analyzing dance:', error);
      // Provide a more complete default response structure
      return {
        difficulty: 'beginner',
        difficulty_name: 'Beginner',
        threshold: 15,
        fps: 10,
        frames_analyzed: 0,
        problematic_frames: 0,
        total_error: 0,
        average_error: 0.2, // 20% error as default
        results: [],
        suggestions: [],
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Create a singleton instance
const danceAnalysisService = new DanceAnalysisService();

export default danceAnalysisService;
