import React, { useState } from "react";
import type { CSSProperties } from "react";
import VideoUpload from "./VideoUpload.tsx";
import { useWindowSize } from "../hooks/useWindowSize.ts";

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface HomePageProps {
  onUpload: () => void;
  onShowHistory: () => void;
}

const HomePage = ({ onUpload, onShowHistory }: HomePageProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Beginner');
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const pageStyle = {
    background: 'linear-gradient(to bottom, #f0e6ff, #ffffff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '4rem 2rem',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: '#374151',
    position: 'relative' as const,
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

  const historyButtonStyle = {
    position: 'absolute' as const,
    top: '2rem',
    right: '2rem',
    background: '#fff',
    color: '#6B7280',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontWeight: '600',
    border: '1px solid #D1D5DB',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  };

  return (
    <div style={pageStyle}>
      <button style={historyButtonStyle} onClick={onShowHistory}>
        Previous Analyses
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div style={headerStyle}>
        <div style={logoContainerStyle}>
          <div style={logoBackgroundStyle}>
            <svg style={{ width: '2rem', height: '2rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Righteous', cursive", fontSize: '3rem', margin: 0, color: '#4C1D95' }}>DanceAI</h1>
          <div style={starContainerStyle}>
              <span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'normal', marginTop: '1rem' }}>
          Upload your dance cover and the original to get AI-powered feedback with precise pose analysis
        </h2>

        <button style={freeTrialButtonStyle}>
          <svg style={{ width: '1.25rem', height: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5l-3 3m0 0l-3-3m3 3V3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Free trial • No signup required
        </button>
      </div>

      <h3 style={sectionTitleStyle}>Choose your level of difficulty</h3>

      <div style={difficultyContainerStyle}>
          <div style={difficultyBoxStyle('Beginner')} onClick={() => setSelectedDifficulty('Beginner')}>
              <h4 style={difficultyTitleStyle(selectedDifficulty === 'Beginner', 'Beginner')}>Beginner (More Forgiving)</h4>
              <p style={difficultyDescriptionStyle}>Great for beginners - only flags major differences</p>
              <p style={difficultyThresholdStyle}>Threshold: 15.0°</p>
          </div>
          <div style={difficultyBoxStyle('Intermediate')} onClick={() => setSelectedDifficulty('Intermediate')}>
              <h4 style={difficultyTitleStyle(selectedDifficulty === 'Intermediate', 'Intermediate')}>Intermediate (Balanced)</h4>
              <p style={difficultyDescriptionStyle}>Balanced analysis for most dancers</p>
              <p style={difficultyThresholdStyle}>Threshold: 10.0°</p>
          </div>
          <div style={difficultyBoxStyle('Advanced')} onClick={() => setSelectedDifficulty('Advanced')}>
              <h4 style={difficultyTitleStyle(selectedDifficulty === 'Advanced', 'Advanced')}>Advanced (Precise)</h4>
              <p style={difficultyDescriptionStyle}>For advanced dancers - catches subtle differences</p>
              <p style={difficultyThresholdStyle}>Threshold: 5.0°</p>
          </div>
      </div>
  
      <div style={mainStyle}>
        <VideoUpload 
          title="Original Dance Video"
          description="Upload the source video from the artist"
          variant="original"
        />
        <VideoUpload 
          title="Your Dance Cover"
          description="Upload your own performance to be analyzed"
          variant="cover"
        />
      </div>

    <footer style={footerStyle}>
      <button style={analyzeButtonStyle} onClick={onUpload}>
        <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.097h-1.5c-.331 0-.658-.025-.968-.074L3 3.75l3.15-1.562C6.532 2.005 7.23 1.5 8.25 1.5c1.02 0 1.718.505 2.118 1.25L12 5.25v5.571a2.25 2.25 0 01-1.5 2.121l-3.5 .875m2.121 4.242-2.121 2.121a.375.375 0 00.53.53l2.121-2.121M12 3.104a2.25 2.25 0 011.5 2.121v5.571a2.25 2.25 0 001.5 2.121l3.5 .875-2.121 2.121a.375.375 0 01-.53.53L12 18.75m-3.5-3.5a2.25 2.25 0 00-3.182-3.182L3.75 12a2.25 2.25 0 003.182 3.182L12 18.75m3.5 3.5a2.25 2.25 0 003.182-3.182L20.25 12a2.25 2.25 0 00-3.182-3.182L12 18.75m0 0l-3.5 3.5" />
        </svg>
        Analyze your dance!
      </button>
    </footer>
    </div>
  );
};

export default HomePage;
