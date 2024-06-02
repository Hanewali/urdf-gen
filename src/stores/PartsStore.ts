import { defineStore } from 'pinia'
import type { Link } from '@/models/link'
import type { Joint } from '@/models/joint'
import { PartType } from '@/enums/PartType'
import { ref } from 'vue'
import type { Visual } from '@/models/visual'
import type { Origin } from '@/models/origin'
import type { Geometry } from '@/models/geometry'
import type { Material } from '@/models/material'
import { GeometryType } from '@/enums/geometryType'
import { OriginParentType } from '@/enums/OriginParentType'
import type { JointLimit } from '@/models/jointLimit'
import type { Axis } from '@/models/axis'

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: ref<(Link | Joint)[]>([]),
    visuals: ref<Visual[]>([]),
    origins: ref<Origin[]>([]),
    geometries: ref<Geometry[]>([]),
    materials: ref<Material[]>([]),
    jointLimits: ref<JointLimit[]>([]),
    axi: ref<Axis[]>([]),
    newPartId: 0,
    newVisualId: 0,
    newOriginId: 0,
    newGeometryId: 0,
    newMaterialId: 0,
    newJointLimitId: 0,
    newAxisId: 0
  }),
  getters: {
    getParts (state): (Link | Joint)[] {
      return state.parts
    },
    getPartsCount (state): number {
      return state.parts.length
    },
    getLinks (state): Link[] {
      return state.parts.filter(part => part.type === PartType.Link) as Link[]
    },
    getJoints (state): Joint[] {
      return state.parts.filter(part => part.type === PartType.Joint) as Joint[]
    },
    getPart (state): (id: number) => (Link | Joint) | undefined {
      return (id: number) => state.parts.find(part => part.id === id)
    },
    getVisual (state): (linkId: number) => Visual | undefined {
      return (linkId: number) => state.visuals.find(visual => visual.linkId === linkId)
    },
    getOrigin (state): (parentId: number, parentType: OriginParentType) => Origin | undefined {
      return (parentId: number, parentType: OriginParentType) => state.origins.find(origin => origin.parentId === parentId && origin.parentType === parentType)
    },
    getGeometry (state): (visualId: number) => Geometry | undefined {
      return (visualId: number) => state.geometries.find(geometry => geometry.visualId === visualId)
    },
    getMaterial (state): (visualId: number) => Material | undefined {
      return (visualId: number) => state.materials.find(material => material.visualId === visualId)
    },
    getJointLimit (state): (jointId: number) => JointLimit | undefined {
      return (jointId: number) => state.jointLimits.find(jointLimit => jointLimit.jointId === jointId)
    },
    getAxis(state): (jointId: number) => Axis | undefined {
      return (jointId: number) => state.axi.find(axis => axis.jointId === jointId)
    }
  },
  actions: {
    addLink () {
      this.parts.push({
        id: this.newPartId,
        name: `link_${this.newPartId}`,
        type: PartType.Link,
        visuals: []
      } as Link)

      this.visuals.push({
        id: this.newVisualId,
        linkId: this.newPartId
      } as Visual)

      this.origins.push({
        id: this.newOriginId,
        parentId: this.newVisualId,
        xyz: { x: 0, y: 0, z: 0 },
        rpy: { roll: 0, pitch: 0, yaw: 0 },
        parentType: OriginParentType.Visual
      } as Origin)

      this.geometries.push({
        id: this.newGeometryId,
        visualId: this.newVisualId,
        type: GeometryType.Box,
        size: { x: 0, y: 0, z: 0 },
        radius: 0,
        length: 0
      } as Geometry)

      this.materials.push({
        id: this.newMaterialId,
        visualId: this.newVisualId,
        color: '#ffffff'
      } as Material)

      this.newPartId++
      this.newVisualId++
      this.newOriginId++
      this.newGeometryId++
      this.newMaterialId++
    },
    addJoint () {
      this.parts.push({
        id: this.newPartId,
        name: `joint_${this.newPartId}`,
        type: PartType.Joint,
      } as Joint)

      this.origins.push({
        id: this.newOriginId,
        parentId: this.newPartId,
        xyz: { x: 0, y: 0, z: 0 },
        rpy: { roll: 0, pitch: 0, yaw: 0 },
        parentType: OriginParentType.Joint
      } as Origin)

      this.jointLimits.push({
        id: this.newJointLimitId,
        jointId: this.newPartId,
        lower: 0,
        upper: 0,
        effort: 0,
        velocity: 0
      } as JointLimit)

      this.axi.push({
        id: this.newAxisId,
        jointId: this.newPartId,
        x: 0,
        y: 0,
        z: 0
      } as Axis)

      this.newOriginId++;
      this.newJointLimitId++;
      this.newAxisId++;
      this.newPartId++
    },
    updatePart (newPart: Link | Joint) {
      const index = this.parts.findIndex(part => part.id === newPart.id)
      if (newPart) {
        this.parts[index] = newPart
      }
    },
    removePart (id: number) {
      this.parts.splice(this.parts.findIndex(part => part.id === id), 1)
    },
    updateVisual (newVisual: Visual) {
      const index = this.visuals.findIndex(visual => visual.id === newVisual.id)
      if (newVisual) {
        this.visuals[index] = newVisual
      }
    },
    updateOrigin (newOrigin: Origin) {
      const index = this.origins.findIndex(origin => origin.id === newOrigin.id)
      if (newOrigin) {
        this.origins[index] = newOrigin
      }
    },
    updateGeometry (visualId: number, newGeometry: Geometry) {
      const index = this.geometries.findIndex(geometry => geometry.visualId === visualId && geometry.id === newGeometry.id)
      if (newGeometry) {
        this.geometries[index] = newGeometry
      }
    },
    updateMaterial (visualId: number, newMaterial: Material) {
      const index = this.materials.findIndex(material => material.visualId === visualId && material.id === newMaterial.id)
      if (newMaterial) {
        this.materials[index] = newMaterial
      }
    },
    updateJointLimit (newJointLimit: JointLimit) {
      const index = this.jointLimits.findIndex(jointLimit => jointLimit.id == newJointLimit.id)
      if (newJointLimit) {
        this.jointLimits[index] = newJointLimit
      }
    },
    updateAxis (newAxis: Axis) {
      const index = this.axi.findIndex(axis => axis.id == newAxis.id)
      if (newAxis) {
        this.axi[index] = newAxis
      }
    }
  }
})
