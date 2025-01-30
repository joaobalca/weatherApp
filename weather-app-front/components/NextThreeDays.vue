<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold text-white mb-4">Next 3 Days</h2>
    <div v-if="isLoadingWeatherDetails" class="flex justify-center items-center h-32">
      <Spinner />
    </div>
    <div v-else-if="!isLoadingWeatherDetails && nextDaysWeather.length">
      <div
        v-for="(day, index) in nextDaysWeather"
        :key="index"
        class="mb-4 bg-blue-800 text-white rounded-lg shadow-md p-4"
      >
        <!-- Day Overview -->
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between cursor-pointer"
          @click="toggleDay(index)"
        >
          <!-- Day and Weather -->
          <div class="flex items-center gap-4">
            <div>
              <h3 class="text-lg font-semibold">
                {{ new Date(day.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) }}
              </h3>
              <p class="text-sm">{{ day.weather }}</p>
            </div>
            <img
              :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
              :alt="day.weather"
              class="w-12 h-12"
            />
          </div>

          <!-- Weather Details -->
          <div class="mt-2 lg:mt-0 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-center">
            <div>
              <p class="font-bold">{{ day.minTemp.toFixed(1) }}°</p>
              <p class="text-gray-300">Low</p>
            </div>
            <div>
              <p class="font-bold">{{ day.maxTemp.toFixed(1) }}°</p>
              <p class="text-gray-300">High</p>
            </div>
            <div>
              <p class="font-bold">{{ day.rain }}%</p>
              <p class="text-gray-300">Rain</p>
            </div>
            <div>
              <p class="font-bold">{{ day.wind.toFixed(1) }} mph</p>
              <p class="text-gray-300">Wind</p>
            </div>
          </div>

          <!-- Dropdown Arrow -->
          <div class="ml-4 lg:ml-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform transition-transform duration-300"
              :class="{ 'rotate-180': openDays[index] }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <!-- Hourly Weather (Collapsible) -->
        <div v-if="openDays[index]" class="mt-4">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div
              v-for="(hour, hourIndex) in day.hours"
              :key="hourIndex"
              class="flex flex-col items-center bg-blue-700 rounded-lg p-2"
            >
              <p class="text-sm text-gray-200">
                {{ new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </p>
              <img
                :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
                :alt="hour.weather[0].description"
                class="w-8 h-8"
              />
              <p class="text-lg font-bold text-white">
                {{ (hour.main.temp - 273.15).toFixed(1) }}°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback message -->
    <div v-else-if="!isLoadingWeatherDetails && error" class="text-white text-center">
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Spinner from '@/components/Spinner.vue';

const props = defineProps({
  weatherDetails: Object,
  isLoadingWeatherDetails: Boolean,
  error: String,
});

// Process and group weather data for the next 3 days
const nextDaysWeather = computed(() => {
  if (!props.weatherDetails || !props.weatherDetails.list) return [];

  const currentDate = new Date();
  const days = {};

  for (let i = 1; i <= 3; i++) {
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + i);
    const dayKey = futureDate.toISOString().split('T')[0];
    days[dayKey] = {
      date: futureDate,
      hours: [],
      minTemp: Infinity,
      maxTemp: -Infinity,
      rain: 0,
      wind: 0,
      weather: '',
      icon: '',
    };
  }

  props.weatherDetails.list.forEach((hour) => {
    const dayKey = hour.dt_txt.split(' ')[0];
    if (days[dayKey]) {
      days[dayKey].hours.push(hour);
      days[dayKey].minTemp = Math.min(days[dayKey].minTemp, hour.main.temp - 273.15);
      days[dayKey].maxTemp = Math.max(days[dayKey].maxTemp, hour.main.temp - 273.15);
      days[dayKey].rain = Math.max(days[dayKey].rain, hour.pop * 100);
      days[dayKey].wind = Math.max(days[dayKey].wind, hour.wind.speed);
      if (!days[dayKey].weather && hour.weather.length) {
        days[dayKey].weather = hour.weather[0].description;
        days[dayKey].icon = hour.weather[0].icon;
      }
    }
  });

  return Object.values(days);
});

// Track which days are expanded
const openDays = ref([]);

const toggleDay = (index) => {
  openDays.value[index] = !openDays.value[index];
};
</script>

<style>
/* Ensure dropdown arrow rotates */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
