<script setup lang="ts">
import type { RaceResult } from '@/api/nyrr'

import ResultCard from './ResultCard.vue'

defineProps<{
  focusName: string
  results: RaceResult[]
}>()
</script>

<template>
  <div>
    <ul>
      <li v-for="result in results" :key="result.runnerId">
        <ResultCard :result="result" :focus="result.lastName.toLowerCase() === focusName"></ResultCard>
      </li>
    </ul>
  </div>
</template>
