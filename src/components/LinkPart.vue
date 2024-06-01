<script setup lang="ts">
import type { Link } from '@/models/link'
import Visual from '@/components/Visual.vue'
import { onUpdated } from 'vue'
import { usePartsStore } from '@/stores/PartsStore'

const props = defineProps<{
  partId: number
}>()

const store = usePartsStore()

const { getPart, updatePart, addVisual, removePart, getPartVisuals, getPartVisualsCount } = store

const part = getPart(props.partId) as Link

onUpdated(() => {
  updatePart(part)
})
</script>

<template>
  <div class="">
    <div class="bg-white rounded-3xl m-4 p-4 flex">
      <p class="text-lg font-bold mr-8">{{ part.type }}</p>
      <label>Name:</label>
      <input type="text" class="rounded-xl bg-gray-200 px-4 ml-4" v-model="part.name" />
      <p class="ml-4">Visual count: {{ getPartVisualsCount(props.partId) }}</p>
      <div class="ml-auto space-x-4">
        <button
          @click="addVisual(part.id)"
          class="rounded-xl bg-green-500 hover:bg-green-700 px-4 text-white">
          Add Visual
        </button>
        <button
          @click="removePart(part.id)"
          class="rounded-xl bg-red-500 hover:bg-red-700 px-4 text-white">
          <i class="fa-solid fa-x" />
        </button>
      </div>
    </div>
    <div v-if="getPartVisualsCount(props.partId)" class="rounded-3xl m-2 w-[90%] ml-auto space-y-2">
      <div v-for="visual in getPartVisuals(props.partId)" :key="visual.id" class="grid grid-rows-1 p-4 pt-1 bg-white rounded-3xl">
        <visual :partId="part.id" :visualId="visual.id" class="visual"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
