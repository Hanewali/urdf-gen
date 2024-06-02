import type { PartType } from '@/enums/PartType'
import { JointType } from '@/enums/jointType'
import type { RobotPart } from '@/models/robotPart'
import type { Origin } from '@/models/origin'
import type { JointLimit } from '@/models/jointLimit'
import type { Axis } from '@/models/axis'

export interface Joint extends RobotPart {
  type: PartType.Joint;
  parentLinkName: string;
  childLinkName: string;
  jointType: JointType;
  origin: Origin;
  axis: Axis;
  limit: JointLimit;
}

