<script setup lang="ts">
import moment from "moment"
import { ref, onBeforeMount } from "vue"
import type { Ref } from "vue"

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

const month = ref(moment().format("YYYY-MM"))
const today = ref(moment().format("YYYY-MM-DD"))
const prevMonth = ref(moment(month.value).add(-1, "months").format("YYYY-MM"))
const nextMonth = ref(moment(month.value).add(1, "months").format("YYYY-MM"))
const daysInMonth = ref(moment(month.value).daysInMonth())
const daysInMonthPrev = ref(moment(prevMonth.value).daysInMonth())
const firstDay = ref(moment(month.value).startOf("month").isoWeekday())
const lastDay = ref(moment(month.value).endOf("month").isoWeekday())
const days: Ref<string[]> = ref([])
const weekNumbers: Ref<string[]> = ref([])
const activeDate = ref("")

function paginate(monthOffset?: number) {
  month.value = moment(month.value).add(monthOffset, "months").format("YYYY-MM")
  prevMonth.value = moment(month.value).add(-1, "months").format("YYYY-MM")
  nextMonth.value = moment(month.value).add(1, "months").format("YYYY-MM")
  daysInMonth.value = moment(month.value).daysInMonth()
  daysInMonthPrev.value = moment(prevMonth.value).daysInMonth()
  firstDay.value = moment(month.value).startOf("month").isoWeekday()
  lastDay.value = moment(month.value).endOf("month").isoWeekday()
  days.value = []
  // prefix days from previous month
  for (let n = daysInMonthPrev.value - firstDay.value + 2; n <= daysInMonthPrev.value; n++) {
    days.value.push(prevMonth.value + "-" + n)
  }
  // set days for current month
  for (let n = 1; n <= daysInMonth.value; n++) {
    let date = n.toString()
    if (date.length < 2) date = "0" + n
    days.value.push(month.value + "-" + date)
  }
  // postfix days from following month
  for (let n = 1; n <= 7 - lastDay.value; n++) {
    let date = n.toString()
    if (date.length < 2) date = "0" + n
    days.value.push(nextMonth.value + "-" + date)
  }
  // ensure 6th week always present
  while (days.value.length < 42) {
    let date = moment(days.value[days.value.length - 1]).add(1, "days").format("YYYY-MM-DD")
    days.value.push(date)
  }
  // set week numbers for current page
  weekNumbers.value = []
  let m: string[] = []
  for (let n of days.value) m.push(moment(n).format("ww"))
  weekNumbers.value = m.filter((v, i) => m.indexOf(v) === i)
  while (weekNumbers.value.length > 6) weekNumbers.value.pop()
}

function toggleActiveDate(date: string) {
  activeDate.value = activeDate.value === date ? "" : date
}

onBeforeMount(() => {
  paginate()
})
</script>

<template>
  <div class="flex mt-1">
    <div v-if="hasWeekNumbers">
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
      <div class="flex grid-cols-3 w-56 justify-between select-none">
        <div class="text-gray-400 text-sm grid content-center cursor-pointer" @click="paginate(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="font-[650] text-sm">
          {{moment(month).format('MMMM')}}
          <span v-if="hasYear">
            {{moment(month).format('YYYY')}}
          </span>
        </div>
        <div class="text-gray-400 text-sm grid content-center cursor-pointer" @click="paginate(1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
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
        id="event-button"
        v-if="hasEventButton"
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
        {{eventButtonName}}
      </div>
    </div>
  </div>
</template>
