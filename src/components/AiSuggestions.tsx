import React from 'react';
import type { Suggestion } from '../types';
import { useWindowSize } from '../hooks/useWindowSize';

interface AiSuggestionsProps {
  suggestions: Suggestion[];
}

const AiSuggestions = ({ suggestions }: AiSuggestionsProps) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const cardStyle = {
    background: '#FFF7ED',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const iconContainer = {
    background: '#FB923C',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#374151',
  };
  
  const suggestionListStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  };

  const suggestionItemStyle = {
    background: '#FFFFFF',
    borderRadius: '1rem',
    padding: '1rem',
    borderLeft: '4px solid #FBBF24',
  };

  const suggestionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  };
  
  const suggestionPartStyle = {
    background: '#FEF3C7',
    color: '#B45309',
    padding: '0.125rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  };
  
  const suggestionTextStyle = {
    color: '#4B5563',
    fontSize: '0.875rem',
    lineHeight: 1.5,
  };

  return (
    <div style={cardStyle}>
      <header style={headerStyle}>
        <div style={iconContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" style={{width: '1.5rem', height: '1.5rem'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.312-2.312L12 17.25l1.178-.648a3.375 3.375 0 002.312-2.312L16.25 13.5l.648 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.648a3.375 3.375 0 00-2.312 2.312z" />
          </svg>
        </div>
        <h2 style={titleStyle}>AI Suggestions</h2>
      </header>
      {suggestions.length > 0 ? (
        <div style={suggestionListStyle}>
          {suggestions.map((suggestion, index) => (
            <div key={index} style={suggestionItemStyle}>
              <div style={suggestionHeaderStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{width: '1rem', height: '1rem', color: '#FBBF24'}}>
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                <span style={suggestionPartStyle}>{suggestion.part}</span>
              </div>
              <p style={suggestionTextStyle}>{suggestion.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{color: '#6B7280', textAlign: 'center', padding: '1rem 0'}}>No issues detected for this keyframe. Great job!</p>
      )}
    </div>
  );
};

export default AiSuggestions; 