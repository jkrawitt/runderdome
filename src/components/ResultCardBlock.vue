<script setup lang="ts">
import type { RaceResult } from '@/api/nyrr'

import ResultCard from './ResultCard.vue'

defineProps<{
  results: RaceResult[]
}>()
</script>

<template>
  <div>
    <ul>
      <li v-for="result in results" :key="result.runnerId">
        <ResultCard :result="result"></ResultCard>
      </li>
    </ul>
  </div>
</template>
