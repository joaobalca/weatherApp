<template>
  <form @submit.prevent="handleSearch" class="flex gap-4">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Enter city name"
      class="p-2 border rounded flex-1"
    />
    <button type="submit" class="p-2 bg-blue-500 text-white rounded">Search</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['search']);
const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>
