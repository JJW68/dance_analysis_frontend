import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import type { Keyframe, Pose } from '../types';
import PoseOverlay from './PoseOverlay';
import { useWindowSize } from '../hooks/useWindowSize';

interface VideoComparisonProps {
  selectedKeyframe: Keyframe;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

export const mockPose: Pose = {
  nose: { name: 'nose', x: 0, y: 0, score: 0 },
  left_eye: { name: 'left_eye', x: 0, y: 0, score: 0 },
  right_eye: { name: 'right_eye', x: 0, y: 0, score: 0 },
  left_ear: { name: 'left_ear', x: 0, y: 0, score: 0 },
  right_ear: { name: 'right_ear', x: 0, y: 0, score: 0 },
  left_shoulder: { name: 'left_shoulder', x: 0, y: 0, score: 0 },
  right_shoulder: { name: 'right_shoulder', x: 200, y: 100, score: 0.9 },
  left_elbow: { name: 'left_elbow', x: 0, y: 0, score: 0 },
  right_elbow: { name: 'right_elbow', x: 280, y: 100, score: 0.85 },
  left_wrist: { name: 'left_wrist', x: 0, y: 0, score: 0 },
  right_wrist: { name: 'right_wrist', x: 360, y: 100, score: 0.8 },
  left_hip: { name: 'left_hip', x: 0, y: 0, score: 0 },
  right_hip: { name: 'right_hip', x: 0, y: 0, score: 0 },
  left_knee: { name: 'left_knee', x: 0, y: 0, score: 0 },
  right_knee: { name: 'right_knee', x: 0, y: 0, score: 0 },
  left_ankle: { name: 'left_ankle', x: 0, y: 0, score: 0 },
  right_ankle: { name: 'right_ankle', x: 0, y: 0, score: 0 },
};

export const mockUserPose: Pose = {
    ...mockPose,
    right_elbow: { ...mockPose.right_elbow, y: 130 },
    right_wrist: { ...mockPose.right_wrist, y: 150 },
}

const VideoComparison = ({ selectedKeyframe, isFullScreen, onToggleFullScreen }: VideoComparisonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        onToggleFullScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen, onToggleFullScreen]);

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const fullScreenModeStyle = {
    ...cardStyle,
    width: '90vw',
    height: '90vh',
  }

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1rem' : '0',
  };

  const titleContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: isMobile ? '100%' : 'auto',
  };

  const iconContainer = {
    background: 'linear-gradient(to right, #8B5CF6, #6366F1)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: isMobile ? '1rem' : '1.25rem',
    fontWeight: 'bold',
    color: '#374151',
  };

  const keyframeTagStyle = {
    background: '#FEF3C7',
    color: '#D97706',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    fontWeight: '600',
  };
  
  const controlsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'space-between' : 'flex-end',
  };
  
  const buttonStyle = {
    background: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500'
  };

  const playButtonStyle = {
    ...buttonStyle,
    background: '#10B981',
    color: '#fff',
    border: 'none',
  };

  const videoAreaStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    flexGrow: 1,
  };

  const videoPlaceholderStyle = {
    backgroundColor: '#020617',
    aspectRatio: '16 / 9',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const fullScreenCardStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#020617',
    zIndex: 1000,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle = {
    position: 'absolute' as const,
    top: '-1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#EDE9FE',
    color: '#5B21B6',
    padding: '0.25rem 1rem',
    borderRadius: '9999px',
    fontSize: isMobile ? '1rem' : '1.25rem',
    fontWeight: 'bold',
    zIndex: 20,
    whiteSpace: 'nowrap' as const,
  }

  const statsContainerStyle = {
    backgroundColor: '#F9FAFB',
    borderRadius: '1rem',
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    textAlign: 'center' as const,
    gap: isMobile ? '1rem' : '0',
  };

  const statItemStyle = {
    borderRight: isMobile ? 'none' : '1px solid #E5E7EB',
    paddingBottom: isMobile ? '1rem' : '0',
    borderBottom: isMobile ? '1px solid #E5E7EB' : 'none',
  };
  
  const lastStatItemStyle = {
    ...statItemStyle,
    borderRight: 'none',
    borderBottom: 'none',
  };

  const statLabelStyle = {
    color: '#6B7280',
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  };

  const statValueStyle = {
    color: '#111827',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  return (
    <div style={isFullScreen ? fullScreenModeStyle : cardStyle}>
      <header style={headerStyle}>
        <div style={titleContainer}>
          <div style={iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <h2 style={titleStyle}>Video Comparison</h2>
          <span style={keyframeTagStyle}>Keyframe #{selectedKeyframe.id}・{selectedKeyframe.score}%</span>
        </div>
        <div style={controlsStyle}>
          <button style={buttonStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}>
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Reset
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} style={playButtonStyle}>
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zM16.5 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.538 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
            Play
              </>
            )}
          </button>
          <button onClick={onToggleFullScreen} style={{...buttonStyle, padding: '0.5rem'}}>
            {isFullScreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem', height: '1.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem', height: '1.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div style={videoAreaStyle}>
        <div style={{position: 'relative'}}>
        <div style={videoPlaceholderStyle}>
              {selectedKeyframe.originalPose && <PoseOverlay pose={selectedKeyframe.originalPose} width={450} height={253} variant="original" />}
            </div>
          <div style={labelStyle}>Original</div>
        </div>
        <div style={{position: 'relative'}}>
        <div style={videoPlaceholderStyle}>
              {selectedKeyframe.userPose && <PoseOverlay pose={selectedKeyframe.userPose} width={450} height={253} variant="user" />}
            </div>
          <div style={labelStyle}>Your Performance</div>
        </div>
      </div>

      <div style={statsContainerStyle}>
        <div style={statItemStyle}>
          <div style={statLabelStyle}>Time</div>
          <div style={statValueStyle}>{selectedKeyframe.time.toFixed(1)}s</div>
        </div>
        <div style={statItemStyle}>
          <div style={statLabelStyle}>Score</div>
          <div style={{...statValueStyle, color: '#F59E0B'}}>{selectedKeyframe.score}%</div>
        </div>
        <div style={lastStatItemStyle}>
          <div style={statLabelStyle}>Issues</div>
          <div style={statValueStyle}>{selectedKeyframe.issues}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoComparison; 