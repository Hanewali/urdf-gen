<script setup lang="ts">

import { usePartsStore } from '@/stores/PartsStore'
import { onUpdated, watch } from 'vue'
import type { Joint } from '@/models/joint'
import { JointType } from '@/enums/jointType'
import { OriginParentType } from '@/enums/OriginParentType'
import Origin from '@/components/Shared/Origin.vue'
import JointLimit from '@/components/Shared/JointLimit.vue'
import JointAxis from '@/components/Shared/JointAxis.vue'

const props = defineProps<{
  partId: number
}>()

const store = usePartsStore();

const {getLinks} = store;

let joint = store.getPart(props.partId) as Joint;

let links = getLinks;
if(joint.parentLinkName === undefined) {
  joint.parentLinkName = links.map(x => x.name)[0];
}
if(joint.childLinkName === undefined) {
  joint.childLinkName = links.map(x => x.name)[0];
}
if(joint.jointType === undefined) {
  joint.jointType = JointType.Fixed;
}

onUpdated(() => {
  store.updatePart(joint);
});

</script>

<template>
<div class="bg-white rounded-3xl m-4 p-4">
  <div class="flex items-center">
    <p class="text-lg font-bold mr-8">{{ joint.type }}</p>
    <label>Name:</label>
    <input type="text" class="rounded-xl bg-gray-200 px-4 ml-4" v-model="joint.name" />
    <div class="ml-auto space-x-4">
      <button
        @click="store.removePart(joint.id)"
        class="rounded-xl bg-red-500 hover:bg-red-700 px-4 text-white">
        <i class="fa-solid fa-x" />
      </button>
    </div>
  </div>
  <div class="space-x-2 space-y-2">
    <div class="flex items-center ml-4">
      <div class="space-x-4 rounded-xl bg-gray-100 px-4 py-2 mt-4 max-w-max">
        <label>Parent link:</label>
        <select v-model="joint.parentLinkName" class="rounded-3xl bg-gray-200 border-2 border-gray-300 ml-7 px-2">
          <option v-for="link in store.getLinks" :key="link.id" :value="link.name">{{ link.name }} </option>
        </select>
        <label>Child link:</label>
        <select v-model="joint.childLinkName" class="rounded-3xl bg-gray-200 border-2 border-gray-300 ml-7 px-2">
          <option v-for="link in store.getLinks" :key="link.id" :value="link.name">{{ link.name }} </option>
        </select>
      </div>
      <div class="space-x-4 rounded-xl bg-gray-100 px-4 py-2 ml-4 mt-4 max-w-max">
        <label>Type:</label>
        <select v-model="joint.jointType" class="rounded-3xl bg-gray-200 border-2 border-gray-300 ml-7 px-2">
          <option v-for="type in [JointType.Fixed, JointType.Revolute]" :key="type" :value="type">{{ type }} </option>
        </select>
      </div>
    </div>
    <div class="flex items-stretch space-x-2 ml-4">
      <origin :parentId="partId" :parentType="OriginParentType.Joint"/>
      <jointLimit :jointId="partId"/>
      <jointAxis :jointId="partId"/>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
