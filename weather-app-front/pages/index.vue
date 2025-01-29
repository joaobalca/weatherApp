<template>
  <div class="container-fluid p-30">
    <SearchForm />
    <CityList :cities="weatherStore.savedCities" />
  </div>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue';
import CityList from '@/components/CityList.vue';
import { onMounted } from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';

const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.fetchSavedCities();
});

</script>
