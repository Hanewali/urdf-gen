export interface JointLimit {
  id: number,
  jointId: number;
  lower: number;
  upper: number;
  effort: number;
  velocity: number;
}
