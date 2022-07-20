<template>
  <navBar></navBar>
  <mainContainer :chosenMenu="menuOpen"></mainContainer>
</template>

<script>
import MainContainer from "./components/mainContainer.vue";
import NavBar from "./components/navBar.vue";
import { Initialize } from "./db.js";

export default {
  name: "App",
  components: {
    MainContainer,
    NavBar,
  },
  data() {
    return {
      menuOpen: 1,
    };
  },
  mounted() {
    this.Initialize();
  },
  methods: {
    Initialize,
  },
};
</script>

<style>
#app {
  color: white;
  margin: 0;

  display: grid;
  grid-template-columns: 25vw 75vw;
  grid-template-rows: 1;

  transition: 0.5s;
}
</style>
