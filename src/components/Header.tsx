import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

interface HeaderProps {
  onBack: () => void;
  overallScore: number;
}

const Header = ({ onBack, overallScore }: HeaderProps) => {
  const { width } = useWindowSize();
  const isSmallScreen = width ? width < 1024 : false;

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '0.75rem',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#4B5563',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const titleContainerStyle = {
    textAlign: 'center' as const,
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0 0 0.25rem 0',
  };

  const scoreStyle = {
    fontSize: '1rem',
    color: '#10B981',
    fontWeight: '500',
    margin: 0,
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const freeAnalysesStyle = {
    background: '#E0E7FF',
    color: '#4338CA',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
  };

  const upgradeButtonStyle = {
    background: 'linear-gradient(to right, #8B5CF6, #6366F1)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  return (
    <header style={headerStyle}>
      <button onClick={onBack} style={backButtonStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>

      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Dance Analysis Results ✨</h1>
        <p style={scoreStyle}>Overall Score: {overallScore}%</p>
      </div>

      <div style={actionsStyle}>
        {!isSmallScreen && (
          <>
            <div style={freeAnalysesStyle}>Free Analyses: 1/2</div>
            <button style={upgradeButtonStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V21M5.25 10.5H18.75M18.75 10.5c0 3.314-2.686 6-6 6s-6-2.686-6-6m12 0c0-3.314-2.686-6-6-6S5.25 7.186 5.25 10.5" />
              </svg>
              Upgrade Pro
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 