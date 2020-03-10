<template>
  <div class="edit">
    <div class="container">
      <div class="menu">
        <div class="menu-container">
          <div style="display:flex; justify-content: space-between;">
            <md-field>
              <label>Select exercise file</label>
              <md-file v-model="taskFile" @md-change="openExerciseFile" />
            </md-field>
            <md-field>
              <label>Titulo ejercicio</label>
              <md-input v-model="taskFile"></md-input>
            </md-field>
            <md-button class="md-fab" v-on:click="save(0)">
              <md-icon>save</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <ExecutableCard :task="task" v-if="task" :edition="true" :id="1" />
    </div>
    <div class="container">
      <div class="menu">
        <div class="menu-container">
          <div style="display:flex; justify-content: space-between;">
            <md-field>
              <label>Select solution file</label>
              <md-file v-model="taskSolutionFile" @md-change="openSolutionFile" />
            </md-field>
            <md-field>
              <label>Titulo ejercicio</label>
              <md-input v-model="taskSolutionFile"></md-input>
            </md-field>
            <md-button class="md-fab" v-on:click="save(1)">
              <md-icon>save</md-icon>
            </md-button>
          </div>
        </div>
      </div>
      <ExecutableCard :task="taskSolution" v-if="taskSolution" :edition="true" :id="2" />
    </div>
  </div>
</template>

<script lang ="ts">
import ExecutableCard from "@/components/executable-card.vue";
var FileSaver = require("file-saver");
var fileTemplate = {
  title: "Ejercicio titulo",
  subTitle: "Subtitulo del ejercicio",
  contentJavascript: "//Javascript \n",
  contentHtml: "<!-- Html --> \n<!DOCTYPE html> \n ",
  contentCss: "/*Css*/ \n"
};

export default {
  components: {
    ExecutableCard
  },
  data() {
    return {
      task: fileTemplate,
      taskSolution: fileTemplate,
      taskFile: null,
      taskSolutionFile: null
    };
  },
  methods: {
    async test() {
      await this.a();
    },

    async openExerciseFile(event) {
      // eslint-disable-next-line no-debugger
      this.taskFile = event[0];
      this.task = JSON.parse(await event[0].text());
    },
    async openSolutionFile(event) {
      this.taskSolutionFile = event[0];
      this.taskSolution = JSON.parse(await event[0].text());
    },

    save(type: Number) {
      var blob = new Blob(
        [
          type === 0
            ? JSON.stringify(this.task)
            : JSON.stringify(this.taskSolution)
        ],
        {
          type: "text/plain;charset=utf-8"
        }
      );

      var fileName = type === 0 ? this.taskFile : this.taskSolutionFile;

      FileSaver.saveAs(blob, fileName);
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
.container {
  display: flex;
  flex-direction: column;
}
.menu-container {
  display: inline-block;
  width: 90%;
  > div {
    > .md-field {
      margin-right: 10px;
    }
    > button {
      min-width: 60px;
    }
  }
}
</style>