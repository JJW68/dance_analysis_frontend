import type { Keyframe } from '../types';

interface KeyframeDetailsProps {
  selectedKeyframe: Keyframe;
}

const KeyframeDetails = ({ selectedKeyframe }: KeyframeDetailsProps) => {

  const cardStyle = {
    background: 'linear-gradient(to bottom, #F3E8FF, #FFFFFF)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
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
    background: '#8B5CF6',
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

  const scoreContainer = {
    marginBottom: '1rem',
  };
  
  const scoreLabelStyle = {
    color: '#6B7280',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const getScoreColor = (score: number) => {
    if (score >= 100) return '#10B981'; // Green for perfect score
    if (score >= 90) return '#34D399'; // Light green for great scores
    if (score >= 80) return '#F59E0B'; // Amber for good scores
    return '#EF4444'; // Red for poor scores
  };

  const scoreValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: getScoreColor(selectedKeyframe.score),
  };

  const progressBarContainer = {
    height: '0.75rem',
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: '9999px',
    overflow: 'hidden',
  };
  
  const progressBarStyle = {
    height: '100%',
    width: `${selectedKeyframe.score}%`,
    backgroundColor: getScoreColor(selectedKeyframe.score),
    borderRadius: '9999px',
  };
  
  const infoStyle = {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginTop: '0.75rem',
  };


  return (
    <div style={cardStyle}>
      <header style={headerStyle}>
        <div style={iconContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" style={{width: '1.5rem', height: '1.5rem'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
          </svg>
        </div>
        <h2 style={titleStyle}>Keyframe #{selectedKeyframe.id}</h2>
      </header>

      <div style={scoreContainer}>
        <div style={scoreLabelStyle}>
          <span>Score</span>
          <span style={scoreValueStyle}>{selectedKeyframe.score}%</span>
        </div>
        <div style={progressBarContainer}>
          <div style={progressBarStyle} />
        </div>
      </div>
      
      <p style={infoStyle}>
        Time: {selectedKeyframe.time.toFixed(1)}s • {selectedKeyframe.issues} issue{selectedKeyframe.issues !== 1 ? 's' : ''} detected
      </p>
    </div>
  );
};

export type { Keyframe };
export default KeyframeDetails; 