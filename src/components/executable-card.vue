<template>
  <div class ="card">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{task.title}}</div>
        <div class="md-subhead">{{task.subTitle}}</div>
      </md-card-header>
      <md-card-content>
        <text-area
          :contentHtml="task.contentHtml"
          :contentJavacript="task.contentJavascript"
          :contentCss="task.contentCss"
        ></text-area>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-accent" v-on:click="runScript">Ejecutar</md-button>
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
    task: {
    },
  },
  methods: {
    runScript() {
      eventHub.$emit("execute-code-1");
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
.card{
  width: 100%;
}
</style>
