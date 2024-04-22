<script setup lang="ts">
import type { RobotPart } from '@/models/robotPart'
import { ref } from 'vue'
import PartComponent from '@/components/PartComponent.vue'
import { PartType } from '@/enums/PartType'
import type { Link } from '@/models/link'

const parts = ref([] as RobotPart[])

parts.value.push({
  id: 1,
  name: 'Robot Part 1',
  type: PartType.Link
} as Link)

function insert(){
  parts.value.push({
    id: parts.value.length + 1,
    name: `Robot Part ${parts.value.length + 1}`,
    type: PartType.Link
  } as Link)
}

function remove(id: number){
  parts.value.splice(parts.value.findIndex(part => part.id === id), 1)
}

</script>

<template>
  <div class="bg-gray-100 rounded-3xl m-auto block w-[65%] h-[90vh]">
    <PartComponent v-for="part in parts" :part="part" :key="part.id" @remove="remove"></PartComponent>
    <button @click="insert" class="w-40 h-10 bg-green-500 hover:bg-green-700">+</button>
  </div>
</template>

<style scoped>

</style>
