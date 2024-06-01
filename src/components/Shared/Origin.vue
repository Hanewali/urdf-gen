<script setup lang="ts">

import type { Origin } from '@/models/origin'
import { usePartsStore } from '@/stores/PartsStore'
import { onUpdated } from 'vue'

const props = defineProps<{
  visualId: number
}>()

const store = usePartsStore();

const {getOrigin, updateOrigin} = store;

const origin = getOrigin(props.visualId) as Origin;

onUpdated(() => {
  updateOrigin(props.visualId, origin);
});

</script>

<template>
  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2">
    <div>
      <h2 class="font-bold">Origin</h2>
    </div>
    <div>
      <div class="grid grid-cols-2">
        <div class="space-y-2">
          <div>
            <label>x</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" :value="origin.xyz.x || 0" />
          </div>
          <div>
            <label>y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" :value="origin.xyz.y || 0" />
          </div>
          <div>
            <label>z</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" :value="origin.xyz.z || 0" />
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <label>r</label>
            <input type="number" class="rounded-xl bg-gray-200 px-2 ml-4 w-10 text-center" :value="origin.rpy.roll || 0"/>
          </div>
          <div>
            <label>p</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" :value="origin.rpy.pitch || 0"/>
          </div>
          <div>
            <label>y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" :value="origin.rpy.yaw || 0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
