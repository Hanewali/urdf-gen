<script setup lang="ts">

import type { Origin } from '@/models/origin'

const props = defineProps<{
  origin: Origin
}>()

</script>

<template>
  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2">
    <div>
      <h2 class="font-bold">Origin</h2>
    </div>
    <div>
      <div class="grid grid-cols-2 ">
        <div class="space-y-2">
          <div>
            <label>x</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="origin?.xyz.x" />
          </div>
          <div>
            <label>y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="origin?.xyz.y" />
          </div>
          <div>
            <label>z</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" :value="origin?.xyz.z" />
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
</template>

<style scoped>

</style>
