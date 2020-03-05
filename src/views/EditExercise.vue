<template>
  <div class="edit">
    <div>
      <input type="file" @change="openExerciseFile" />
      <ExecutableCard :task="task" v-if="task" />
    </div>
    <div>
      <input type="file" @change="openSolutionFile" />
      <ExecutableCard :task="taskSolution" v-if="taskSolution" />
    </div>
  </div>
</template>

<script lang ="ts">
import ExecutableCard from "@/components/executable-card.vue";

export default {
  components: {
    ExecutableCard
  },
  data() {
    return {
      task: null,
      taskSolution: null
    };
  },
  methods: {
    async test() {
      await this.a();
    },

    async openExerciseFile(event) {
      this.task =  JSON.parse(await event.target.files[0].text())
    },
    async openSolutionFile(event) {
      this.taskSolution = JSON.parse(await event.target.files[0].text());
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: row;
  > div {
    width: 100%;
  }
}
</style>