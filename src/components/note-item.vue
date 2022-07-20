<template>
  <div class="note">
    <button class="noteTitle" @click="openNote()">{{ title }}</button>
    <button
      class="trashcan"
      @click="toggleConfirmation(true)"
      v-if="!removingNote"
    >
      <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
    </button>

    <div class="confirmNoteRemoval" v-if="removingNote">
      <button @click="removeNote()">Delete</button>
      <button @click="toggleConfirmation(false)">Cancel</button>
    </div>
  </div>
</template>

<script>
import { removeEntry } from "../db.js";

export default {
  name: "noteItem",
  props: {
    title: String,
    content: String,
    date: String,
  },
  data() {
    return {
      removingNote: false,
    };
  },
  methods: {
    removeNote() {
      const dto = {
        title: this.title,
        content: this.content,
      };

      removeEntry(this.$parent.fileName, dto, "note").then(() => {
        this.$parent.loadNotes();
      });
    },
    toggleConfirmation(state) {
      this.removingNote = state;
    },
    openNote() {
      this.$parent.focused = true;
      this.$parent.focusedNote = {
        title: this.title,
        content: this.content,
        date: this.date,
      };
    },
  },
};
</script>

<style lang="scss">
.note {
  width: 95%;
  height: 3.5em;
  margin: 0 2.5%;
  margin-bottom: 2%;
  border-bottom: 1px dashed #f5bb00;
  display: flex;
  justify-content: space-between;

  .noteTitle {
    font-weight: 700;
    transition: 0.5s;

    &:hover {
      transition: 0.5s;
      color: rgba(255, 255, 255, 0.25);
    }
  }

  button {
    width: auto;
    display: inline-block;
    color: white;
    font-size: 2em;
  }

  button {
    background: none;
  }

  .confirmNoteRemoval {
    width: 12vw;

    button {
      background: #ed6a5a;
      padding: 4%;
      border-radius: 0.5vw;
      font-size: 1.5em;
      transition: 0.25s;

      &:hover {
        border-radius: 0;
      }

      &:last-child {
        margin-left: 5%;
        font-size: 1em;
        background: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .trashcan {
    width: 4vw;
    height: 4vw;
    background: none;
    transition: 0.5s;

    &:hover {
      transition: 0.5s;
      transform: scale(1.1);
    }

    img {
      width: 100%;
      filter: invert(1);
    }
  }
}
</style>
