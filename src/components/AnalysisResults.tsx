import React, { useState, useEffect } from 'react';
import Header from './Header';
import VideoComparison from './VideoComparison';
import Keyframes from './Keyframes';
import KeyframeDetails from './KeyframeDetails';
import AiSuggestions from './AiSuggestions';
import type { Keyframe } from '../types.ts';
import { mockPose, mockUserPose } from './VideoComparison';
import { useWindowSize } from '../hooks/useWindowSize';

interface AnalysisResultsProps {
  onBack: () => void;
}

const generateRandomKeyframes = (): Keyframe[] => {
  const keyframeCount = Math.floor(Math.random() * 5) + 4; // 4 to 8 keyframes
  const keyframes: Keyframe[] = [];

  for (let i = 0; i < keyframeCount; i++) {
    const score = Math.floor(Math.random() * 41) + 60; // 60 to 100
    const hasIssue = Math.random() > 0.4;
    
    keyframes.push({
      id: i + 1,
      time: parseFloat((i * 2.5 + Math.random()).toFixed(1)),
      score: score,
      issues: hasIssue ? 1 : 0,
      suggestions: hasIssue 
        ? [{ part: 'right arm', text: 'Raise your right arm slightly.' }]
        : [],
      originalPose: mockPose,
      userPose: hasIssue ? mockUserPose : mockPose,
    });
  }
  return keyframes;
};

const AnalysisResults = ({ onBack }: AnalysisResultsProps) => {
  const [keyframes] = useState<Keyframe[]>(generateRandomKeyframes());
  const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe>(keyframes[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const overallScore = Math.round(keyframes.reduce((acc, kf) => acc + kf.score, 0) / keyframes.length);

  useEffect(() => {
    const newHistoryItem = {
      id: new Date().toISOString() + Math.random(), // more unique id
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      overallScore,
      keyframes,
    };

    const existingHistory = JSON.parse(localStorage.getItem('danceAnalysisHistory') || '[]');
    const updatedHistory = [newHistoryItem, ...existingHistory];
    
    // Limit to 10 most recent items to avoid filling up localStorage
    localStorage.setItem('danceAnalysisHistory', JSON.stringify(updatedHistory.slice(0, 10)));
  }, []); // Run only once when the component mounts

  const containerStyle = {
    background: 'linear-gradient(to bottom, #F9F7FF, #FFFFFF)',
    minHeight: '100vh',
    width: '100%',
    padding: isMobile ? '2rem 1rem' : '2rem 4rem',
    boxSizing: 'border-box' as const,
    fontFamily: 'system-ui, sans-serif',
  };

  const fullScreenContainerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#020617',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const mainLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  };

  const leftColumnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  };

  const rightColumnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  };

  if (isFullScreen) {
    return (
      <div style={fullScreenContainerStyle}>
        <VideoComparison 
          selectedKeyframe={selectedKeyframe}
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(false)}
        />
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <Header onBack={onBack} overallScore={overallScore} />
      <div style={mainLayoutStyle}>
        <div style={leftColumnStyle}>
          <VideoComparison 
            selectedKeyframe={selectedKeyframe} 
            isFullScreen={isFullScreen}
            onToggleFullScreen={() => setIsFullScreen(true)}
          />
          <Keyframes
            keyframes={keyframes}
            selectedKeyframe={selectedKeyframe}
            onSelectKeyframe={setSelectedKeyframe}
          />
        </div>
        <div style={rightColumnStyle}>
          <KeyframeDetails selectedKeyframe={selectedKeyframe} />
          <AiSuggestions suggestions={selectedKeyframe.suggestions} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults; 