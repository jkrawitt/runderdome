<script setup lang="ts">
import nyrr, { type NyrrApiData, type RaceResult } from '@/api/nyrr'
import { ref } from 'vue'

import ResultCardBlock from './ResultCardBlock.vue'

defineProps<{
  msg: string
}>()

const firstname = ref('')
const lastname = ref('')
const displayFirstName = ref('')
const displayLastName = ref('')
const resultsList = ref<RaceResult[]>([])
const resultsCount = ref<Partial<number>>()

async function getResults() {
  const result = await fetchRaceResults()
  resultsList.value = result.items
  resultsCount.value = result.totalItems
  displayFirstName.value = firstname.value
  displayLastName.value = lastname.value
}

const clear = () => {
  firstname.value = ''
  lastname.value = ''
  displayFirstName.value = ''
  displayLastName.value = ''
  resultsList.value = []
  resultsCount.value = undefined
}

const fetchRaceResults = async (): Promise<NyrrApiData> => {
  const postBody = {
    eventCode: 'M2024',
    searchString: firstname.value,
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
    <p>Enter your name and see how you stack up</p>
    <input v-model="firstname" @keyup.enter="getResults()" placeholder="First Name" />
    <input v-model="lastname" @keyup.enter="getResults()" placeholder="Last Name (Optional)" />
    <button @click="getResults()">Submit!</button>
    <button @click="clear()">Clear</button>
    <p>name: {{ displayFirstName + ' ' + displayLastName }}</p>
    <p>number: {{ resultsCount }}</p>
    <ResultCardBlock
      :results="resultsList"
      :focus-name="displayLastName.toLowerCase()"
    ></ResultCardBlock>
  </div>
</template>
