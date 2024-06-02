<script setup lang="ts">

import { usePartsStore } from '@/stores/PartsStore'
import type { JointLimit } from '@/models/jointLimit'
import { onUpdated } from 'vue'

const props = defineProps<{
  jointId: number
}>()

const store = usePartsStore();

const limit = store.getJointLimit(props.jointId) as JointLimit;

console.log(limit);

onUpdated(() => {
  store.updateJointLimit(props.jointId, limit);
});


</script>

<template>
  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p p-2">
    <div>
      <h2 class="font-bold">Limit</h2>
    </div>
    <div>
      <div class="grid grid-cols-2 space-x-2">
        <div class="space-y-2">
          <div>
            <label>Upper</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="limit.upper" />
          </div>
          <div>
            <label>Lower</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="limit.lower" />
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <label>Velocity</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="limit.velocity" />
          </div>
          <div>
            <label class="pr-4">Effort</label>
            <input type="number" class="rounded-xl bg-gray-200 px-1 ml-4 w-10 text-center" v-model="limit.effort" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
