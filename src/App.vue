<script setup lang="ts">
import RobotParts from '@/components/robot-parts.vue'
import Buttons from '@/components/buttons.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <app-header />

  <main class="flex pt-3">
    <robot-parts/>
    <buttons/>
  </main>
</template>

