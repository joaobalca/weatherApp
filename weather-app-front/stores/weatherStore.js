import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weather: null,
    weatherDetails: null,
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
    async fetchWeatherDetails(lat, lon) {
      try {
        this.error = '';
        const response = await $fetch(`/weatherDetails?lat=${lat}&lon=${lon}`, {
          baseURL: useRuntimeConfig().public.apiBase,
        });
        this.weatherDetails = response;
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
    
        // Refresh saved cities after saving
        await this.fetchSavedCities();
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

    async deleteCity(cityName) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        this.error = 'User ID is missing.';
        return;
      }

      try {
        await axios.delete(`${useRuntimeConfig().public.apiBase}/cities`, {
          data: { name: cityName, userId },
        });
        this.savedCities = this.savedCities.filter(city => city.name.toLowerCase() !== cityName.toLowerCase());
      } catch (error) {
        throw error.response?.data?.message || 'Failed to delete city.';
      }
    }

  },
});
