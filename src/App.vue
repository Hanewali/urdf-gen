<script setup lang="ts">
import RobotParts from '@/components/RobotParts.vue'
import Buttons from '@/components/BaseButtons.vue'
import AppHeader from '@/components/AppHeader.vue'
import { ref } from 'vue'

const deleteParts = ref(false)

function removeAll() {
  deleteParts.value = true
}

function removed(){
  deleteParts.value = false
}

</script>

<template>
  <app-header />

  <main class="flex pt-3">
    <robot-parts :delete-parts="deleteParts" @removed="removed"/>
    <buttons @removeAll="removeAll"/>
  </main>
</template>

