<template>
  <div v-if="isLoading" class="flex justify-center items-center h-full">
    <Spinner />
  </div>
  <div
    v-else-if="!isLoading && weather"
    class="p-6 bg-gradient-to-b from-[#2832af] to-[#1578c8] rounded-lg text-white"
  >
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <div class="text-center md:text-left">
        <h2 class="text-3xl font-bold">{{ weather.name }}, {{ weather.sys.country }}</h2>
        <p class="text-lg">
          {{
            new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              timeZone: 'Europe/Lisbon'
            }).format(new Date())
          }}        
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <button
          @click="saveCity"
          :disabled="isSaved"
          class="mt-4 md:mt-0 px-4 py-2 text-sm font-semibold rounded-full"
          :class="isSaved ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-black'"
        >
          {{ isSaved ? 'Saved' : 'Save Location' }}
        </button>
        <span v-if="saveError" class="text-red-500 mt-2">{{ saveError }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <!-- Icon and Temperature -->
      <div class="flex flex-col items-center justify-center">
        <img
          :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
          alt="Weather Icon"
          class="w-28 h-28"
        />
        <p class="text-lg capitalize">{{ weather.weather[0].description }}</p>
      </div>
      <div class="text-7xl font-bold flex flex-col items-center">
        {{ Math.round(weather.main.temp) }}°C
      </div>

      <div class="grid grid-cols-3 gap-4 text-center md:gap-2">
        <div>
          <p class="text-xl font-bold">{{ Math.round(weather.main.temp_max) }}°</p>
          <p class="text-sm">High</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ Math.round(weather.wind.speed) }} mph</p>
          <p class="text-sm">Wind</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ weather.main.humidity }}%</p>
          <p class="text-sm">Humidity</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ Math.round(weather.main.temp_min) }}°</p>
          <p class="text-sm">Low</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ weather.main.pressure }} in</p>
          <p class="text-sm">Pressure</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ weather.clouds.all }}%</p>
          <p class="text-sm">Cloudiness</p>
        </div>
      </div>
    </div>
  </div>

  <p v-if="!weather && error" class="text-red-500 mt-4 text-center">{{ error }}</p>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';
import { useWeatherStore } from '@/stores/weatherStore';

const weatherStore = useWeatherStore();

const saveError = ref('');

const saveCity = async () => {
  try {
    saveError.value = ''; 
    const isAlreadySaved = weatherStore.savedCities.some(
      (savedCity) => savedCity.name.toLowerCase() === weatherStore.weather.name.toLowerCase()
    );
    if (isAlreadySaved) {
      isSaved.value = true;
      saveError.value = ''; 
      return;
    }

    await weatherStore.saveCity(weatherStore.weather.name);

    isSaved.value = true;
    saveError.value = '';
  } catch (err) {
    saveError.value = err.response?.data?.message;
  }
};

defineProps({
  weather: Object,
  error: String,
  isLoading: Boolean,
  isSaved: Boolean,
});
</script>