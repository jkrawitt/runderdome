<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  msg: string
}>()

const name = ref("")
const displayName = ref("")

function log() {
  displayName.value = name.value
}
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>Enter your name and see how you stack up</p>
    <input v-model="name" @keyup.enter="log()" />
    <button @click="log()">Submit!</button>
    <p>name: {{ displayName }}</p>
  </div>
</template>
