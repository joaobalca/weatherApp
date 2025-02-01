<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold text-white mb-4">{{ weatherTitle }}</h2>
    <div v-if="isLoadingWeatherDetails" class="flex justify-center items-center h-32">
      <Spinner />
    </div>
    <div
      v-else-if="!isLoadingWeatherDetails && currentDayWeather.length"
      class="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-4 lg:grid-cols-6"
    >
      <div
        v-for="(hour, index) in currentDayWeather"
        :key="index"
        class="flex flex-col items-center justify-center bg-blue-800 rounded-lg p-4 min-w-[100px] sm:min-w-0"
      >
        <p class="text-sm text-gray-200 font-medium">
          {{ new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
        </p>
        <img
          :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
          :alt="hour.weather[0].description"
          class="w-12 h-12"
        />
        <p class="text-lg font-bold text-white">
          {{ (hour.main.temp - 273.15).toFixed(1) }}°C
        </p>
      </div>
    </div>
    <div v-else-if="!isLoadingWeatherDetails && error" class="text-center">
      <p class="text-white">{{error}}</p>
    </div>
  </div>
  </template>
  
<script setup>
  import { computed } from 'vue';
  import Spinner from '@/components/Spinner.vue';

  const props = defineProps({
    weatherDetails: Object,
    isLoadingWeatherDetails: Boolean,
    error: String,
  });

  const currentDayWeather = computed(() => {
    if (!props.weatherDetails || !props.weatherDetails.list) {
    return [];
    }
    const today = new Date().toISOString().split('T')[0];
    const todayWeather = props.weatherDetails.list.filter(hour => 
      hour.dt_txt.startsWith(today)
    );
    if (todayWeather.length) {
      return todayWeather;
    }
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    return props.weatherDetails.list.filter(hour => 
      hour.dt_txt.startsWith(tomorrow)
    );
  });

  const weatherTitle = computed(() => {
    if (!props.weatherDetails || !props.weatherDetails.list) {
      return "Today's Weather";
    }
    const today = new Date().toISOString().split('T')[0];
    const todayWeather = props.weatherDetails.list.filter(hour => 
      hour.dt_txt.startsWith(today)
    );
    return todayWeather.length ? "Today's Weather" : "Tomorrow's Weather";
  });
</script>