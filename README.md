# vue-datepicker

Vue/tailwind datepicker component. See [demo here](https://codesandbox.io/embed/inspiring-ioana-6ns5vn?fontsize=14&hidenavigation=1&theme=dark/) and [source here](https://gitlab.com/arxzur/vue-datepicker/).

## Install

```sh
npm i @arxzur/vue-datepicker
```

## Basic usage

### Import component styles

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@arxzur/vue-datepicker/dist/index.css";

createApp(App).mount("#app");
```

### Import Vue component

```ts
// App.vue
<script setup lang="ts">
import { VueDatepicker } from "@arxzur/vue-datepicker"

</script>

<template>
  <VueDatepicker />
</template>
```

## Available props

```ts
const props = withDefaults(defineProps<{
  hasEventButton?: boolean
  hasWeekNumbers?: boolean
  hasYear?: boolean
  weekdayNames?: string[]
  eventButtonName?: string
}>(), {
  hasEventButton: true,
  hasWeekNumbers: true,
  hasYear: false,
  weekdayNames: () => ["M", "T", "W", "T", "F", "S", "S"],
  eventButtonName: "Add event",
})
```

## Events emitted

```ts
// App.vue
<script setup lang="ts">
import VueDatepicker from "./components/VueDatepicker.vue"

function selectDate(date: string) {
  console.log(date) // YYYY-MM-DD
}

function addEvent() {
  console.log("Button clicked!")
}
</script>

<template>
  <VueDatepicker @select-date="selectDate" @add-event="addEvent"/>
</template>
```

## Contribute

For contact, bug reports see [repo here](https://gitlab.com/arxzur/vue-datepicker/).

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build in library mode

```sh
npm run build:lib
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:run
```

## Licence

This component is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT/).
