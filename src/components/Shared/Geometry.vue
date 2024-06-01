<script setup lang="ts">

import { GeometryType } from '@/enums/geometryType'
import type { Geometry } from '@/models/geometry'
import { usePartsStore } from '@/stores/PartsStore'
import { onUpdated } from 'vue'

const store = usePartsStore();

const props = defineProps<{
  visualId: number
}>()

const geometry = store.getGeometry(props.visualId) as Geometry;

onUpdated(() => {
  store.updateGeometry(props.visualId, geometry);
});

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
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.size.x" />
          </div>
          <div>
            <label>size y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.size.y" />
          </div>
          <div>
            <label>size z</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.size.z" />
          </div>
        </div>
        <div class="space-y-2" v-if="geometry.type === 'Cylinder'">
          <div>
            <label>radius</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.radius" />
          </div>
          <div>
            <label>length</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.length" />
          </div>
        </div>
        <div class="space-y-2" v-if="geometry.type === 'Sphere'">
          <div>
            <label>radius</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="geometry.radius" />
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
