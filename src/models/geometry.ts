import { GeometryType } from '@/enums/geometryType'

import type { Size } from '@/models/size'

export interface Geometry {
  id: number;
  visualId: number;
  type: GeometryType;
  // Box
  size?: Size;
  // Sphere
  radius?: number;
  // Cylinder
  length?: number;
}
