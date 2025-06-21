import React from 'react';
import type { Pose } from '../types';

interface PoseOverlayProps {
  pose: Pose;
  width: number;
  height: number;
  variant: 'original' | 'user';
}

const connections: [keyof Pose, keyof Pose][] = [
    ['right_shoulder', 'right_elbow'],
    ['right_elbow', 'right_wrist'],
];

const armJointsToShow: (keyof Pose)[] = ['right_shoulder', 'right_elbow', 'right_wrist'];

const glowingKeyframes = `
  @keyframes glowing {
    0% {
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 5px rgba(196, 181, 253, 0.7));
    }
    50% {
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 1)) drop-shadow(0 0 10px rgba(196, 181, 253, 1));
    }
    100% {
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 5px rgba(196, 181, 253, 0.7));
    }
  }
`;

const PoseOverlay = ({ pose, width, height, variant }: PoseOverlayProps) => {
    
    const lineStyle = {
        stroke: "rgba(255, 255, 255, 0.7)",
        strokeWidth: "2" as const,
        ...(variant === 'user' && {
            animation: 'glowing 2s infinite ease-in-out'
        })
    };
    
    const circleStyle = {
        fill: "rgba(255, 255, 255, 0.9)",
        ...(variant === 'user' && {
            animation: 'glowing 2s infinite ease-in-out'
        })
    };

    return (
        <>
            {variant === 'user' && <style>{glowingKeyframes}</style>}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                }}
                viewBox={`0 0 ${width} ${height}`}
            >
                {connections.map(([startKey, endKey]) => {
                    const start = pose[startKey];
                    const end = pose[endKey];
                    if (start.score > 0.5 && end.score > 0.5) {
                        return (
                            <line
                                key={`${String(startKey)}-${String(endKey)}`}
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                style={lineStyle}
                            />
                        );
                    }
                    return null;
                })}
                {armJointsToShow.map((key) => {
                    const joint = pose[key];
                    if (joint.score > 0.5) {
                        return (
                            <circle
                                key={joint.name}
                                cx={joint.x}
                                cy={joint.y}
                                r="4"
                                style={circleStyle}
                            />
                        );
                    }
                    return null;
                })}
            </svg>
        </>
    );
};

export default PoseOverlay; 