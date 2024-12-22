<script setup lang="ts">
import nyrr, { type NyrrApiData, type RaceResult } from '@/api/nyrr'
import { ref } from 'vue'

import ResultCardBlock from './ResultCardBlock.vue'

defineProps<{
  msg: string
}>()

const name = ref('')
const displayName = ref('')
const resultsList = ref<RaceResult[]>([])
const resultsCount = ref<Partial<number>>()

async function getResults() {
  const result = await fetchRaceResults()
  resultsList.value = result.items
  resultsCount.value = result.totalItems
  displayName.value = name.value
}

const fetchRaceResults = async (): Promise<NyrrApiData> => {
  const postBody = {
    eventCode: 'M2024',
    searchString: name.value,
    handicap: null,
    sortColumn: 'overallTime',
    sortDescending: false,
    pageIndex: 1,
    pageSize: 100,
  }

  const response = await nyrr('runners/finishers-filter', postBody)
  return response.data
}
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>Enter your first name and see how you stack up</p>
    <input v-model="name" @keyup.enter="getResults()" />
    <button @click="getResults()">Submit!</button>
    <p>name: {{ displayName }}</p>
    <p>number: {{ resultsCount }}</p>
    <ResultCardBlock :results="resultsList"></ResultCardBlock>
  </div>
</template>
