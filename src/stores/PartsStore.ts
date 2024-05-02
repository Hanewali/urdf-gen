import { defineStore } from 'pinia'
import type { Link } from '@/models/link'
import type { Joint } from '@/models/joint'
import { PartType } from '@/enums/PartType'
import { ref } from 'vue'

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: [] as (Link | Joint)[],
    newPartId: ref(0),
    newVisualId: ref(0)
  }),
  getters: {
    getParts(){
      return this.parts
    },
    getLinks(){
      return this.parts.filter(part => part.type === PartType.Link) as Link[]
    },
    getJoints(){
      return this.parts.filter(part => part.type === PartType.Joint) as Joint[]
    },
    getPart: (state) => (id: number) => {
      return state.parts.find(part => part.id === id)
    },
    getPartVisuals: (state) => (id: number) => {
      return state.parts.find(part => part.id === id)?.visuals
    },
    getVisual: (state) => (linkId: number, visualId: number) => {
      return state.parts.find(part => part.id === linkId)?.visuals.find(visual => visual.id === visualId)
    }
  },
  actions: {
    addLink(){
      this.parts.push({
        id: newPartId.value,
        name: `link_${newPartId.value}`,
        type: PartType.Link,
        visuals: []
      } as Link)

      newPartId.value++
    },
    addJoint(){
      this.parts.push({
        id: newPartId.value,
        name: `joint_${newPartId.value}`
      } as Joint)

      newPartId.value++
    },
    removePart(id: number){
      this.parts.splice(this.parts.findIndex(part => part.id === id), 1)

      for (const visual in visuals) {
        if (visual.linkId === id) {
          removeVisual(visual.id)
        }
      }
    },
    addVisual(linkId: number){
      this.parts.find(part => part.id === linkId)?.visuals.push({
        id: newVisualId.value,
        name: 'Visual' + newVisualId.value,
      })

      newVisualId.value++;
    },
    removeVisual(linkId: number, visualId: number){
      this.parts.find(part => part.id === linkId)?.visuals.splice(this.parts.find(part => part.id === linkId)?.visuals.findIndex(visual => visual.id === visualId), 1)
    },
    updateVisual(linkId: number, visualId: number, newVisual: Visual){
      let visual = this.parts.find(part => part.id === linkId)?.visuals.find(visual => visual.id === visualId)
      if (visual) {
        visual = newVisual;
      }
    }
  }
})
