# vue-datepicker

Vue/tailwind datepicker component. See [demo here](https://vitejs.dev/config/) and [source here](https://vitejs.dev/config/).

<iframe src="https://codesandbox.io/embed/inspiring-ioana-6ns5vn?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="inspiring-ioana-6ns5vn"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

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

For contact, bug reports see [repo here](https://vitejs.dev/config/).

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

This component is open-sourced software licensed under the [MIT license](https://vitejs.dev/config/).
