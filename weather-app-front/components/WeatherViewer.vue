<template>
  <div v-if="weather" class="mt-8 bg-white p-4 rounded shadow">
    <h2 class="text-xl font-bold">{{ weather.name }}</h2>
    <p>Weather: {{ weather.weather[0].main }}</p>
    <p>Current Temperature: {{ weather.main.temp }}°C</p>
    <p>hight: {{ weather.main.temp_max }}°C</p>
    <p>low: {{ weather.main.temp_min }}°C</p>
    <p>Weather: {{ weather.weather[0].description }}</p>
    <p>wind: {{ weather.wind.speed }} mph</p>
    <p>pressure: {{ weather.main.pressure }} in</p>
    <p>humidity: {{ weather.main.humidity }} %</p>
  </div>
  <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  weather: Object,
  error: String,
});
</script>
