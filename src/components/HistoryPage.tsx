import React, { useState, useEffect } from 'react';
import type { Keyframe } from '../types';

interface HistoryPageProps {
  onBack: () => void;
}

interface HistoryItem {
  id: string;
  date: string;
  overallScore: number;
  keyframes: Keyframe[];
}

const mockHistory: HistoryItem[] = [
    { id: 'mock1', date: 'June 20, 2025, 04:30 PM', overallScore: 92, keyframes: new Array(5) },
    { id: 'mock2', date: 'June 18, 2025, 11:15 AM', overallScore: 78, keyframes: new Array(8) },
    { id: 'mock3', date: 'June 15, 2025, 08:00 PM', overallScore: 88, keyframes: new Array(6) },
    { id: 'mock4', date: 'June 12, 2025, 09:45 AM', overallScore: 65, keyframes: new Array(7) },
];

const HistoryPage = ({ onBack }: HistoryPageProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('danceAnalysisHistory') || '[]');
    if (storedHistory.length > 0) {
      setHistory(storedHistory);
    } else {
      setHistory(mockHistory);
    }
  }, []);

  const pageStyle = {
    background: 'linear-gradient(to bottom, #F9F7FF, #FFFFFF)',
    minHeight: '100vh',
    width: '100%',
    padding: '2rem 4rem',
    boxSizing: 'border-box' as const,
    fontFamily: 'system-ui, sans-serif',
    color: '#374151',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4B5563',
    fontFamily: "'Righteous', cursive",
  };

  const backButtonStyle = {
    background: '#fff',
    color: '#6B7280',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    border: '1px solid #D1D5DB',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  };
  
  const historyListStyle = {
    display: 'grid' as const,
    gap: '1.5rem',
  };

  const historyItemStyle = {
    background: '#FFFFFF',
    borderRadius: '1rem',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #F3F4F6',
  };

  const scoreBadgeStyle = (score: number) => ({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: score > 85 ? '#10B981' : score > 70 ? '#F59E0B' : '#EF4444',
    background: score > 85 ? '#D1FAE5' : score > 70 ? '#FEF3C7' : '#FEE2E2',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    minWidth: '60px',
    textAlign: 'center' as const,
  });
  
  const placeholderStyle = {
    textAlign: 'center' as const,
    padding: '4rem',
    background: '#fff',
    borderRadius: '1rem',
    border: '2px dashed #E5E7EB'
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Previous Analyses</h1>
        <button style={backButtonStyle} onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1rem', height: '1rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </button>
      </header>
      
      {history.length > 0 ? (
        <div style={historyListStyle}>
          {history.map((item) => (
            <div key={item.id} style={historyItemStyle}>
              <div>
                <p style={{ margin: 0, fontWeight: '600', color: '#1F2937' }}>Analysis from {item.date}</p>
                <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280' }}>{item.keyframes.length} keyframes analyzed</p>
              </div>
              <div style={scoreBadgeStyle(item.overallScore)}>
                {item.overallScore}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={placeholderStyle}>
          <p style={{fontSize: '1.125rem', color: '#4B5563'}}>Your analysis history will appear here.</p>
          <p style={{color: '#6B7280'}}>Complete an analysis to get started!</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage; 