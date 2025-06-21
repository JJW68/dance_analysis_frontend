export interface Suggestion {
  part: string;
  text: string;
}

export interface Joint {
  name: string;
  x: number;
  y: number;
  score: number;
}

export type Pose = {
  nose: Joint;
  left_eye: Joint;
  right_eye: Joint;
  left_ear: Joint;
  right_ear: Joint;
  left_shoulder: Joint;
  right_shoulder: Joint;
  left_elbow: Joint;
  right_elbow: Joint;
  left_wrist: Joint;
  right_wrist: Joint;
  left_hip: Joint;
  right_hip: Joint;
  left_knee: Joint;
  right_knee: Joint;
  left_ankle: Joint;
  right_ankle: Joint;
};

export interface Keyframe {
  id: number;
  time: number;
  score: number;
  issues: number;
  suggestions: { part: string; text: string }[];
  originalPose?: Pose;
  userPose?: Pose;
} 