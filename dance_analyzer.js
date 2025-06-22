/**
 * Dance Analyzer Component
 * 
 * This component handles video uploads for dance analysis:
 * 1. Allows users to upload original and user dance videos
 * 2. Sends videos to backend for processing when analyze button is clicked
 * 3. Displays analysis results
 */

class DanceAnalyzer {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'http://localhost:5000/api';
    this.difficulty = options.difficulty || 'intermediate';
    this.fps = options.fps || 10.0;
    
    this.originalVideo = null;
    this.userVideo = null;
    this.analysisResults = null;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Original video upload
    const originalUpload = document.getElementById('original-video-upload');
    if (originalUpload) {
      originalUpload.addEventListener('change', (e) => this.handleOriginalVideoUpload(e));
    }
    
    // User video upload
    const userUpload = document.getElementById('user-video-upload');
    if (userUpload) {
      userUpload.addEventListener('change', (e) => this.handleUserVideoUpload(e));
    }
    
    // Analyze button
    const analyzeBtn = document.getElementById('analyze-button');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => this.analyzeDance());
    }
    
    // Difficulty selector
    const difficultySelect = document.getElementById('difficulty-select');
    if (difficultySelect) {
      difficultySelect.addEventListener('change', (e) => {
        this.difficulty = e.target.value;
      });
    }
  }
  
  handleOriginalVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.originalVideo = file;
      this.updateVideoPreview('original-video-preview', file);
      this.updateAnalyzeButtonState();
    }
  }
  
  handleUserVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.userVideo = file;
      this.updateVideoPreview('user-video-preview', file);
      this.updateAnalyzeButtonState();
    }
  }
  
  updateVideoPreview(previewId, file) {
    const preview = document.getElementById(previewId);
    if (preview) {
      // Clear previous preview
      preview.innerHTML = '';
      
      // Create video element
      const video = document.createElement('video');
      video.controls = true;
      video.width = 320;
      video.height = 240;
      
      // Set video source
      const videoURL = URL.createObjectURL(file);
      video.src = videoURL;
      
      // Add to preview container
      preview.appendChild(video);
      
      // Add file name
      const fileName = document.createElement('p');
      fileName.textContent = file.name;
      preview.appendChild(fileName);
    }
  }
  
  updateAnalyzeButtonState() {
    const analyzeBtn = document.getElementById('analyze-button');
    if (analyzeBtn) {
      analyzeBtn.disabled = !(this.originalVideo && this.userVideo);
    }
  }
  
  async analyzeDance() {
    if (!this.originalVideo || !this.userVideo) {
      this.showMessage('Please upload both original and user videos', 'error');
      return;
    }
    
    this.showMessage('Analyzing dance videos... This may take a minute.', 'info');
    
    // Create form data
    const formData = new FormData();
    formData.append('original', this.originalVideo);
    formData.append('user', this.userVideo);
    formData.append('difficulty', this.difficulty);
    formData.append('fps', this.fps.toString());
    
    try {
      // Show loading state
      this.setLoading(true);
      
      // Send to backend
      const response = await fetch(`${this.apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      // Parse results
      const results = await response.json();
      this.analysisResults = results;
      
      // Display results
      this.displayAnalysisResults(results);
      this.showMessage('Analysis complete!', 'success');
    } catch (error) {
      console.error('Error analyzing dance:', error);
      this.showMessage(`Error: ${error.message}`, 'error');
    } finally {
      this.setLoading(false);
    }
  }
  
  displayAnalysisResults(results) {
    const resultsContainer = document.getElementById('analysis-results');
    if (!resultsContainer) return;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Create results summary
    const summary = document.createElement('div');
    summary.className = 'results-summary';
    
    // Add summary information
    summary.innerHTML = `
      <h3>Analysis Results</h3>
      <div class="summary-stats">
        <p><strong>Difficulty:</strong> ${results.difficulty_name}</p>
        <p><strong>Frames Analyzed:</strong> ${results.frames_analyzed}</p>
        <p><strong>Problematic Frames:</strong> ${results.problematic_frames}</p>
        <p><strong>Average Error:</strong> ${results.average_error.toFixed(2)}°</p>
      </div>
    `;
    
    resultsContainer.appendChild(summary);
    
    // Create frame issues section if there are results
    if (results.results && results.results.length > 0) {
      const issuesContainer = document.createElement('div');
      issuesContainer.className = 'frame-issues';
      
      // Add header
      const issuesHeader = document.createElement('h4');
      issuesHeader.textContent = 'Frame Issues';
      issuesContainer.appendChild(issuesHeader);
      
      // Add each frame issue
      results.results.forEach(frame => {
        const frameItem = document.createElement('div');
        frameItem.className = 'frame-item';
        
        // Frame header
        const frameHeader = document.createElement('h5');
        frameHeader.textContent = `Frame ${frame.frame_id} (${frame.timestamp.toFixed(2)}s)`;
        frameItem.appendChild(frameHeader);
        
        // Frame score
        const frameScore = document.createElement('p');
        frameScore.textContent = `Score: ${frame.score.toFixed(2)}°`;
        frameItem.appendChild(frameScore);
        
        // Joint issues
        if (frame.joint_issues && frame.joint_issues.length > 0) {
          const jointList = document.createElement('ul');
          frame.joint_issues.forEach(issue => {
            const jointItem = document.createElement('li');
            jointItem.textContent = `${issue.joint}: ${issue.delta_angle.toFixed(2)}° - ${issue.suggestion}`;
            jointList.appendChild(jointItem);
          });
          frameItem.appendChild(jointList);
        }
        
        issuesContainer.appendChild(frameItem);
      });
      
      resultsContainer.appendChild(issuesContainer);
    }
  }
  
  showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      // Create message element
      const messageEl = document.createElement('div');
      messageEl.className = `message ${type}`;
      messageEl.textContent = message;
      
      // Clear previous messages
      messageContainer.innerHTML = '';
      messageContainer.appendChild(messageEl);
      
      // Auto-hide after 5 seconds for non-error messages
      if (type !== 'error') {
        setTimeout(() => {
          messageEl.remove();
        }, 5000);
      }
    }
  }
  
  setLoading(isLoading) {
    const analyzeBtn = document.getElementById('analyze-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    if (analyzeBtn) {
      analyzeBtn.disabled = isLoading;
      analyzeBtn.textContent = isLoading ? 'Analyzing...' : 'Analyze Dance';
    }
    
    if (loadingIndicator) {
      loadingIndicator.style.display = isLoading ? 'block' : 'none';
    }
  }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DanceAnalyzer;
}
