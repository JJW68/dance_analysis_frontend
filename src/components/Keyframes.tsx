import React, { useEffect, useCallback, useRef } from 'react';
import type { Keyframe } from '../types';
import { useWindowSize } from '../hooks/useWindowSize';

interface KeyframesProps {
  keyframes: Keyframe[];
  selectedKeyframe: Keyframe;
  onSelectKeyframe: (keyframe: Keyframe) => void;
}

const keyframesData = [
  { id: 1, time: '2.5s' },
  { id: 2, time: '5.2s' },
  { id: 3, time: '8.1s' },
  { id: 4, time: '12.3s' },
  { id: 5, time: '15.8s' },
];

const Keyframes = ({ keyframes, selectedKeyframe, onSelectKeyframe }: KeyframesProps) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const keyframeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const selectedIndex = keyframes.findIndex(kf => kf.id === selectedKeyframe.id);
    if (selectedIndex !== -1 && keyframeRefs.current[selectedIndex]) {
      keyframeRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedKeyframe, keyframes]);

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const titleContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const iconContainer = {
    background: 'linear-gradient(to right, #34D399, #10B981)',
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

  const countTagStyle = {
    background: '#D1FAE5',
    color: '#065F46',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
  };

  const controlsStyle = {
    display: 'flex',
    gap: '0.5rem',
  };

  const navButtonStyle = (disabled: boolean) => ({
    background: 'transparent',
    border: 'none',
    padding: '0.25rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    color: '#4B5563',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const keyframesListStyle = {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto' as const,
    paddingBottom: '1rem',
  };

  const keyframeItemStyle = (isSelected: boolean) => ({
    minWidth: isMobile ? '100px' : '120px',
    padding: '1rem',
    borderRadius: '1rem',
    border: isSelected ? '2px solid #6366F1' : '2px solid #E5E7EB',
    backgroundColor: isSelected ? '#EEF2FF' : '#FFFFFF',
    cursor: 'pointer',
    textAlign: 'center' as const,
    boxShadow: isSelected ? '0 4px 14px 0 rgba(99, 102, 241, 0.2)' : 'none',
    transition: 'all 0.3s ease',
  });

  const keyframeTimeStyle = {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    marginBottom: '0.25rem',
  };

  const keyframeScoreStyle = (score: number) => ({
    fontSize: '1rem',
    fontWeight: '500',
    color: score > 90 ? '#10B981' : (score > 80 ? '#F59E0B' : '#EF4444'),
  });

  const selectedIndex = keyframes.findIndex(kf => kf.id === selectedKeyframe.id);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      onSelectKeyframe(keyframes[selectedIndex - 1]);
    }
  }, [selectedIndex, keyframes, onSelectKeyframe]);

  const handleNext = useCallback(() => {
    if (selectedIndex < keyframes.length - 1) {
      onSelectKeyframe(keyframes[selectedIndex + 1]);
    }
  }, [selectedIndex, keyframes, onSelectKeyframe]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  return (
    <div style={cardStyle}>
      <header style={headerStyle}>
        <div style={titleContainer}>
          <div style={iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 style={titleStyle}>Keyframes</h2>
          <span style={countTagStyle}>{keyframes.length} detected</span>
        </div>
        <div style={controlsStyle}>
          <button onClick={handlePrev} disabled={selectedIndex === 0} style={navButtonStyle(selectedIndex === 0)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={handleNext} disabled={selectedIndex === keyframes.length - 1} style={navButtonStyle(selectedIndex === keyframes.length - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '1.5rem', height: '1.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </header>
      <div style={keyframesListStyle}>
        {keyframes.map((kf, index) => (
          <div
            key={kf.id}
            ref={el => { keyframeRefs.current[index] = el; }}
            onClick={() => onSelectKeyframe(kf)}
            style={keyframeItemStyle(selectedKeyframe.id === kf.id)}
          >
            <div style={keyframeTimeStyle}>{kf.time.toFixed(1)}s</div>
            <div style={keyframeScoreStyle(kf.score)}>{kf.score}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyframes; 