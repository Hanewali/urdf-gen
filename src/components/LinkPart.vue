<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Link } from '@/models/link'
import { GeometryType } from '@/enums/geometryType'

const props = defineProps<{
  part: Link,
}>()
</script>

<template>
  <div class="">
    <div class="bg-white rounded-3xl m-4 p-4 flex">
      <p class="text-lg font-bold mr-8">{{ part.type }}</p>
      <label>Name:</label>
      <input type="text" class="rounded-xl bg-gray-200 px-4 ml-4" :value="part.name" />
      <p class="ml-4">Visual count: {{ part.visuals.length }}</p>
      <div class="ml-auto space-x-4">
        <button @click="$emit('addVisual', part.id)" class="rounded-xl bg-green-500 hover:bg-green-700 px-4 text-white">Add Visual</button>
        <button @click="$emit('remove', part.id)" class="rounded-xl bg-red-500 hover:bg-red-700 px-4 text-white"><font-awesome-icon :icon="['fas', 'x']" /></button>
      </div>
    </div>
    <div v-if="part.visuals.length" class="rounded-3xl m-2 w-[90%] ml-auto space-y-2">
      <div v-for="visual in part.visuals" :key="visual.id" class="grid grid-rows-2 bg-white p-4 rounded-3xl">
        <div class="grid grid-cols-12 col-span-2">
          <p class="text-lg font-bold col-span-1">Visual</p>
          <p class="col-span-1 col-start-3 pt-1">Name:</p>
          <input type="text" class="col-span-2 rounded-xl bg-gray-200 px-4 my-auto" :value="visual.name" />
        </div>
        <div class="grid grid-cols-12 space-x-2">
          <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2">
            <div>
              <h2 class="font-bold">Origin</h2>
            </div>
            <div>
              <div class="grid grid-cols-2 ">
                <div class="space-y-2">
                  <div>
                    <label>x</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="visual.origin?.xyz.x" />
                  </div>
                  <div>
                    <label>y</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="visual.origin?.xyz.y" />
                  </div>
                  <div>
                    <label>z</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="visual.origin?.xyz.z" />
                  </div>
                </div>
                <div class="space-y-2">
                  <div>
                    <label>r</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-2 ml-4 w-10" />
                  </div>
                  <div>
                    <label>p</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
                  </div>
                  <div>
                    <label>y</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid col-span-6 bg-gray-100 rounded-xl space-y-4 p-2">
            <div class="grid grid-cols-2">
              <h2 class="font-bold">Geometry</h2>
              <select :value=visual.geometry?.type class="rounded-3xl bg-gray-100 border-2 border-gray-300">
                <option v-for="type in [GeometryType.Box, GeometryType.Sphere, GeometryType.Cylinder]" :key="type" :value="type">{{ type }} </option>
              </select>
            </div>
            <div>
              <div class="grid grid-cols-2">
                <div class="space-y-2" v-if="visual.geometry?.type === 'Box'">
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
                <div class="space-y-2">
                  <div>
                    <label>radius</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
                  </div>
                  <div>
                    <label>length</label>
                    <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid bg-gray-100 rounded-xl space-y-4 p-2 col-span-2">
            <div>
              <h2 class="font-bold">Material</h2>
            </div>
            <div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label>Color</label>
                  <input type="color" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="rounded-3xl bg-red-500 hover:bg-red-700 my-auto h-8 mx-4 px-4 text-white col-span-1" @click="$emit('removeVisual', part.id, visual.id)"><font-awesome-icon :icon="['fas', 'x']" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
