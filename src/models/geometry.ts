import { GeometryType } from '@/enums/geometryType'

import type { Size } from '@/models/size'
import type { Xyz } from '@/models/xyz'

export interface Geometry {
  id: number;
  visualId: number;
  type: GeometryType;
  // Box
  size: Xyz;
  // Sphere
  radius: number;
  // Cylinder
  length: number;
}
