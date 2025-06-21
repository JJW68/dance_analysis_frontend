import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import VideoUpload from "./VideoUpload.tsx";
import Analyzing from "./Analyzing.tsx";
import AnalysisResults from "./AnalysisResults.tsx";
import { useWindowSize } from "../hooks/useWindowSize.ts";

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const HomePage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Beginner');
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
  };

  const handleGoBack = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  useEffect(() => {
    if (isAnalyzing && !analysisComplete) {
      const timer = setTimeout(() => {
        setAnalysisComplete(true);
      }, 4000); // Same duration as the progress bar animation
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analysisComplete]);

  const pageStyle = {
    background: 'linear-gradient(to bottom, #f0e6ff, #ffffff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '4rem 2rem',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: '#374151',
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };
  
  const logoBackgroundStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '4rem',
      height: '4rem',
      borderRadius: '1rem',
      background: 'linear-gradient(to bottom right, #8B5CF6, #6366F1)',
      color: 'white'
  };

  const starContainerStyle = {
    display: 'flex',
    gap: '0.25rem',
    color: '#FBBF24',
    fontSize: '1.5rem',
  };

  const freeTrialButtonStyle = {
    backgroundColor: '#ECFDF5',
    color: '#10B981',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
  };
  
  const sectionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600' as const,
    color: '#4B5563',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  };

  const difficultyContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const difficultyColors = {
    Beginner: {
      border: '#6EE7B7',
      shadow: 'rgba(110, 231, 183, 0.3)',
      text: '#065F46',
    },
    Intermediate: {
      border: '#93C5FD',
      shadow: 'rgba(147, 197, 253, 0.4)',
      text: '#1E40AF',
    },
    Advanced: {
      border: '#C4B5FD',
      shadow: 'rgba(196, 181, 253, 0.4)',
      text: '#5B21B6',
    },
  };

  const difficultyBoxStyle = (difficulty: Difficulty) => ({
    padding: '1.5rem',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    border: `2px solid ${selectedDifficulty === difficulty ? difficultyColors[difficulty].border : '#E5E7EB'}`,
    background: '#FFFFFF',
    boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)${selectedDifficulty === difficulty ? `, 0 0 0 3px ${difficultyColors[difficulty].shadow}` : ''}`,
    textAlign: 'left' as const,
    width: '260px',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  });

  const difficultyTitleStyle = (isSelected: boolean, difficulty: Difficulty) => ({
    fontWeight: 'bold' as const,
    fontSize: '1.125rem',
    color: isSelected ? difficultyColors[difficulty].text : '#1F2937',
    marginBottom: '0.5rem',
    transition: 'color 0.2s ease-in-out',
  });

  const difficultyDescriptionStyle = {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '1rem',
    height: '40px',
  };

  const difficultyThresholdStyle = {
    fontSize: '0.875rem',
    color: '#4B5563',
    fontWeight: '500' as const,
  };
  
  const mainStyle: CSSProperties = {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2.5rem',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const analyzeButtonStyle = {
    background: 'linear-gradient(to right, #34D399, #8B5CF6)',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.125rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  const footerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  };

  if (analysisComplete) {
    return <AnalysisResults onBack={handleGoBack} />;
  }

  return (
    <div style={pageStyle}>
      {isAnalyzing ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1
        }}>
          <Analyzing />
        </div>
      ) : (
        <>
          <header style={headerStyle}>
            <div style={logoContainerStyle}>
              <div style={logoBackgroundStyle}>
                <svg
                    style={{ width: '2.5rem', height: '2.5rem' }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <h1 style={{ fontFamily: "'Righteous', cursive", fontSize: '3.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>DanceAI</h1>
              <div style={starContainerStyle}>
                <span>☆</span><span>☆</span><span>☆</span>
              </div>
            </div>
            <p style={{ color: '#4B5563', fontSize: '1.125rem', maxWidth: '450px', margin: '0 auto' }}>
              Upload your dance cover and the original to get AI-powered feedback with
              precise pose analysis
            </p>
          </header>

          <button style={freeTrialButtonStyle}>
            <svg style={{width: '1rem', height: '1rem'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Free trial • No signup required
          </button>

          <h2 style={sectionTitleStyle}>Choose your level of difficulty</h2>

          <div style={difficultyContainerStyle}>
            <div style={difficultyBoxStyle('Beginner')} onClick={() => setSelectedDifficulty('Beginner')}>
              <div style={difficultyTitleStyle(selectedDifficulty === 'Beginner', 'Beginner')}>Beginner (More Forgiving)</div>
              <div style={difficultyDescriptionStyle}>Great for beginners - only flags major differences</div>
              <div style={difficultyThresholdStyle}>Threshold: 15.0°</div>
            </div>
            <div style={difficultyBoxStyle('Intermediate')} onClick={() => setSelectedDifficulty('Intermediate')}>
              <div style={difficultyTitleStyle(selectedDifficulty === 'Intermediate', 'Intermediate')}>Intermediate (Balanced)</div>
              <div style={difficultyDescriptionStyle}>Balanced analysis for most dancers</div>
              <div style={difficultyThresholdStyle}>Threshold: 10.0°</div>
            </div>
            <div style={difficultyBoxStyle('Advanced')} onClick={() => setSelectedDifficulty('Advanced')}>
              <div style={difficultyTitleStyle(selectedDifficulty === 'Advanced', 'Advanced')}>Advanced (Precise)</div>
              <div style={difficultyDescriptionStyle}>For advanced dancers - catches subtle differences</div>
              <div style={difficultyThresholdStyle}>Threshold: 5.0°</div>
            </div>
          </div>

          <main style={mainStyle}>
            <VideoUpload
              title="Original Dance Video"
              description="Upload the original choreography you're trying to learn"
              variant="original"
            />
            <VideoUpload
              title="Your Dance Cover"
              description="Upload your attempt at the choreography for analysis"
              variant="cover"
            />
          </main>

          <footer style={footerStyle}>
            <button style={analyzeButtonStyle} onClick={handleAnalyzeClick}>
              <svg
                style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              Analyze My Dance
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default HomePage;
