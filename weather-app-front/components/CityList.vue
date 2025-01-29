<template>
  <div class="mt-8">
    <div class="flex justify-center">
      <h2 class="text-lg font-bold text-white">Saved Cities</h2>
    </div>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else>
      <p class="text-white" v-if="weatherStore.savedCities.length === 0">
        No cities to display
      </p>
      <ul v-else class="flex justify-center items-start flex-row gap-4 flex-wrap">
        <li
          v-for="(city, index) in weatherStore.savedCities"
          :key="index"
          class="relative bg-white p-4 rounded shadow-lg group w-60 h-20 flex items-center justify-center transition hover:bg-gray-100"
        >
          <span class="text-black font-bold group-hover:opacity-0 transition">
            {{ city.name.toUpperCase() }}
          </span>
          <div class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-4 bg-black/60 opacity-0 group-hover:opacity-100 rounded transition">
            <router-link :to="`/weather/${city.name}`" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              View Weather
            </router-link>
            <button @click="handleDelete(city.name)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore';
import Spinner from '@/components/Spinner.vue';
import { computed } from 'vue';

const weatherStore = useWeatherStore();
const isLoading = computed(() => weatherStore.isLoading);

const handleDelete = async (cityName) => {
  try {
    await weatherStore.deleteCity(cityName);
  } catch (err) {
    alert(err);
  }
};
</script>
