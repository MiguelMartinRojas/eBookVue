<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ExecutableCard title="Exercise title" subTitle="exercise subTitle" />
  </div>
</template>
<script>
// @ is an alias to /src
import ExecutableCard from "@/components/executable-card.vue";

export default {
  name: "home",
  components: {
     ExecutableCard,
  }
};
</script>
