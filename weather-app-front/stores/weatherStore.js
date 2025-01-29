import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weather: null,
    savedCities: [],
    error: '',
    isLoading: false,
  }),

  actions: {
    async fetchWeather(city) {
      try {
        this.error = '';
        const response = await $fetch(`/weather?city=${city}`, {
          baseURL: useRuntimeConfig().public.apiBase,
        });
        this.weather = response;
      } catch (error) {
        throw error;
      }
    },

    async saveCity(city) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID is missing.');
      }

      try {
        await axios.post(`${useRuntimeConfig().public.apiBase}/cities`, {
          name: city,
          userId,
        });
      } catch (error) {
        throw error;
      }
    },

    async fetchSavedCities() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        this.error = 'User ID is missing.';
        return;
      }
      this.isLoading = true; 
      try {
        const response = await axios.get(`${useRuntimeConfig().public.apiBase}/cities`, {
          params: { userId },
        });
        this.savedCities = response.data;
      } catch (error) {
        throw error;
      }finally {
        this.isLoading = false;
      }
    },
  },
});
