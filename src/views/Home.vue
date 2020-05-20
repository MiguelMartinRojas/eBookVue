<template>
  <div class="home">
    <div class="navigation bar"></div>
    <ExecutableCard
      :task="getTask().task"
      :solution="getTask().solution"
      :id="1"
      @back="back()"
      @next="next()"
    />
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
const task3 = require("../assets/tasks/task3.json");
const solution3 = require("../assets/tasks/task3-check.json");
const task4 = require("../assets/tasks/task4.json");
const solution4 = require("../assets/tasks/task4-check.json");
const task5 = require("../assets/tasks/task5.json");
const solution5 = require("../assets/tasks/task5-check.json");
const task6 = require("../assets/tasks/task6.json");
const solution6 = require("../assets/tasks/task6-check.json");
const task7 = require("../assets/tasks/task7.json");
const solution7 = require("../assets/tasks/task7-check.json");
const task8 = require("../assets/tasks/task8.json");
const solution8 = require("../assets/tasks/task8-check.json");
const task9 = require("../assets/tasks/task9.json");
const solution9 = require("../assets/tasks/task9-check.json");
const task10 = require("../assets/tasks/task10.json");
const solution10 = require("../assets/tasks/task10-check.json");

const min = 1;
const max = 10;
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
        case 3:
          return { task: task3, solution: solution3 };
        case 4:
          return { task: task4, solution: solution4 };
        case 5:
          return { task: task5, solution: solution5 };
        case 6:
          return { task: task6, solution: solution6 };
        case 7:
          return { task: task7, solution: solution7 };
        case 8:
          return { task: task8, solution: solution8 };
        case 9:
          return { task: task9, solution: solution9 };
        case 10:
          return { task: task10, solution: solution10 };
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