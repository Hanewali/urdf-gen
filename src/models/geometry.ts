import { GeometryType } from '@/enums/geometryType'

import type { Size } from '@/models/size'

export interface Geometry {
  type: GeometryType;

  // Box
  size?: Size;

  // Sphere
  radius?: number;

  // Cylinder
  length?: number;
}
