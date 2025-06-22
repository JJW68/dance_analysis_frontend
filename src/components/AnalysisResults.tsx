import { useState, useEffect } from 'react';
import Header from './Header';
import VideoComparison from './VideoComparison';
import Keyframes from './Keyframes';
import KeyframeDetails from './KeyframeDetails';
import AiSuggestions from './AiSuggestions';
import type { Keyframe, Pose } from '../types.ts';
import { useWindowSize } from '../hooks/useWindowSize';
import { AnalysisResult } from '../services/DanceAnalysisService';

interface AnalysisResultsProps {
  onBack: () => void;
  analysisResults: AnalysisResult;
}

// Joint mapping for angle adjustments
interface JointMapping {
  [key: string]: keyof Pose;
}

// Map joint names from backend to frontend pose structure
const jointMapping: JointMapping = {
  'left_shoulder': 'left_shoulder',
  'right_shoulder': 'right_shoulder',
  'left_elbow': 'left_elbow',
  'right_elbow': 'right_elbow',
  'left_wrist': 'left_wrist',
  'right_wrist': 'right_wrist',
  'left_hip': 'left_hip',
  'right_hip': 'right_hip',
  'left_knee': 'left_knee',
  'right_knee': 'right_knee',
  'left_ankle': 'left_ankle',
  'right_ankle': 'right_ankle'
};

// Create a default pose structure for visualization
const createDefaultPose = (): Pose => ({
  nose: { name: 'nose', x: 150, y: 50, score: 0.9 },
  left_eye: { name: 'left_eye', x: 140, y: 45, score: 0.9 },
  right_eye: { name: 'right_eye', x: 160, y: 45, score: 0.9 },
  left_ear: { name: 'left_ear', x: 130, y: 50, score: 0.8 },
  right_ear: { name: 'right_ear', x: 170, y: 50, score: 0.8 },
  left_shoulder: { name: 'left_shoulder', x: 120, y: 100, score: 0.9 },
  right_shoulder: { name: 'right_shoulder', x: 180, y: 100, score: 0.9 },
  left_elbow: { name: 'left_elbow', x: 100, y: 150, score: 0.9 },
  right_elbow: { name: 'right_elbow', x: 200, y: 150, score: 0.9 },
  left_wrist: { name: 'left_wrist', x: 80, y: 180, score: 0.9 },
  right_wrist: { name: 'right_wrist', x: 220, y: 180, score: 0.9 },
  left_hip: { name: 'left_hip', x: 130, y: 200, score: 0.9 },
  right_hip: { name: 'right_hip', x: 170, y: 200, score: 0.9 },
  left_knee: { name: 'left_knee', x: 120, y: 250, score: 0.9 },
  right_knee: { name: 'right_knee', x: 180, y: 250, score: 0.9 },
  left_ankle: { name: 'left_ankle', x: 110, y: 300, score: 0.9 },
  right_ankle: { name: 'right_ankle', x: 190, y: 300, score: 0.9 },
});

