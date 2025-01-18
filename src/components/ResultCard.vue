<script setup lang="ts">
import type { RaceResult } from '@/api/nyrr'

defineProps<{
  focus: Boolean
  result: RaceResult
}>()
</script>

<template>
  <div>
    {{ result.firstName }} {{ result.lastName }}: {{ result.overallTime }}
    <span v-if="focus"><---- This is you!</span>
  </div>
</template>
