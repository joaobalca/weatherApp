<template>
  <form @submit.prevent="handleSearch" class="flex gap-4">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Enter city name"
      class="p-2 border border-white text-white rounded flex-1"
    />
    <button 
      type="submit" 
      class="p-2 bg-blue-500 text-white rounded" 
      :class="searchQuery ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'"
      :disabled="!searchQuery"
    >
      Search
    </button>
  </form>
  <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/stores/weatherStore';

const router = useRouter();
const searchQuery = ref('');
const error = ref('');
const weatherStore = useWeatherStore();

const handleSearch = async () => {
  error.value = '';
  try {
    await weatherStore.fetchWeather(searchQuery.value);
    if (weatherStore.weather) {
      router.push(`/weather/${searchQuery.value}`);
    }
  } catch (err) {
      error.value = err.response?._data?.message;
    }
};

</script>
