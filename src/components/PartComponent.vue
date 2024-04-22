<script setup lang="ts">

const props = defineProps<{
  part: RobotPart
}>()

function remove(){
  console.log('remove')
}

</script>

<template>
<div>
  <div class="">
    <div class="bg-white rounded-3xl m-4 p-4 flex">
      <h2 class="text-2xl font-bold">{{ part.name }}</h2>
      <p class="text-lg">{{ part.type }}</p>
      <button @click="$emit('remove', part.id)" class="bg-red-500 hover:bg-red-700 p-4 text-white ml-auto">-</button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
