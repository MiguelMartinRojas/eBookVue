<template>
  <div class="card">
    <md-card md-with-hover>
      <md-card-header v-bind:class="{ 'border-red': this.task.zone ==='red', 'border-green': this.task.zone ==='green', 'border-blue': this.task.zone ==='blue', 'border-yellow': this.task.zone ==='yellow' }">
        <div v-if="!edition" class="md-title">{{task.title}}</div>
        <form v-else autocomplete="off">
          <md-field>
            <label>Titulo ejercicio</label>
            <md-input v-model="task.title"></md-input>
          </md-field>
        </form>
        <div v-if="!edition" class="md-subhead subtitle">{{task.subTitle}}</div>
        <form v-else autocomplete="off">
          <md-field>
            <label>Enunciado del ejercicio</label>
            <md-textarea v-model="task.subTitle"></md-textarea>
          </md-field>
        </form>
      </md-card-header>
      <md-card-content>
        <text-area :task="task" :solution="solution" :edition="edition" :id="id"></text-area>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-fab md-primary" v-if="!edition" v-on:click="back">
          <md-icon>arrow_back</md-icon>
        </md-button>
        <md-button class="md-fab md-accent" v-on:click="runScript">
          <md-icon>play_arrow</md-icon>
        </md-button>
        <md-button class="md-fab md-primary" v-if="!edition" v-on:click="next">
          <md-icon>arrow_forward</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import TextArea from "@/components/text-area.vue";
import { eventHub } from "@/components/eventHub";

export default {
  components: { TextArea },
  props: {
    task: {},
    solution: {},
    edition: {
      type: Boolean
    },
    id: {}
  },
  methods: {
    runScript() {
      eventHub.$emit("execute-code-" + this.id);
    },
    back() {
      this.$emit("back");
    },
    next() {
      this.$emit("next");
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 90%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.card {
  width: 100%;
}
.md-subhead.subtitle {
  text-align: left;
  white-space: pre-line;
  margin-left: 40px;
}
.border-red{
  border: 2px red solid;
}
.border-green{
  border: 2px green solid;
}
.border-yellow{
  border: 2px yellow solid;
}
.border-blue{
  border: 2px blue solid;
}
</style>
