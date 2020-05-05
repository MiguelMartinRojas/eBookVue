<template>
  <div class="home">
    <div class="navigation bar"></div>
    <ExecutableCard :task="getTask().task" :solution="getTask().solution" :id="1" @back="back()" @next="next()" />
    <city></city>
  </div>
</template>
<script>
// @ is an alias to /src
import ExecutableCard from "@/components/executable-card.vue";
import City from "@/components/city.vue";
const task1 = require("../assets/tasks/task1.json");
const solution1 = require("../assets/tasks/task1-check.json");
const task2 = require("../assets/tasks/task2.json");
const solution2 = require("../assets/tasks/task2-check.json");
const min = 1;
const max = 2;
export default {
  name: "home",
  components: {
    ExecutableCard,
    City
  },
  data() {
    return {
      currentExercise: 1
    };
  },
  methods: {
    getTask() {
      switch (this.currentExercise) {
        case 1:
          return { task: task1, solution: solution1 };
        case 2:
          return { task: task2, solution: solution2 };
        default:
          return { task: task1, solution: solution1 };
      }
    },
    back() {
      this.currentExercise === min
        ? this.currentExercise
        : this.currentExercise--;
    },
    next() {
      this.currentExercise === max
        ? this.currentExercise
        : this.currentExercise++;
    }
  },
  async created() {}
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
}
</style>