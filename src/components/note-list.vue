<template>
  <div id="notesHeader" v-if="!creatingNote && !focused">
    <button @click="toggleCreation(true)">Add new note</button>
  </div>

  <div id="createNote" v-if="creatingNote">
    <NoteCreate></NoteCreate>
  </div>

  <div
    id="notesContainer"
    v-if="!focused && !creatingNote && noteList.length > 0"
  >
    <NoteItem
      :key="n"
      v-for="n in noteList"
      :title="n.title"
      :content="n.content"
      :date="n.created"
    ></NoteItem>
  </div>

  <div id="focusContainer" v-if="focused && !creatingNote">
    <NoteFocus
      :title="focusedNote.title"
      :content="focusedNote.content"
      :date="focusedNote.date"
    ></NoteFocus>
  </div>
</template>

<script>
import NoteItem from "./note-item.vue";
import NoteFocus from "./note-focus.vue";
import NoteCreate from "./note-create.vue";
import { readFile } from "../db.js";

export default {
  name: "noteList",
  components: {
    NoteItem,
    NoteFocus,
    NoteCreate,
  },
  data() {
    return {
      fileName: "notes",
      noteList: [],
      focused: false,
      focusedNote: {},
      creatingNote: false,
    };
  },
  mounted() {
    this.loadNotes();
  },
  methods: {
    toggleCreation(state) {
      this.creatingNote = state;
    },
    loadNotes() {
      this.noteList = [];
      readFile(this.fileName).then((v) => {
        this.noteList = v;
      });
    },
  },
};
</script>

<style lang="scss">
#notesHeader {
  button {
    width: 16vw;
    height: 7.5vh;
    border-bottom-right-radius: 16px;
    font-size: 1em;
    font-weight: 700;
    transition: 0.5s;
    color: #141115;

    &:hover {
      opacity: 0.5;
      transition: 0.5s;
      border-bottom-right-radius: 0;
    }
  }
}

#notesContainer {
  width: 100%;
  height: 85vh;
  margin-top: 5vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
