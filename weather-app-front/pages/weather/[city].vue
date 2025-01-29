<template>
    <div class="p-10">
        <WeatherViewer :weather="weatherStore.weather" :error="weatherStore.error" :isLoading="isLoading" :isSaved="isSaved"/>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/stores/weatherStore';

const weatherStore = useWeatherStore();
const route = useRoute();

const error = ref('');
const isLoading = ref(false);

const isSaved = computed(() =>
  weatherStore.savedCities.some(
    (savedCity) => savedCity.name.toLowerCase() === weatherStore.weather?.name.toLowerCase()
  )
);

const fetchCityWeather = async () => {
  try {
    error.value = '';
    isLoading.value = true;
    await weatherStore.fetchWeather(route.params.city);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch weather data.';
  } finally {
    isLoading.value = false;
  }
};

// Fetch weather when the page loads
fetchCityWeather();
</script>