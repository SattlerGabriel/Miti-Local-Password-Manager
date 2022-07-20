<template>
  <div id="mainContainer">
    <AccountList v-if="chosenMenu == 1"></AccountList>
    <NoteList v-if="chosenMenu == 2"></NoteList>
    <AboutUs v-if="chosenMenu == 3"></AboutUs>
  </div>
</template>

<script>
import AccountList from "./account-list.vue";
import AboutUs from "./aboutUs.vue";
import NoteList from "./note-list.vue";

export default {
  name: "mainContainer",
  components: {
    AccountList,
    AboutUs,
    NoteList,
  },
  props: {
    chosenMenu: Number,
  },
};
</script>

<style>
#mainContainer {
  display: inline-block;
}

h1 {
  margin: 0;
}
</style>
