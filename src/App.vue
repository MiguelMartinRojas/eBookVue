<template>
<html>
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons"
    />
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/vue-material.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default.css" />
  </head>

  <body>
    <div id="app">
      <div id="nav">
        <div>
          <router-link to="/">Home</router-link>|
          <router-link to="/edit-exercise">Edit Exercise</router-link>
        </div>
      </div>
      <router-view />
    </div>
  </body>
</html>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  > div {
    display: flex;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang ="ts">
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueKonva from "vue-konva";

Vue.use(VueMaterial);
Vue.use(VueKonva);
var game = JSON.parse(localStorage.getItem("game"));
if (!game) {
  localStorage.setItem("game", JSON.stringify([]));
}

export default {};
</script>>
