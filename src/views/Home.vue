<template>
  <div class="home">
    <ExecutableCard :task="task1" />
    <city></city>
  </div>
</template>
<script>
// @ is an alias to /src
import ExecutableCard from "@/components/executable-card.vue";
import City from "@/components/city.vue";
const task1 = require("../assets/tasks/task1.json");

export default {
  name: "home",
  components: {
    ExecutableCard,
    City
  },
  data() {
    return {
      task1
    };
  },
  async created() {}
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
}
</style>