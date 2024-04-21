import type { PartType } from '@/enums/PartType'
import type { RobotPart } from '@/models/robotPart'
import type { Joint } from '@/models/joint'
import type { Visual } from '@/models/visual'

export interface Link extends RobotPart {
  type: PartType.Link;
  parent: Joint;
  child: Joint;
  visuals: Visual[];
}
