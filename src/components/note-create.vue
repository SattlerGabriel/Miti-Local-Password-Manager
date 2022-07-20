<template>
  <div class="noteCreation">
    <input
      class="noteTitle"
      placeholder="New note title"
      maxlength="40"
      v-model="title"
      @change="validateField(this.title)"
    />
    <div class="contentContainer">
      <textarea
        class="noteContent"
        placeholder="Insert text"
        v-model="content"
        @change="validateField(this.content)"
      ></textarea>
    </div>
    <div class="noteButtons">
      <button v-if="valid" @click="saveNote()" class="validButton">
        Confirm Note
      </button>
      <button v-if="!valid" disabled class="disabledButton">
        Confirm Note
      </button>
      <button @click="this.$parent.toggleCreation(false)">Cancel Note</button>
    </div>
  </div>
</template>

<script>
import { writeFile } from "../db.js";

export default {
  name: "noteCreate",
  data() {
    return {
      title: "",
      content: "",
      date: new Date(),
      valid: false,
    };
  },
  methods: {
    saveNote() {
      let dto = {
        title: this.title,
        content: this.content,
        created:
          this.date.getDate() +
          "/" +
          (this.date.getMonth() + 1) +
          "/" +
          this.date.getFullYear(),
      };

      this.validateField(dto.title);
      this.validateField(dto.content);

      if (!this.valid) return;

      writeFile(this.$parent.fileName, dto).then(() => {
        this.$parent.creatingNote = false;
        this.$parent.loadNotes();
      });
    },
    validateField(field) {
      if (field === "" || field === undefined || field === null) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
  },
};
</script>

<style lang="scss">
.noteCreation {
  .noteTitle {
    width: 97%;
    margin: 1% 1%;
    font-size: 2em;

    background: #141115;
    border: none;
    border-bottom: #f5bb00 2px solid;
    color: #778da9;
  }

  .contentContainer {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 80vh;

    .noteContent {
      display: block;
      width: 97%;
      height: 98%;
      min-height: 95%;
      margin: 0 1%;
      resize: vertical;
      font-family: "Rubik", sans-serif;
      font-size: 1em;
      background: #141115;
      color: white;
      border: 2px dashed #f5bb00;
      white-space: pre-wrap;
    }
  }

  .noteButtons {
    display: flex;
    height: 10vh;
    margin: 0 30%;
    justify-content: space-evenly;
    align-items: center;

    button {
      width: 10vw;
      height: 5vh;
      color: white;
      font-size: 0.9em;
      border-radius: 0.5vw;
      transition: 0.25s;

      &:last-child {
        background: none;
        color: white;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.validButton {
  background: #ed6a5a;

  &:hover {
    border-radius: 0;
  }
}

.disabledButton {
  background: #778da9;
  border-radius: 0.5vw;
  opacity: 0.5;

  &:hover {
    cursor: not-allowed;
  }
}
</style>
