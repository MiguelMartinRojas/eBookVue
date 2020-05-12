<template>
  <div>
    <md-button v-on:click="collapseExpand" class="md-raised md-primary">Expand</md-button>
    <v-stage
      class="sky-gradient"
      ref="stage"
      :config="configKonva"
      @wheel="handleWheel"
      @click="getRelativePointerPosition"
      v-bind:class="{'collapsible-content':collapsed }"
    >
      <v-layer ref="backgroundlayer"></v-layer>
      <v-layer ref="layer"></v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import { eventHub } from "@/components/eventHub";
import Konva from "konva";

const Broken = "../break.svg";
const House1 = "../house1.svg";
const House12 = "../house12.svg";
const House13 = "../house13.svg";
const House2 = "../house2.svg";
const Background = "../background.svg";

const width = 800;
const height = 500;

export default {
  components: {},
  data() {
    return {
      collapsed: false,
      list: [],
      dragItemId: null,
      image: null,
      configKonva: {
        width: width,
        height: height,
        draggable: true,
        scaleX: 0.75,
        scaleY: 0.75
      },
      pointsSmall: [
        { id: 1111, x: 220, y: -60, zone: "red", unlock: false },
        { id: 1112, x: 0, y: 0, zone: "red", unlock: false },
        { id: 1113, x: 0, y: 0, zone: "red", unlock: false },
        { id: 1114, x: 0, y: 0, zone: "red", unlock: false },
        { id: 2111, x: 0, y: 0, zone: "red", unlock: false },
        { id: 2112, x: 0, y: 0, zone: "red", unlock: false },
        { id: 2113, x: 0, y: 0, zone: "red", unlock: false },
        { id: 2114, x: 0, y: 0, zone: "red", unlock: false },
        { id: 3111, x: 0, y: 0, zone: "red", unlock: false },
        { id: 3112, x: 0, y: 0, zone: "red", unlock: false },
        { id: 3113, x: 0, y: 0, zone: "red", unlock: false },
        { id: 3114, x: 0, y: 0, zone: "red", unlock: false },
        { id: 4111, x: 0, y: 0, zone: "red", unlock: false },
        { id: 4112, x: 0, y: 0, zone: "red", unlock: false },
        { id: 4113, x: 0, y: 0, zone: "red", unlock: false },
        { id: 4114, x: 0, y: 0, zone: "red", unlock: false },
        { id: 5111, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 5112, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 5113, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 5114, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 6111, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 6112, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 6113, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 6114, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 7111, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 7112, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 7113, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 7114, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 8111, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 8112, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 8113, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 8114, x: 0, y: 0, zone: "yellow", unlock: false },

        { id: 9111, x: 665, y: 192, zone: "green", unlock: false },
        { id: 9112, x: 0, y: 0, zone: "green", unlock: false },
        { id: 9113, x: 0, y: 0, zone: "green", unlock: false },
        { id: 9114, x: 0, y: 0, zone: "green", unlock: false },
        { id: 10111, x: 0, y: 0, zone: "green", unlock: false },
        { id: 10112, x: 0, y: 0, zone: "green", unlock: false },
        { id: 10113, x: 0, y: 0, zone: "green", unlock: false },
        { id: 10114, x: 0, y: 0, zone: "green", unlock: false },
        { id: 11111, x: 0, y: 0, zone: "green", unlock: false },
        { id: 11112, x: 0, y: 0, zone: "green", unlock: false },
        { id: 11113, x: 0, y: 0, zone: "green", unlock: false },
        { id: 11114, x: 0, y: 0, zone: "green", unlock: false },
        { id: 12111, x: 0, y: 0, zone: "green", unlock: false },
        { id: 12112, x: 0, y: 0, zone: "green", unlock: false },
        { id: 12113, x: 0, y: 0, zone: "green", unlock: false },
        { id: 12114, x: 0, y: 0, zone: "green", unlock: false },
        { id: 13111, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 13112, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 13113, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 13114, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 14111, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 14112, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 14113, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 14114, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 15111, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 15112, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 15113, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 15114, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 16111, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 16112, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 16113, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 16114, x: 0, y: 0, zone: "blue", unlock: false }
      ],
      pointsBig: [
        //first column
        { id: 17, x: 265, y: -54, zone: "red", unlock: false },
        { id: 18, x: 0, y: 0, zone: "red", unlock: false }, //60,34
        { id: 19, x: 0, y: 0, zone: "red", unlock: false }, //65, 34
        { id: 20, x: 0, y: 0, zone: "red", unlock: false }, // 65, 34
        { id: 21, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 22, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 23, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 24, x: 0, y: 0, zone: "yellow", unlock: false },

        { id: 25, x: 458, y: 52, zone: "green", unlock: false },
        { id: 26, x: 0, y: 0, zone: "green", unlock: false },
        { id: 27, x: 0, y: 0, zone: "green", unlock: false },
        { id: 28, x: 0, y: 0, zone: "green", unlock: false },
        { id: 29, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 30, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 31, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 32, x: 0, y: 0, zone: "blue", unlock: false },
        //second column
        { id: 33, x: 329, y: -18, zone: "red", unlock: false },
        { id: 34, x: 0, y: 0, zone: "red", unlock: false }, //60, unlock: false,34
        { id: 35, x: 0, y: 0, zone: "red", unlock: false }, //65,, unlock: false 34
        { id: 36, x: 0, y: 0, zone: "red", unlock: false }, // 65,, unlock: false 34
        { id: 37, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 38, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 39, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 40, x: 0, y: 0, zone: "yellow", unlock: false },

        { id: 41, x: 510, y: 95, zone: "green", unlock: false },
        { id: 42, x: 0, y: 0, zone: "green", unlock: false },
        { id: 43, x: 0, y: 0, zone: "green", unlock: false },
        { id: 44, x: 0, y: 0, zone: "green", unlock: false },
        { id: 45, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 46, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 47, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 48, x: 0, y: 0, zone: "blue", unlock: false },
        //Third
        { id: 49, x: 390, y: 20, zone: "red", unlock: false },
        { id: 50, x: 0, y: 0, zone: "red", unlock: false }, //60,34
        { id: 51, x: 0, y: 0, zone: "red", unlock: false }, //65, 34
        { id: 52, x: 0, y: 0, zone: "red", unlock: false }, // 65, 34
        { id: 53, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 54, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 55, x: 0, y: 0, zone: "yellow", unlock: false },
        { id: 56, x: 0, y: 0, zone: "yellow", unlock: false },

        { id: 57, x: 575, y: 130, zone: "green", unlock: false },
        { id: 58, x: 0, y: 0, zone: "green", unlock: false },
        { id: 59, x: 0, y: 0, zone: "green", unlock: false },
        { id: 60, x: 0, y: 0, zone: "green", unlock: false },
        { id: 61, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 62, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 63, x: 0, y: 0, zone: "blue", unlock: false },
        { id: 64, x: 0, y: 0, zone: "blue", unlock: false }
      ]
    };
  },
  props: {
    task: {}
  },
  methods: {
    collapseExpand() {
      this.collapsed = !this.collapsed;
    },

    handleWheel(e) {
      var scaleBy = 1.05;
      var stage = this.$refs.stage.getNode();
      e.evt.preventDefault();
      var oldScale = stage.scaleX();
      var pointer = stage.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      };

      var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };
      stage.position(newPos);
      stage.batchDraw();
    },
    addBackground() {
      var me = this;

      this.iconUrl;
      var a = Konva.Image.fromURL(Background, image => {
        me.$refs.backgroundlayer.getNode().add(image);
        image.setAttrs({
          width: 1000,
          height: 1000,
          x: -250,
          y: -250,
          id: "myBackground"
        });
        me.$refs.backgroundlayer.getNode().batchDraw();
      });
      var b = 1;
    },
    getRelativePointerPosition() {
      // get pointer (say mouse or touch) position
      var pos = this.$refs.backgroundlayer
        .getNode()
        .getStage()
        .getPointerPosition();

      // eslint-disable-next-line no-console
      console.log(pos);
    },
    drawSmallHouse(name, x, y, id) {
      var me = this;
      var a = Konva.Image.fromURL(name, image => {
        me.$refs.layer.getNode().add(image);
        image.setAttrs({
          width: 32,
          height: 32,
          x: x,
          y: y,
          id: id + ""
        });
      });
    },
    drawMediumHouse(name, x, y, id) {
      var me = this;
      Konva.Image.fromURL(name, image => {
        me.$refs.layer.getNode().add(image);
        image.setAttrs({
          width: 64,
          height: 64,
          x: x,
          y: y,
          id: id + ""
        });
      });
    },
    drawBigHouse(name, x, y, id) {
      var me = this;
      Konva.Image.fromURL(name, image => {
        me.$refs.layer.getNode().add(image);
        image.setAttrs({
          width: 96,
          height: 96,
          x: x,
          y: y,
          id: id + ""
        });
      });
    },
    unlockBuilding(score, area, title) {
      var game = JSON.parse(localStorage.getItem("game"));
      var task = game.find(element => element.title == title);
      if (score == 0) {
        this.unlockBrokenBuilding(area, task);
      } else if (score <= 50) {
        this.unlockSmallBuilding(area, task);
      } else if (score <= 75) {
        this.unlockMediumBuilding(area, task);
      } else {
        this.unlockBigBuilding(area, task);
      }
    },
    unlockBrokenBuilding(area, task) {
      if (
        !task.building ||
        (task.building.type !== 1 && task.building.type !== 1)
      ) {
        var building = this.pointsSmall[
          Math.floor(Math.random() * this.pointsSmall.length)
        ];
        this.destroyBuilding(task.building.id);
        task.building = {
          id: building.id,
          name: Broken,
          type: 1,
          zone: building.zone
        };
        this.insertOrReplaceTask(task);
        this.drawBuilding(task.building);
      }
    },
    unlockSmallBuilding(area, task) {
      if (
        !task.building ||
        (task.building.type !== 2 && task.building.type !== 2)
      ) {
        var building = this.pointsSmall[
          Math.floor(Math.random() * this.pointsSmall.length)
        ];
        this.destroyBuilding(task.building.id);
        task.building = {
          id: building.id,
          name: House12,
          type: 2,
          zone: building.zone
        };
        this.insertOrReplaceTask(task);
        this.drawBuilding(task.building);
      }
    },
    unlockMediumBuilding(area, task) {
      if (
        !task.building ||
        (task.building.type !== 3 && task.building.type !== 3)
      ) {
        var building = this.pointsBig[
          Math.floor(Math.random() * this.pointsBig.length)
        ];
        this.destroyBuilding(task.building.id);
        task.building = {
          id: building.id,
          name: House13,
          type: 3,
          zone: building.zone
        };
        this.insertOrReplaceTask(task);
        this.drawBuilding(task.building);
      }
    },
    unlockBigBuilding(area, task) {
      if (
        !task.building ||
        (task.building.type !== 4 && task.building.type !== 4)
      ) {
        var building = this.pointsBig[
          Math.floor(Math.random() * this.pointsBig.length)
        ];
        this.destroyBuilding(task.building.id);
        task.building = {
          id: building.id,
          name: House2,
          type: 4,
          zone: building.zone
        };
        this.insertOrReplaceTask(task);
        this.drawBuilding(task.building);
      }
    },
    insertOrReplaceTask(task) {
      var game = JSON.parse(localStorage.getItem("game"));
      var index = game.findIndex(element => element.title == task.title);
      if (index !== -1) {
        game[index] = task;
      } else {
        game.push(task);
      }
      localStorage.setItem("game", JSON.stringify(game));
      eventHub.$emit("game-changed");
    },
    drawBuilding(building) {
      if (!building) return false;
      this.drawSmallBuilding(building);
      this.drawBigBuilding(building);

      var me = this;
      setTimeout(function() {
        me.$refs.stage.getNode().batchDraw();
      }, 500);
    },
    drawSmallBuilding(building) {
      var index = this.pointsSmall.findIndex(
        element => element.id == building.id
      );
      if (index === -1) return true;
      this.pointsSmall[index].unlock = true;

      var division = Math.floor(index / 4);
      var module = index % 4;

      var group = 0;
      var indexGroup = index;
      if (building.id > 8111) {
        group = 32;
      }
      if (module === 0) {
        this.drawSmallHouse(
          building.name,
          this.pointsSmall[group].x - 60 * (division - group / 4),
          this.pointsSmall[group].y + 35 * (division - group / 4),
          building.id
        );
      } else if (module === 1) {
        this.drawSmallHouse(
          building.name,
          this.pointsSmall[group].x - 25 - 60 * (division - group / 4),
          this.pointsSmall[group].y + 11 + 35 * (division - group / 4),
          building.id
        );
      } else if (module === 2) {
        this.drawSmallHouse(
          building.name,
          this.pointsSmall[group].x + 30 - 60 * (division - group / 4),
          this.pointsSmall[group].y + 11 + 35 * (division - group / 4),
          building.id
        );
      } else if (module === 3) {
        this.drawSmallHouse(
          building.name,
          this.pointsSmall[group].x - 60 * (division - group / 4),
          this.pointsSmall[group].y + 25 + 35 * (division - group / 4),
          building.id
        );
      }
    },
    drawBigBuilding(building) {
      var index = this.pointsBig.findIndex(
        element => element.id == building.id
      );
      if (index === -1) return true;
      this.pointsBig[index].unlock = true;

      var group = 0;
      var indexGroup = index;
      var xOffset = 0;
      var yOffset = 0;
      if (building.id > 24 && building.id <= 32) {
        group = 8;
      } else if (building.id > 32 && building.id <= 40) {
        group = 16;
      } else if (building.id > 40 && building.id <= 48) {
        group = 24;
      } else if (building.id > 48 && building.id <= 56) {
        group = 32;
      } else if (building.id > 56) {
        group = 40;
      }

      if (building.zone == "blue" || building.zone == "yellow") {
        xOffset = -15;
        yOffset = 15;
      }
      if (building.type === 4) {
        this.drawBigHouse(
          building.name,
          this.pointsBig[group].x + xOffset - 60 * (index - group),
          this.pointsBig[group].y + yOffset + 34 * (index - group),
          building.id
        );
      } else if (building.type === 3) {
        this.drawMediumHouse(
          building.name,
          this.pointsBig[group].x + xOffset - 60 * (index - group),
          this.pointsBig[group].y + yOffset + 34 * (index - group),
          building.id
        );
      }
    },
    destroyBuilding(id) {
      this.$refs.stage
        .getNode()
        .find("#" + id)[0]
        .destroy();
      this.$refs.stage.getNode().batchDraw();
    }
  },
  created() {
    eventHub.$on("unlock-building", information =>
      this.unlockBuilding(
        information.score,
        information.area,
        information.title
      )
    );
  },
  beforeDestroy() {
    eventHub.$off("unlock-building", this.unlockBuilding);
  },

  mounted() {
    var me = this;
    this.addBackground();
    var game = JSON.parse(localStorage.getItem("game"));
    game.forEach(element => {
      this.drawBuilding(element.building);
    });
    this.$refs.stage.getNode().position({ x: 210, y: 80 });
  }
};
</script>

<style lang="scss" scoped>
.sky-gradient {
  background: rgba(179, 220, 237, 1);
  background: -moz-linear-gradient(
    left,
    rgba(179, 220, 237, 1) 0%,
    rgba(41, 184, 229, 1) 50%,
    rgba(188, 224, 238, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(179, 220, 237, 1)),
    color-stop(50%, rgba(41, 184, 229, 1)),
    color-stop(100%, rgba(188, 224, 238, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(179, 220, 237, 1) 0%,
    rgba(41, 184, 229, 1) 50%,
    rgba(188, 224, 238, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(179, 220, 237, 1) 0%,
    rgba(41, 184, 229, 1) 50%,
    rgba(188, 224, 238, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(179, 220, 237, 1) 0%,
    rgba(41, 184, 229, 1) 50%,
    rgba(188, 224, 238, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(179, 220, 237, 1) 0%,
    rgba(41, 184, 229, 1) 50%,
    rgba(188, 224, 238, 1) 100%
  );
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

me.$refs.stage.getNode().batchDraw();