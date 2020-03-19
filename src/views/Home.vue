<template>
  <div class="home">
    <div class="navigation bar"></div>
    <ExecutableCard :task="getTask()" :id="1" @back="back()" @next="next()" />
    <city></city>
  </div>
</template>
<script>
// @ is an alias to /src
import ExecutableCard from "@/components/executable-card.vue";
import City from "@/components/city.vue";
const task1 = require("../assets/tasks/task1.json");
const task2 = require("../assets/tasks/task2.json");
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
          return task1;
        case 2:
          return task2;
        default:
          return task1;
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