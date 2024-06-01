import type { Xyz } from '@/models/xyz'
import type { Rpy } from '@/models/rpy'

export interface Origin {
  id: number;
  visualId: number;
  xyz: Xyz;
  rpy: Rpy;
}
