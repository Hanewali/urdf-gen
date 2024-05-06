import { defineStore } from 'pinia'
import type { Link } from '@/models/link'
import type { Joint } from '@/models/joint'
import { PartType } from '@/enums/PartType'
import { ref } from 'vue'
import type { Visual } from '@/models/visual'

export const usePartsStore = defineStore('parts', {
  state: () => ({
    parts: [] as (Link | Joint)[],
    newPartId: ref(0),
    newVisualId: ref(0)
  }),
  getters: {
    getParts() : (Link | Joint)[] {
      return this.parts;
    },
    getPartsCount() : number{
      return this.parts.length;
    },
    getLinks() : Link[]{
      return this.parts.filter(part => part.type === PartType.Link) as Link[]
    },
    getJoints() : Joint[]{
      return this.parts.filter(part => part.type === PartType.Joint) as Joint[]
    },
    getPart: (state)  => (id: number)  =>  {
      return state.parts.find(part => part.id === id)
    },
    getPartVisuals: (state) => (id: number) => {
      //cast type to link before accessing visuals
      return (state.parts.find(part => part.id === id) as Link).visuals;
    },
    getVisual: (state) => (linkId: number, visualId: number) => {
      return (state.parts.find(part => part.id === linkId) as Link).visuals.find(visual => visual.id === visualId);
    }
  },
  actions: {
    setParts(parts: (Link | Joint)[]){
      this.parts = parts
    },
    addLink(){
      this.parts.push({
        id: this.newPartId,
        name: `link_${this.newPartId}`,
        type: PartType.Link,
        visuals: []
      } as Link)

      this.newPartId++
    },
    addJoint(){
      this.parts.push({
        id: this.newPartId,
        name: `joint_${this.newPartId}`
      } as Joint)

      this.newPartId++
    },
    updatePart(newPart: Link | Joint){
      let part = this.parts.find(part => part.id === newPart.id)
      if (part) {
        part = newPart
      }
    },
    removePart(id: number){
      this.parts.splice(this.parts.findIndex(part => part.id === id), 1)
    },
    addVisual(linkId: number){
      (this.parts.find(part => part.id === linkId) as Link)?.visuals.push({
        id: this.newVisualId,
        name: 'Visual' + this.newVisualId,
      } as Visual)

      this.newVisualId++;
    },
    removeVisual(linkId: number, visualId: number){
      (this.parts.find(part => part.id === linkId) as Link)?.visuals.splice((this.parts.find(part => part.id === linkId) as Link)?.visuals.findIndex(visual => visual.id === visualId), 1)
    },
    updateVisual(linkId: number, visualId: number, newVisual: Visual){
      let visual = (this.parts.find(part => part.id === linkId) as Link)?.visuals.find(visual => visual.id === visualId)
      if (visual) {
        visual = newVisual;
      }
    }
  }
})
