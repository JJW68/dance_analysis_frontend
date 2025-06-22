import React, { useState } from 'react';
import danceAnalysisService, { AnalysisResult } from '../services/DanceAnalysisService';

interface DanceAnalysisIntegrationProps {
  originalVideo: File | null;
  userVideo: File | null;
  difficulty: string;
  onAnalysisComplete: (results: AnalysisResult) => void;
  onAnalysisStart: () => void;
  onAnalysisError: (error: string) => void;
}

/**
 * Component that integrates with the dance analysis backend API
 * This handles sending videos to the backend and processing results
 */
const DanceAnalysisIntegration: React.FC<DanceAnalysisIntegrationProps> = ({
  originalVideo,
  userVideo,
  difficulty,
  onAnalysisComplete,
  onAnalysisStart,
  onAnalysisError
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeClick = async () => {
    if (!originalVideo || !userVideo) {
      onAnalysisError('Both original and user videos are required');
      return;
    }

    try {
      setIsAnalyzing(true);
      onAnalysisStart();

      // Map difficulty from UI format to API format
      const apiDifficulty = difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';
      
      // Call the API service with 10 FPS as requested
      const results = await danceAnalysisService.analyzeDanceVideos(
        originalVideo,
        userVideo,
        {
          difficulty: apiDifficulty,
          fps: 10.0
        }
      );

      if (results.error) {
        onAnalysisError(results.error);
      } else {
        onAnalysisComplete(results);
      }
    } catch (error) {
      onAnalysisError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <button
      onClick={handleAnalyzeClick}
      disabled={isAnalyzing || !originalVideo || !userVideo}
      style={{
        background: 'linear-gradient(to right, #34D399, #8B5CF6)',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '9999px',
        fontWeight: 'bold',
        border: 'none',
        cursor: isAnalyzing || !originalVideo || !userVideo ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.125rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        opacity: isAnalyzing || !originalVideo || !userVideo ? 0.5 : 1,
      }}
    >
      {isAnalyzing ? (
        <>
          <svg className="animate-spin" style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing...
        </>
      ) : (
        <>
          <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.097h-1.5c-.331 0-.658-.025-.968-.074L3 3.75l3.15-1.562C6.532 2.005 7.23 1.5 8.25 1.5c1.02 0 1.718.505 2.118 1.25L12 5.25v5.571a2.25 2.25 0 01-1.5 2.121l-3.5 .875m2.121 4.242-2.121 2.121a.375.375 0 00.53.53l2.121-2.121M12 3.104a2.25 2.25 0 011.5 2.121v5.571a2.25 2.25 0 001.5 2.121l3.5 .875-2.121 2.121a.375.375 0 01-.53.53L12 18.75m-3.5-3.5a2.25 2.25 0 00-3.182-3.182L3.75 12a2.25 2.25 0 003.182 3.182L12 18.75m3.5 3.5a2.25 2.25 0 003.182-3.182L20.25 12a2.25 2.25 0 00-3.182-3.182L12 18.75m0 0l-3.5 3.5" />
          </svg>
          Analyze your dance!
        </>
      )}
    </button>
  );
};

export default DanceAnalysisIntegration;
