<script setup lang="ts">
import { onBeforeMount, onUpdated, ref, watch } from 'vue'
import { PartType } from '@/enums/PartType'
import type { Link } from '@/models/link'
import type { Visual } from '@/models/visual'
import LinkPart from '@/components/LinkPart.vue'
import type { Joint } from '@/models/joint'

const props = defineProps<{
  deleteParts: boolean,
}>()

const parts = ref([])
const visuals = ref([] as Visual[])

const newPartId = ref(2)
const newVisualId = ref(2)


const emit = defineEmits(['removed']);

watch(() => props.deleteParts, (value) => {
  if (value) {
    parts.value = []
    visuals.value = []

    emit('removed')
  }
})

watch(parts.value, () => {
  sessionStorage.setItem('parts', JSON.stringify(parts.value))
})


onBeforeMount(() => {
  if(sessionStorage.getItem('parts')){
    parts.value = JSON.parse(sessionStorage.getItem('parts')!)
  }
  parts.value = [];
})

function addLink(){
  parts.value.push({
    id: newPartId.value,
    name: `link_${newPartId.value}`,
    type: PartType.Link,
    visuals: []
  } as Link)

  newPartId.value++
}

function addJoint(){
  parts.value.push({
    id: newPartId.value,
    name: `joint_${newPartId.value}`
  } as Joint)

  newPartId.value++
}

function addVisual(linkId: number){
  parts.value.find(part => part.id === linkId)?.visuals.push({
    id: newVisualId.value,
    name: 'Visual' + newVisualId.value,
  })

  newVisualId.value++;
}

function removeVisual(linkId: number, visualId: number){
  parts.value.find(part => part.id === linkId)?.visuals.splice(parts.value.find(part => part.id === linkId)?.visuals.findIndex(visual => visual.id === visualId), 1)
}

function removePart(id: number){
  parts.value.splice(parts.value.findIndex(part => part.id === id), 1)

  for (const visual in visuals) {
    if (visual.linkId === id) {
      removeVisual(visual.id)
    }
  }
}

</script>

<template>
  <div class="bg-gray-100 rounded-3xl m-auto w-[65%] h-[90vh] overflow-auto">
    <div v-for="part in parts" :key="part.id">
      <LinkPart v-if="part.type == PartType.Link" :part="part" :key="part.id" @remove="removePart" @addVisual="addVisual" @removeVisual="removeVisual"/>
    </div>
    <div class="flex justify-center">
      <button @click="addLink" class="w-40 h-10 bg-green-500 hover:bg-green-700 rounded-xl" :class="{'mt-4' : parts.length == 0}">Add Link</button>
      <button @click="addJoint" class="w-40 h-10 bg-green-500 hover:bg-green-700 rounded-xl" :class="{'mt-4' : parts.length == 0}">Add Joint</button>
    </div>
  </div>
</template>

<style scoped>

</style>
