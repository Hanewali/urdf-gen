import type { Origin } from '@/models/origin'
import type { Geometry } from '@/models/geometry'
import type { Material } from '@/models/material'

export interface Visual {
  name: string;
  origin: Origin;
  geometry: Geometry;
  material: Material;
}
