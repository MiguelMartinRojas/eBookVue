<template>
  <div class="home">
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
