<script setup lang="ts">

import type { Material } from '@/models/material'
import { usePartsStore } from '@/stores/PartsStore'
import { onUpdated } from 'vue'

const props = defineProps<{
  visualId: number
}>()

const store = usePartsStore();

const {getMaterial, updateMaterial} = store;

const material = getMaterial(props.visualId) as Material;

onUpdated(() => {
  updateMaterial(props.visualId, material);
});

</script>

<template>
  <div class="grid col-span-4 bg-gray-100 rounded-xl space-y-4 p-2">
    <div>
      <h2 class="font-bold">Material</h2>
    </div>
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label>Color</label>
          <input type="color" class="rounded-xl bg-gray-200 px-1 ml-4 w-10" v-model="material.color" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
