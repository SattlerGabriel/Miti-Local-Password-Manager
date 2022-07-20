<template>
  <div id="navContainer">
    <button
      :class="{ selected: this.$parent.menuOpen === 1 }"
      class="navButton"
      @click="toggleAccounts()"
    >
      Accounts
    </button>
    <button
      :class="{ selected: this.$parent.menuOpen === 2 }"
      class="navButton"
      @click="toggleNotes()"
    >
      Notes
    </button>
    <button
      :class="{ selected: this.$parent.menuOpen === 3 }"
      class="navButton"
      @click="toggleAbout()"
    >
      About
    </button>
  </div>
</template>

<script>
export default {
  name: "navBar",
  methods: {
    toggleAccounts() {
      this.$parent.menuOpen = 1;
    },
    toggleNotes() {
      this.$parent.menuOpen = 2;
    },
    toggleAbout() {
      this.$parent.menuOpen = 3;
    },
  },
};
</script>

<style lang="scss">
#navContainer {
  height: 100vh;
  background: #ed6a5a;
  display: inline-block;
  transition: 0.25s;

  #navSearch {
    .hideContainer {
      width: 100%;
      height: 5vh;
    }
  }
}

.navButton {
  background: #ed6a5a;
  border: none;
  width: 100%;
  height: 7.5vh;
  font-size: 2em;
  color: white;

  &:hover {
    border: 2px #f5bb00 dashed;
  }

  &:active {
    opacity: 0.5;
  }
}

h1,
p {
  margin: 0;
}

.selected {
  font-size: 2.5em;
  background: rgba(255, 255, 255, 0.2);
}

.disabled {
  opacity: 0.5;
}
</style>
