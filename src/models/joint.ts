import type { PartType } from '@/enums/PartType'
import type { Link } from '@/models/link'
import { JointType } from '@/enums/jointType'
import type { RobotPart } from '@/models/robotPart'
import type { Origin } from '@/models/origin'
import type { JointLimit } from '@/models/jointLimit'
import type { Xyz } from '@/models/xyz'

export interface Joint extends RobotPart {
  type: PartType.Joint;
  parent: Link;
  child: Link;
  jointType: JointType;
  origin: Origin;
  axis: Xyz;
  limit: JointLimit;
}
