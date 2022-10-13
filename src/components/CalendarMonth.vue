<script setup>

import moment from "moment"
import { ref, onMounted } from "vue"

const props = defineProps({
  displayEventButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  displayWeekNumbers: {
    type: Boolean,
    required: false,
    default: true,
  },
  displayYear: {
    type: Boolean,
    required: false,
    default: false,
  },
  weekdayNames: {
    type: Array,
    required: false,
    default(rawProps) {
      return ["M", "T", "W", "T", "F", "S", "S"]
    },
    validator(value) {
      return value.length === 7
    },
  },
  buttonCaption: {
    type: String,
    required: false,
    default: "Add event",
  },
})

const month = ref(moment().format("YYYY-MM"))
const today = ref(moment().format("YYYY-MM-DD"))
const prevMonth = ref(moment(month.value).add(-1, "months").format("YYYY-MM"))
const nextMonth = ref(moment(month.value).add(1, "months").format("YYYY-MM"))
const daysInMonth = ref(moment(month.value).daysInMonth())
const daysInMonthPrev = ref(moment(prevMonth.value).daysInMonth())
const firstDay = ref(moment(month.value).startOf("month").isoWeekday())
const lastDay = ref(moment(month.value).endOf("month").isoWeekday())
const days = ref([])
const weekNumbers = ref([])
const activeDate = ref(null)

function getMonthDays(monthOffset) {
  month.value = moment(month.value).add(monthOffset, "months").format("YYYY-MM")
  prevMonth.value = moment(month.value).add(-1, "months").format("YYYY-MM")
  nextMonth.value = moment(month.value).add(1, "months").format("YYYY-MM")
  daysInMonth.value = moment(month.value).daysInMonth()
  daysInMonthPrev.value = moment(prevMonth.value).daysInMonth()
  firstDay.value = moment(month.value).startOf("month").isoWeekday()
  lastDay.value = moment(month.value).endOf("month").isoWeekday()
  days.value = []

  // previous month days
  for (let n = daysInMonthPrev.value - firstDay.value + 2; n <= daysInMonthPrev.value; n++) {
    days.value.push(prevMonth.value + "-" + n)
  }

  // current month days
  for (let n = 1; n <= daysInMonth.value; n++) {
    let date = n.toString()
    if (date.length < 2) date = "0" + n
    days.value.push(month.value + "-" + date)
  }

  // next month days
  for (let n = 1; n <= 7 - lastDay.value; n++) {
    let date = n.toString()
    if (date.length < 2) date = "0" + n
    days.value.push(nextMonth.value + "-" + date)
  }

  // add 6th week if missing
  while (days.value.length < 42) {
    let date = moment(days.value[days.value.length - 1]).add(1, "days").format("YYYY-MM-DD")
    days.value.push(date)
  }

  // update week numbers
  getWeekNumbers()
}

function getWeekNumbers() {
  weekNumbers.value = []
  let m = []
  for (let n of days.value) m.push(moment(n).format("ww"))
  weekNumbers.value = m.filter((v, i) => m.indexOf(v) === i)
  while (weekNumbers.value.length > 6) weekNumbers.value.pop()
}

function toggleActiveDate(date) {
  activeDate.value = activeDate.value === date ? null : date
}

onMounted(() => {
  getMonthDays()
})
</script>

<template>
  <div class="flex">
    <div v-if="displayWeekNumbers">
      <div class="grid grid-cols-1 w-8 text-[0.7rem] pt-[3.3rem]">
        <div 
          class="w-8 h-8 grid justify-center content-center text-gray-400 font-[650]" 
          v-for="n in weekNumbers"
        >
          {{n}}
        </div>
      </div>
    </div>
    <div>
      <div class="flex grid-cols-3 w-56 justify-between">
        <div class="text-gray-400 text-sm grid content-center cursor-pointer" @click="getMonthDays(-1)">
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </div>
        <div class="font-[650] text-sm">
          {{moment(month).format('MMMM')}}
          <span v-if="displayYear">
            {{moment(month).format('YYYY')}}
          </span>
        </div>
        <div class="text-gray-400 text-sm grid content-center cursor-pointer" @click="getMonthDays(1)">
          <font-awesome-icon icon="fa-solid fa-angle-right" />
        </div>
      </div>
      <div class="grid grid-cols-7 w-56 text-[0.7rem]">
        <div 
          class="w-8 h-8 grid justify-center content-center text-gray-400 font-[600]" 
          v-for="n in weekdayNames"
        >
          {{n}}
        </div>
      </div>
      <div class="grid grid-cols-7 w-56 text-[0.7rem] border-b border-r rounded-md shadow-sm border-gray-200">
        <button 
          @click="
            toggleActiveDate(moment(n).format('YYYY-MM-DD')), 
            $emit('selectDate', n === activeDate ? n : null)
          "
          :disabled="moment(n).format('YYYY-MM') !== month"
          :class="[
            'w-8 h-8 border-l border-t border-gray-200 font-[650] p-1 cursor-pointer',
            {'bg-gray-50 text-gray-400 cursor-not-allowed': moment(n).format('YYYY-MM') !== month},
            {'rounded-tl-md': index === 0},
            {'rounded-tr-md': index === 6},
            {'rounded-bl-md': index === 35},
            {'rounded-br-md': index === 41},
            {'text-indigo-500': moment(n).format('YYYY-MM-DD') === today}
          ]" 
          v-for="(n, index) in days"
        >
          <div 
            :class="[
              {'bg-black text-white w-full h-full rounded-full': activeDate === moment(n).format('YYYY-MM-DD')},
              'grid justify-center content-center'
            ]"
          >
            {{moment(n).format("DD")}}
          </div>
        </button>
      </div>
      <div 
        v-if="displayEventButton"
        @click="$emit('addEvent')"
        class="
          grid 
          content-center 
          justify-center 
          shadow-md
          mt-4 
          w-56 h-8 
          rounded-md 
          bg-indigo-600 text-white 
          font-[650] text-sm
          cursor-pointer
          select-none
        "
      >
        {{buttonCaption}}
      </div>
    </div>
  </div>
</template>
