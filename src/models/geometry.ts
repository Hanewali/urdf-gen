import { GeometryType } from '@/enums/geometryType'

import type { Size } from '@/models/size'

export class Geometry {
  type: GeometryType = GeometryType.Box;

  // Box
  size?: Size;

  // Sphere
  radius?: number;

  // Cylinder
  length?: number;
}
