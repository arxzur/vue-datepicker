<script setup lang="ts">
import VueDatepicker from "./components/VueDatepicker.vue"

function selectDate(date: string) {
  console.log(date)
  // YYYY-MM-DD
}

function addEvent() {
  console.log("Button clicked!")
}
</script>

<template>
  <VueDatepicker @select-date="selectDate" @add-event="addEvent"/>
</template>
