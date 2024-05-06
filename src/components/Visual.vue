<script setup lang="ts">

import { GeometryType } from '@/enums/geometryType'
import type { Visual } from '@/models/visual'
import Origin from '@/components/Shared/Origin.vue'

const props = defineProps<{
  visual: Visual,
}>()

</script>

<template>
<div>
  <div class="grid grid-cols-12 col-span-2">
    <p class="text-lg font-bold col-span-1">Visual</p>
    <p class="col-span-1 col-start-3 pt-1">Name:</p>
    <input type="text" class="col-span-2 rounded-xl bg-gray-200 px-4 my-auto" :value="visual.name" />
  </div>
  <div class="grid grid-cols-12 space-x-2">
<!--    <origin :origin="visual.origin"/>-->
<!--    <geometry/>-->
<!--    <material/>-->
  </div>
</div>
</template>

<style scoped>

</style>
