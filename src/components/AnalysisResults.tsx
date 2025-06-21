import React from 'react';
import { useState } from 'react';
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

const initialKeyframes: Keyframe[] = [
  { id: 1, time: 2.5, score: 85, issues: 1, suggestions: [{ part: 'right arm', text: 'Raise your right arm 15° higher to match the original pose.' }], originalPose: mockPose, userPose: mockUserPose },
  { id: 2, time: 5.1, score: 92, issues: 0, suggestions: [], originalPose: mockPose, userPose: mockPose },
  { id: 3, time: 8.3, score: 78, issues: 2, suggestions: [{ part: 'left leg', text: 'Extend your left leg more fully.' }, { part: 'torso', text: 'Keep your torso upright.' }], originalPose: mockPose, userPose: mockUserPose },
  { id: 4, time: 10.2, score: 95, issues: 0, suggestions: [], originalPose: mockPose, userPose: mockPose },
  { id: 5, time: 12.8, score: 88, issues: 1, suggestions: [{ part: 'head', text: 'Angle your head slightly to the left by 5°.' }], originalPose: mockPose, userPose: mockUserPose },
];

const AnalysisResults = ({ onBack }: AnalysisResultsProps) => {
  const [keyframes] = useState<Keyframe[]>(initialKeyframes);
  const [selectedKeyframe, setSelectedKeyframe] = useState<Keyframe>(keyframes[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const overallScore = Math.round(keyframes.reduce((acc, kf) => acc + kf.score, 0) / keyframes.length);

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