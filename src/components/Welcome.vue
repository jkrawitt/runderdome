<script setup lang="ts">
import nyrr, { type NyrrApiData, type RaceResult } from '@/api/nyrr'
import { ref } from 'vue'

import ResultCardBlock from './ResultCardBlock.vue'

defineProps<{
  msg: string
}>()

const firstname = ref('')
const lastname = ref('')

type PersonalResults = {
  firstName: string
  lastName: string
  resultList: RaceResult[]
  resultsCount: number | undefined
}

const blankResult: PersonalResults = {
  firstName: '',
  lastName: '',
  resultList: [],
  resultsCount: undefined,
}

const personalResults = ref<PersonalResults>(blankResult)

async function getResults() {
  const result = await fetchRaceResults()

  personalResults.value = {
    firstName: firstname.value,
    lastName: lastname.value,
    resultList: result.items,
    resultsCount: result.totalItems,
  }
}

const clear = () => {
  firstname.value = ''
  lastname.value = ''
  personalResults.value = blankResult
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
    <p>name: {{ personalResults.firstName + ' ' + personalResults.lastName }}</p>
    <p>number: {{ personalResults.resultsCount }}</p>
    <ResultCardBlock
      :results="personalResults.resultList"
      :focus-name="personalResults.lastName.toLowerCase()"
    ></ResultCardBlock>
  </div>
</template>
