<template>
  <datepicker v-model="picked" inputFormat="MM-dd" />
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())
</script>

<style scoped>

</style>
