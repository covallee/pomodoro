<script setup>
import Pomodoro from './components/Pomodoro.vue'
</script>

<template>
  <Pomodoro />
</template>

<style lang="scss">
:root {
  --background: #16161a;
  --headline: #fffffe;
  --button: #7f5af0;
  --tertiary: #2cb67d;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--background);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--headline);
  margin-top: 60px;
}
</style>
