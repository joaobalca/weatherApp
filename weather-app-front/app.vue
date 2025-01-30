<template>
  <div class="bg-gradient min-h-screen">
    <header class="p-4 text-white text-center">
      <a href="/"><h1 class="text-2xl font-bold">Weather App</h1></a>
      <p class="text-lg text-gray-300">Check the weather in your favorite city</p>
    </header>
    <NuxtPage/>
  </div>
</template>
<style>
html,
body {
  height: 100%;
  margin: 0;
}
.bg-gradient {
  background: linear-gradient(to bottom, #2832af, #1578c8);
}
.min-h-screen {
  min-height: 100vh;
}
</style>