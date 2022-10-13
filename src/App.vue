<script setup>
import CalendarMonth from "./components/CalendarMonth.vue"

function test(n) {
  console.log(n)
}
</script>

<template>
  <div class="p-10">
    <CalendarMonth @select-date="test" />
  </div>
</template>
