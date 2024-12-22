<script setup lang="ts">
import type { RaceResult } from '@/api/nyrr'

defineProps<{
  result: RaceResult
}>()
</script>

<template>
  <div>{{ result.firstName }} {{ result.lastName }}: {{ result.overallTime }}</div>
</template>
