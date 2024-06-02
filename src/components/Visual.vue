<script setup lang="ts">

import type { Visual } from '@/models/visual'
import { usePartsStore } from '@/stores/PartsStore'
import Origin from '@/components/Shared/Origin.vue'
import { onUpdated } from 'vue'
import Geometry from '@/components/Shared/Geometry.vue'
import Material from '@/components/Shared/Material.vue'
import { OriginParentType } from '@/enums/OriginParentType'

const props = defineProps<{
  partId: number
}>()

const store = usePartsStore();

const {getVisual} = store;

const visual = getVisual(props.partId) as Visual;

onUpdated(() => {
  store.updateVisual(visual);
});

</script>

<template>
<div class="space-y-2">
  <div class="grid grid-cols-12 space-x-2">
    <origin :parentId="visual.id" :parentType="OriginParentType.Visual"/>
    <geometry :visualId="visual.id"/>
    <material  :visualId="visual.id"/>
  </div>
</div>
</template>

<style scoped>

</style>
