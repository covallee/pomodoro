<template>
  <Pomodoro />
</template>

<script>
import Pomodoro from "./components/Pomodoro.vue";

export default {
  name: "App",
  components: {
    Pomodoro,
  },
};
</script>

<style lang="scss">
:root {
  --background: #16161a;
  --headline: #fffffe;
  --button: #7f5af0;
  --tertiary: #2cb67d;
}

body {
  background-color: var(--background);
}

* {
  box-sizing: border-box;
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
