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

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: ref<(Link | Joint)[]>([]),
    visuals: ref<Visual[]>([]),
    origins: ref<Origin[]>([]),
    geometries: ref<Geometry[]>([]),
    materials: ref<Material[]>([]),
    newPartId: 0,
    newVisualId: 0,
    newOriginId: 0,
    newGeometryId: 0,
    newMaterialId: 0
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
    getPartVisuals (state): (id: number) => Visual[] {
      return (id: number) => state.visuals.filter(visual => visual.linkId === id)
    },
    getPartVisualsCount (state): (id: number) => number {
      return (id: number) => state.visuals.filter(visual => visual.linkId === id).length
    },
    getVisual (state): (linkId: number, visualId: number) => Visual | undefined {
      return (linkId: number, visualId: number) => state.visuals.find(visual => visual.linkId === linkId && visual.id === visualId)
    },
    getOrigin (state): (visualId: number) => Origin | undefined {
      return (visualId: number) => state.origins.find(origin => origin.visualId === visualId)
    },
    getGeometry (state): (visualId: number) => Geometry | undefined {
      return (visualId: number) => state.geometries.find(geometry => geometry.visualId === visualId)
    },
    getMaterial (state): (visualId: number) => Material | undefined {
      return (visualId: number) => state.materials.find(material => material.visualId === visualId)
    }
  },
  actions: {
    setParts (parts: (Link | Joint)[]) {
      this.parts = parts
    },
    addLink () {
      this.parts.push({
        id: this.newPartId,
        name: `link_${this.newPartId}`,
        type: PartType.Link,
        visuals: []
      } as Link)

      this.newPartId++
    },
    addJoint () {
      this.parts.push({
        id: this.newPartId,
        name: `joint_${this.newPartId}`
      } as Joint)

      this.newPartId++
    },
    updatePart (newPart: Link | Joint) {
      let part = this.parts.find(part => part.id === newPart.id)
      if (part) {
        part = newPart
      }
    },
    removePart (id: number) {
      this.parts.splice(this.parts.findIndex(part => part.id === id), 1)
    },
    addVisual (linkId: number) {
      this.visuals.push({
        id: this.newVisualId,
        linkId: linkId,
        name: `visual_${this.newVisualId}`
      } as Visual)

      this.origins.push({
        id: this.newOriginId,
        visualId: this.newVisualId,
        xyz: { x: 0, y: 0, z: 0 },
        rpy: { roll: 0, pitch: 0, yaw: 0 }
      } as Origin)

      this.geometries.push({
        id: this.newGeometryId,
        visualId: this.newVisualId,
        type: GeometryType.Box
      } as Geometry)

      this.materials.push({
        id: this.newMaterialId,
        visualId: this.newVisualId,
        color: '#ffffff'
      } as Material)

      this.newVisualId++
      this.newOriginId++
      this.newGeometryId++
      this.newMaterialId++
    },
    removeVisual (visualId: number) {
      this.visuals.splice(this.visuals.findIndex(visual => visual.id === visualId), 1)
    },
    updateVisual (linkId: number, visualId: number, newVisual: Visual) {
      let visual = this.visuals.find(visual => visual.linkId === linkId && visual.id === visualId)
      if (visual) {
        visual = newVisual
      }
    },
    updateOrigin (visualId: number, newOrigin: Origin) {
      let origin = this.origins.find(origin => origin.visualId === visualId && origin.id === newOrigin.id)
      if (origin) {
        origin = newOrigin
      }
    },
    updateGeometry (visualId: number, newGeometry: Geometry) {
      let geometry = this.geometries.find(geometry => geometry.visualId === visualId && geometry.id === newGeometry.id)
      if (geometry) {
        geometry = newGeometry
      }
    },
    updateMaterial (visualId: number, newMaterial: Material) {
      let material = this.materials.find(material => material.visualId === visualId && material.id === newMaterial.id)
      if (material) {
        material = newMaterial
      }
    }
  }
})
