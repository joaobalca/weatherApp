<template>
  <div class="mt-8">
    <h2 class="text-lg font-bold">Saved Cities</h2>
    <ul>
      <li v-for="city in cities" :key="city.name" class="flex justify-between items-center mt-2">
        <span>{{ city.name }}</span>
        <button @click="$emit('deleteCity', city.name)" class="text-red-500">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  cities: Array,
});

defineEmits(['deleteCity']);
</script>
