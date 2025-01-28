<template>
  <div class="container mx-auto p-4">
    <SearchForm @search="fetchWeather" />
    <WeatherViewer :weather="weather" :error="error" />
    <CityList :cities="savedCities" @deleteCity="deleteCity" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchForm from '@/components/SearchForm.vue';
import WeatherViewer from '@/components/WeatherViewer.vue';
import CityList from '@/components/CityList.vue';

const weather = ref(null);
const error = ref('');
const savedCities = ref([]);

const fetchWeather = async (city) => {
  error.value = '';
  weather.value = null;

  try {
    const response = await $fetch(`/weather?city=${city}`, {
      baseURL: useRuntimeConfig().public.apiBase,
    });
    weather.value = response;

    // Add to saved cities if not already there
    if (!savedCities.value.find((savedCity) => savedCity.name === city)) {
      savedCities.value.push({ name: city, ...response });
    }
  } catch (err) {
    error.value = 'Failed to fetch weather. Please try again.';
  }
};

const deleteCity = (cityName) => {
  savedCities.value = savedCities.value.filter((city) => city.name !== cityName);
};
</script>
