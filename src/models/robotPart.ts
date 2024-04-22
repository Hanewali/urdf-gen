import type { PartType } from '@/enums/PartType'

export interface RobotPart {
  id: number;
  name: string;
  type: PartType;
}
