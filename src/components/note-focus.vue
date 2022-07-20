<template>
  <div class="noteFocus">
    <div class="title">
      <button @click="deFocus()">
        <img src="https://cdn-icons-png.flaticon.com/512/8066/8066747.png" />
      </button>
      <h1>{{ this.title }}</h1>
    </div>
    <div class="noteContent">
      <p>{{ this.content }}</p>
    </div>
    <div class="footer">
      <p class="date"><span>Created on</span> {{ this.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "noteFocus",
  props: {
    title: String,
    content: String,
    date: String,
  },
  methods: {
    deFocus() {
      this.$parent.focused = false;
      this.$parent.focusedNote = {};
    },
  },
};
</script>

<style lang="scss">
.noteFocus {
  width: 98%;
  margin: 1% 1%;

  .title {
    height: 3vw;
    display: flex;
    align-items: center;

    button {
      width: 3vw;
      height: 3vw;
      background: none;
      img {
        width: 100%;
        filter: invert(1);
        transform: scaleY(-1) rotate(90deg);
        transition: 1s;

        &:hover {
          transform: scaleY(-1.5) scaleX(1.5) rotate(90deg);
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6vh;

    span {
      color: #778da9;
    }

    .date {
      text-align: center;
    }
  }

  button,
  h1 {
    display: inline;
  }

  h1 {
    font-size: 2em;
    margin: 0;
    color: #778da9;
  }

  .noteContent {
    width: 100%;
    height: 85vh;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 2px dashed #f5bb00;
    border-right: none;

    p {
      padding: 1%;
      width: 100%;
      min-height: 90%;
      height: auto;
      font-size: 1.1em;
      white-space: pre-wrap;
    }
  }
}
</style>
