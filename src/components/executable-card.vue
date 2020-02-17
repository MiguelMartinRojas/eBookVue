<template>
  <div>
    <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">{{title}}</div>
          <div class="md-subhead">{{subTitle}}</div>
        </md-card-header>

        <md-card-content>
          <text-area content ="Text area content"></text-area>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-raised md-accent">Run</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TextArea from "@/components/text-area.vue";

@Component({
  components: { TextArea },
  methods: {
    
  }
})
export default class ExecutableCard extends Vue {
  @Prop() private title!: string;
  @Prop() private subTitle!: string;
}
</script>


<style lang="scss" scoped>
.md-card {
  width: 90%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
