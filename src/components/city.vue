<template>
  <div>
    <md-button v-on:click="collapseExpand" class="md-raised md-primary">Expand</md-button>
    <div class="fake-background" v-bind:class="{'collapsible-content':collapsed }">
      <div class="city-wrap">
        <div class="city-container">
          <div class="city" v-bind:class="{'collapsible-content':collapsed }">
            <background class="background"></background>
            <park style="top:500px; right:48px;" class="building-4"></park>
            <house1 style="top:146px; right:48px;" class="building"></house1>
            <house12 style="top:114px; right:48px;" class="building"></house12>
            <house13 style="top:135px; right:75px;" class="building"></house13>
            <house2 style="top:48px; right:80px;" class="building-2"></house2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { eventHub } from "@/components/eventHub";
import Park from "@/assets/park.svg";
import House1 from "@/assets/house1.svg";
import House12 from "@/assets/house12.svg";
import House13 from "@/assets/house13.svg";
import House2 from "@/assets/house2.svg";
import Background from "@/assets/background.svg";

export default {
  components: {
    Park,
    Background,
    House1,
    House12,
    House13,
    House2
  },
  data() {
    return {
      collapsed: false
    };
  },
  props: {
    task: {}
  },
  methods: {
    collapseExpand() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss" scoped>
.city-wrap {
  z-index: 99999;
  min-height: 300px;
  position: fixed;
  right: 0px;
  top: -100px;
}
.city-container {
  display: flex;
  flex-direction: column;
}
.city {
  overflow: hidden;
}
.background {
  width: 512px;
  height: 512px;
}
.building {
  position: fixed;
  width: 32px;
  height: 32px;
  z-index: 100;
}
.building-2 {
  position: fixed;
  width: 96px;
  height: 96px;
  z-index: 100;
}
.building-4 {
  position: fixed;
  width: 96px;
  height: 96px;
  z-index: 100;
}
button {
  position: fixed;
  z-index: 9999999;
  right: 0px;
  top: 0px;
}
.collapsible-content {
  max-height: 0px;
  overflow: hidden;
  display: none;
  transition: max-height 0.25s ease-in-out;
}
.fake-background {
  min-width: 512px;
}
</style>

