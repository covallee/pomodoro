<template>
  <div class="list">
    <div class="item" v-for="(pom, index) in listOfPomodoro" :key="index">
      <div>{{ pom.startTime }}</div>
      <div class="type">{{ pom.type }}</div>
      <div class="position">{{ pom.position }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    listOfPomodoro() {
      return this.$store.state.pomodoros;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item {
  display: flex;
  padding: 8px;
  gap: 24px;
}
.type {
  text-transform: capitalize;
}

.position {
  text-transform: capitalize;
}
</style>
