<script setup lang="ts">

import type { Visual } from '@/models/visual'
import { usePartsStore } from '@/stores/PartsStore'
import Origin from '@/components/Shared/Origin.vue'
import { onUpdated } from 'vue'
import Geometry from '@/components/Shared/Geometry.vue'
import Material from '@/components/Shared/Material.vue'
import { OriginParentType } from '@/enums/OriginParentType'

const props = defineProps<{
  partId: number,
  visualId: number
}>()

const store = usePartsStore();

const {removeVisual, getVisual} = store;

const visual = getVisual(props.partId, props.visualId) as Visual;

onUpdated(() => {
  store.updateVisual(props.partId, props.visualId, visual);
});

</script>

<template>
<div>
  <div class="flex items-center">
    <div class="grid grid-cols-12 col-span-2">
      <p class="text-lg font-bold col-span-1">Visual</p>
      <p class="col-span-1 col-start-3 pt-1">Name:</p>
      <input type="text" class="col-span-2 rounded-xl bg-gray-200 px-4 my-auto" v-model="visual.name" />
    </div>
    <button class="rounded-3xl bg-red-500 hover:bg-red-700 mt-2 mb-2 h-8 ml-auto mr-2 px-4 text-white col-span-1" @click="removeVisual(visualId)"><i class="fa-solid fa-x"/></button>
  </div>
  <div class="grid grid-cols-12 space-x-2">
    <origin :parentId="visualId" :parentType="OriginParentType.Visual"/>
    <geometry :visualId="visualId"/>
    <material  :visualId="visualId"/>
  </div>
</div>
</template>

<style scoped>

</style>
