<script setup lang="ts">
import { onBeforeMount, watch } from 'vue'
import { PartType } from '@/enums/PartType'
import LinkPart from '@/components/LinkPart.vue'
import { usePartsStore } from '@/stores/PartsStore'
import JointPart from '@/components/JointPart.vue'

const props = defineProps<{
  deleteParts: boolean,
}>()

const store = usePartsStore();
const {addLink, addJoint, removePart, getPartsCount } = store;

const emit = defineEmits(['removed']);

watch(() => props.deleteParts, () => {
  store.$reset();

  emit('removed');
})

onBeforeMount(() => {
 if(localStorage.getItem('parts')){
   store.$patch(JSON.parse(localStorage.getItem('parts') ?? ''));
 }
})

store.$subscribe((mutation, state) => {
  localStorage.setItem('parts', JSON.stringify(state));
});

</script>

<template>
  <div class="bg-gray-100 rounded-3xl m-auto w-[65%] h-[90vh] overflow-auto">
    <div v-for="part in store.getParts" :key="part.id">
      <LinkPart v-if="part.type == PartType.Link" :partId="part.id" :key="part.id" @remove="removePart(part.id)"/>
      <JointPart v-if="part.type == PartType.Joint" :partId="part.id" :key="part.id" @remove="removePart(part.id)"/>
    </div>
    <div class="flex justify-center">
      <button @click="addLink()" class="w-40 h-10 bg-green-500 hover:bg-green-700 rounded-xl" :class="{'mt-4' : getPartsCount == 0}">Add Link</button>
      <button @click="addJoint()" class="w-40 h-10 bg-green-500 hover:bg-green-700 rounded-xl" :class="{'mt-4' : getPartsCount == 0}">Add Joint</button>
    </div>
  </div>
</template>

<style scoped>

</style>
