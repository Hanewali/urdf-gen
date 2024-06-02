import type { Xyz } from '@/models/xyz'
import type { Rpy } from '@/models/rpy'
import type { OriginParentType } from '@/enums/OriginParentType'

export interface Origin {
  id: number;
  parentId: number;
  xyz: Xyz;
  rpy: Rpy;
  parentType: OriginParentType;
}
