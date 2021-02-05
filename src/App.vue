<template>
  <Pomodoro />
</template>

<script>
import Pomodoro from "./components/Pomodoro.vue";

export default {
  name: "App",
  components: {
    Pomodoro
  }
};
</script>

<style lang="scss">
body {
  background-color: #16161a;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fffffe;
  margin-top: 60px;
}
</style>
