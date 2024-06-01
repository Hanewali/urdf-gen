<script setup lang="ts">

import { GeometryType } from '@/enums/geometryType'
import type { Geometry } from '@/models/geometry'
import { usePartsStore } from '@/stores/PartsStore'

const store = usePartsStore();

const props = defineProps<{
  visualId: number
}>()

const geometry = store.getGeometry(props.visualId) as Geometry;

</script>

<template>
  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2">
    <div class="flex items-center mb-auto">
      <h2 class="font-bold">Geometry</h2>
      <select v-model="geometry.type" class="rounded-3xl bg-gray-100 border-2 border-gray-300 ml-7">
        <option v-for="type in [GeometryType.Box, GeometryType.Sphere, GeometryType.Cylinder]" :key="type" :value="type">{{ type }} </option>
      </select>
    </div>
    <div>
      <div>
        <div class="space-y-2" v-if="geometry?.type === 'Box'">
          <div>
            <label>size x</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
          <div>
            <label>size y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
          <div>
            <label>size z</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
        </div>
        <div class="space-y-2" v-if="geometry.type === 'Cylinder'">
          <div>
            <label>radius</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
          <div>
            <label>length</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
        </div>
        <div class="space-y-2" v-if="geometry.type === 'Sphere'">
          <div>
            <label>radius</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
