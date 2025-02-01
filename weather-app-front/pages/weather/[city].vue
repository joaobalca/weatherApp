<template>
    <div class="p-10">
        <WeatherViewer :weather="weatherStore.weather" :error="error" :isLoading="isLoading" :isSaved="isSaved"/>
        <TodaysWeatherHourly :weatherDetails="weatherStore.weatherDetails" :error="error" :isLoadingWeatherDetails="isLoadingWeatherDetails"/>
        <NextThreeDays :weatherDetails="weatherStore.weatherDetails" :error="error" :isLoadingWeatherDetails="isLoadingWeatherDetails"/>
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
const isLoadingWeatherDetails = ref(false);

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
        // Fetch weather details only after weather data is loaded
        await fetchCityWeatherDetails();
    } catch (err) {
      console.log(err.response, "aqui")
        error.value = err.response?._data?.message || 'Failed to fetch weather data.';
    } finally {
        isLoading.value = false;
    }
};

const fetchCityWeatherDetails = async () => {
  try {
    error.value = '';
    isLoadingWeatherDetails.value = true;
    await weatherStore.fetchWeatherDetails(weatherStore.weather.coord.lat, weatherStore.weather.coord.lon);
  } catch (err) {
    console.log(err.response._data.message, "aqui")
    error.value = err.response?._data?.message || 'Failed to fetch weather details data.';
  } finally {
    isLoadingWeatherDetails.value = false;
  }
};

// Fetch weather when the page loads
fetchCityWeather();
</script>