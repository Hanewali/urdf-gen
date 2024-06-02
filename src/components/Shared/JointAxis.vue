<script setup lang="ts">

import { usePartsStore } from '@/stores/PartsStore'
import { onUpdated } from 'vue'
import type { Axis } from '@/models/axis'

const props = defineProps<{
  jointId: number
}>()

const store = usePartsStore();

const axis = store.getAxis(props.jointId) as Axis;

onUpdated(() => {
  store.updateAxis(axis);
});

</script>

<template>

  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2 h-max">
    <div>
      <h2 class="font-bold">Axis</h2>
    </div>
    <div>
      <div class="grid grid-cols-2">
        <div class="space-y-2">
          <div>
            <label>X</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="axis.x" />
          </div>
          <div>
            <label>Y</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="axis.y" />
          </div>
          <div>
            <label>Z</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="axis.z" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