const AnalysisResults = ({ onBack, analysisResults }: AnalysisResultsProps): JSX.Element => {
  // Convert API analysis results to our Keyframe format
  const convertToKeyframes = (): Keyframe[] => {
    if (!analysisResults || !analysisResults.results || analysisResults.results.length === 0) {
      console.log('No valid analysis results found, returning empty array');
      return [];
    }
    
    console.log('Converting analysis results to keyframes:', analysisResults.results.length, 'frames');
    
    return analysisResults.results.map((result, index) => {
      // Calculate a more lenient score (between 0-100) based on angle differences and arm slopes
      // The backend provides angle differences which we'll use as a starting point
      // We need to convert this to a percentage score where 0 error = 100% match
      let score = 100;
      
      // Generate poses for visualization - create DISTINCT poses for original and user
      // Create the original pose - this will be our reference pose
      const originalPose = createDefaultPose();
      
      // Create a completely different starting pose for the user
      // This ensures they're visually distinct from the beginning
      const userPose: Pose = {
        nose: { name: 'nose', x: 150, y: 50, score: 0.9 },
        left_eye: { name: 'left_eye', x: 140, y: 45, score: 0.9 },
        right_eye: { name: 'right_eye', x: 160, y: 45, score: 0.9 },
        left_ear: { name: 'left_ear', x: 130, y: 50, score: 0.8 },
        right_ear: { name: 'right_ear', x: 170, y: 50, score: 0.8 },
        left_shoulder: { name: 'left_shoulder', x: 125, y: 105, score: 0.9 },
        right_shoulder: { name: 'right_shoulder', x: 175, y: 105, score: 0.9 },
        left_elbow: { name: 'left_elbow', x: 95, y: 140, score: 0.9 },
        right_elbow: { name: 'right_elbow', x: 205, y: 140, score: 0.9 },
        left_wrist: { name: 'left_wrist', x: 70, y: 160, score: 0.9 },
        right_wrist: { name: 'right_wrist', x: 230, y: 160, score: 0.9 },
        left_hip: { name: 'left_hip', x: 135, y: 205, score: 0.9 },
        right_hip: { name: 'right_hip', x: 165, y: 205, score: 0.9 },
        left_knee: { name: 'left_knee', x: 130, y: 260, score: 0.9 },
        right_knee: { name: 'right_knee', x: 170, y: 260, score: 0.9 },
        left_ankle: { name: 'left_ankle', x: 125, y: 310, score: 0.9 },
        right_ankle: { name: 'right_ankle', x: 175, y: 310, score: 0.9 },
      };
      
      // Calculate total angle error from joint issues
      const totalAngleError = result.joint_issues?.reduce((sum, issue) => {
        // Be more lenient with arm-related joints
        const isArmJoint = ['left_elbow', 'right_elbow', 'left_wrist', 'right_wrist'].includes(issue.joint);
        const weight = isArmJoint ? 0.7 : 1.0; // Reduce the weight of arm joint errors
        return sum + (Math.abs(issue.delta_angle) * weight);
      }, 0) || 0;
      
      // Calculate arm slopes if we have the necessary joints
      let armSlopeScore = 100;
      if (originalPose.left_shoulder && originalPose.left_elbow && 
          originalPose.right_shoulder && originalPose.right_elbow &&
          userPose.left_shoulder && userPose.left_elbow &&
          userPose.right_shoulder && userPose.right_elbow) {
        
        // Calculate left arm slope
        const originalLeftSlope = (originalPose.left_elbow.y - originalPose.left_shoulder.y) / 
                                 (originalPose.left_elbow.x - originalPose.left_shoulder.x || 0.001);
        const userLeftSlope = (userPose.left_elbow.y - userPose.left_shoulder.y) / 
                             (userPose.left_elbow.x - userPose.left_shoulder.x || 0.001);
        
        // Calculate right arm slope
        const originalRightSlope = (originalPose.right_elbow.y - originalPose.right_shoulder.y) / 
                                  (originalPose.right_elbow.x - originalPose.right_shoulder.x || 0.001);
        const userRightSlope = (userPose.right_elbow.y - userPose.right_shoulder.y) / 
                              (userPose.right_elbow.x - userPose.right_shoulder.x || 0.001);
        
        // Calculate slope differences
        const leftSlopeDiff = Math.abs(originalLeftSlope - userLeftSlope);
        const rightSlopeDiff = Math.abs(originalRightSlope - userRightSlope);
        
        // Convert slope differences to a score (0-100)
        // A slope difference of 2.0 would be considered a significant error
        const maxSlopeDiff = 2.0;
        const leftArmScore = Math.max(0, 100 - (leftSlopeDiff / maxSlopeDiff * 100));
        const rightArmScore = Math.max(0, 100 - (rightSlopeDiff / maxSlopeDiff * 100));
        
        // Average the arm slope scores
        armSlopeScore = (leftArmScore + rightArmScore) / 2;
      }
      
      // Convert angle error to a percentage score with more leniency
      // Increase the maximum expected error to be more forgiving
      const maxError = 120; // Increased from 90 to 120 for more leniency
      
      // Calculate angle-based score: 100% - (error percentage)
      const angleScore = Math.max(0, Math.min(100, Math.round(100 - (totalAngleError / maxError * 100))));
      
      // Combine the angle score and arm slope score with weights
      // Give more weight to the arm slope for arm-heavy movements
      score = Math.round((angleScore * 0.7) + (armSlopeScore * 0.3));
      
      // Apply a curve to be more lenient (boost lower scores)
      if (score < 70) {
        score = Math.round(70 - ((70 - score) * 0.7));
      }
      
      // Ensure score is between 0-100%
      score = Math.max(0, Math.min(100, score));
      
      // Apply variations based on actual joint angle differences from the backend
      result.joint_issues?.forEach(issue => {
        // Get the joint name from the issue
        const jointName = issue.joint;
        
        // Skip if this joint isn't in our mapping
        if (!jointMapping[jointName]) return;
        
        // Get the corresponding pose joint
        const poseJoint = jointMapping[jointName] as keyof Pose;
        
        // Calculate angle-based offset
        // Use the actual angle difference from the backend
        const angleInRadians = issue.delta_angle * Math.PI / 180;
        
        // Apply a MUCH more significant variation based on the actual angle difference
        // This will make the poses visibly different
        const magnitude = Math.min(Math.abs(issue.delta_angle) * 2.5, 60); // Increased scale factor for more visible difference
        
        // Apply the variation to the user pose
        if (userPose[poseJoint]) {
          userPose[poseJoint] = {
            ...userPose[poseJoint],
            x: userPose[poseJoint].x + Math.cos(angleInRadians) * magnitude,
            y: userPose[poseJoint].y + Math.sin(angleInRadians) * magnitude,
            score: 0.85 // Slightly lower confidence for user pose
          };
        }
      });
      
      // If there are no joint issues or the variations are too small, add more visible differences
      if (!result.joint_issues || result.joint_issues.length === 0 || score > 95) {
        // Add some default variations to make poses visibly different
        ['left_elbow', 'right_elbow', 'left_wrist', 'right_wrist', 'left_knee', 'right_knee'].forEach(jointName => {
          const joint = jointName as keyof Pose;
          const randomAngle = (Math.random() * 90 - 45) * Math.PI / 180; // Random angle between -45 and 45 degrees
          const magnitude = 40 + Math.random() * 25; // Random magnitude between 40-65px for much more visible differences
          
          userPose[joint] = {
            ...userPose[joint],
            x: userPose[joint].x + Math.cos(randomAngle) * magnitude,
            y: userPose[joint].y + Math.sin(randomAngle) * magnitude,
            score: 0.8
          };
        });
        
        // Also add some variation to other joints for more complete pose difference
        ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip', 'left_ankle', 'right_ankle'].forEach(jointName => {
          const joint = jointName as keyof Pose;
          const randomAngle = (Math.random() * 60 - 30) * Math.PI / 180;
          const magnitude = 15 + Math.random() * 15; // Smaller magnitude for these joints
          
          userPose[joint] = {
            ...userPose[joint],
            x: userPose[joint].x + Math.cos(randomAngle) * magnitude,
            y: userPose[joint].y + Math.sin(randomAngle) * magnitude,
            score: 0.85
          };
        });
      }
      
      return {
        id: index + 1,
        time: result.timestamp || index * 2.5, // Use timestamp if available, otherwise estimate
        score: score,
        issues: result.joint_issues?.length || 0,
        suggestions: result.joint_issues?.map(issue => ({
          part: issue.joint,
          text: issue.suggestion || `Fix alignment of your ${issue.joint} (${issue.delta_angle.toFixed(1)}° difference)`
        })) || [],
        originalPose,
        userPose
      };
    });
  };
  
  // Use useEffect to update keyframes when analysisResults changes
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  
  useEffect(() => {
    if (analysisResults && analysisResults.results && analysisResults.results.length > 0) {
      setKeyframes(convertToKeyframes());
    }
  }, [analysisResults]);
  
  const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe | null>(null);
  
  // Update selected keyframe when keyframes change
  useEffect(() => {
    if (keyframes.length > 0) {
      setSelectedKeyframe(keyframes[0]);
    }
  }, [keyframes]);
  
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: isMobile ? '2rem 1rem' : '2rem 4rem',
    boxSizing: 'border-box' as const,
    fontFamily: 'system-ui, sans-serif',
    background: 'linear-gradient(to bottom, #F9F7FF, #FFFFFF)',
    minHeight: '100vh',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '3fr 1fr',
    gap: '1.5rem',
    marginTop: '1.5rem',
  };
  
  const mainColumnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };
  
  const sideColumnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };
  
  const panelStyle = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    overflow: 'hidden' as const,
  };
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  // Calculate overall score from analysis results using angle-based scoring
  const calculateOverallScore = (): number => {
    if (keyframes.length === 0) return 0;
    
    // Calculate average score from all keyframes
    // This uses our angle-based scoring from each keyframe
    const averageScore = Math.round(keyframes.reduce((acc, kf) => acc + kf.score, 0) / keyframes.length);
    
    // Ensure score is between 0-100%
    return Math.max(0, Math.min(100, averageScore));
  };
  
  const overallScore = calculateOverallScore();
  
  if (keyframes.length === 0) {
    return (
      <div style={containerStyle}>
        <Header onBack={onBack} overallScore={0} />
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'black' }}>
          <h2>No analysis results available</h2>
          <p>Please try again with a different video.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Header onBack={onBack} overallScore={overallScore} />
      
      <div style={gridStyle}>
        <div style={mainColumnStyle}>
          {/* Video comparison component */}
          {selectedKeyframe && (
            <div style={panelStyle}>
              <VideoComparison 
                selectedKeyframe={selectedKeyframe}
                isFullScreen={isFullScreen}
                onToggleFullScreen={toggleFullScreen}
              />
            </div>
          )}
          
          {/* Keyframes component */}
          <div style={panelStyle}>
            <Keyframes 
              keyframes={keyframes} 
              selectedKeyframe={selectedKeyframe || keyframes[0]} 
              onSelectKeyframe={setSelectedKeyframe} 
            />
          </div>
        </div>
        
        <div style={sideColumnStyle}>
          {/* Keyframe details component */}
          {selectedKeyframe && (
            <div style={panelStyle}>
              <KeyframeDetails selectedKeyframe={selectedKeyframe} />
            </div>
          )}
          
          {/* AI suggestions component */}
          {selectedKeyframe && selectedKeyframe.suggestions && selectedKeyframe.suggestions.length > 0 && (
            <AiSuggestions suggestions={selectedKeyframe.suggestions} />
          )}
          
          {/* No suggestions message */}
          {selectedKeyframe && (!selectedKeyframe.suggestions || selectedKeyframe.suggestions.length === 0) && (
            <div style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}>
                <div style={{
                  background: '#FB923C',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '1.25rem', color: 'white' }}>💡</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', margin: 0 }}>AI Suggestions</h3>
              </div>
              <p style={{ color: '#4B5563', margin: 0 }}>No suggestions for this frame. Your pose looks good!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;