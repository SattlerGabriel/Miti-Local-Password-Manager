<template>
  <div id="accTop">
    <button class="addAcc" v-if="!isAddingNew" @click="toggleAccountAdd(true)">
      + Add new account
    </button>

    <input
      class="searchBar"
      v-if="!isAddingNew"
      maxlength="17"
      name="searchUser"
      placeholder="Search for an account"
      v-model="searchQuery"
      @change="searchAccount(searchQuery)"
    />

    <button class="clearSearch" v-if="isSearching" @click="clearSearch">
      Clear
    </button>

    <div class="form" v-if="isAddingNew">
      <div class="formInput">
        <label for="webpage">Website</label>
        <input type="text" name="webpage" ref="page" placeholder="Website" />
      </div>
      <div class="formInput">
        <label for="username">Username</label>
        <input type="text" name="username" ref="user" placeholder="Username" />
      </div>
      <div class="formInput">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          ref="pw"
          placeholder="Password"
          v-on:keyup.enter="
            saveAccount();
            toggleAccountAdd(false);
          "
        />
      </div>
      <button
        class="confirmAddAccount"
        @click="
          saveAccount();
          toggleAccountAdd(false);
        "
      >
        Add
      </button>
      <button class="cancelAddAccount" @click="toggleAccountAdd(false)">
        Cancel
      </button>
    </div>
  </div>

  <div class="accountDisplay" v-if="isSearching">
    <account-item
      v-for="n in searchResult"
      :key="n"
      :website="n.webpage"
      :username="n.username"
      :password="n.password"
    ></account-item>
  </div>

  <div class="accountDisplay" v-if="!isSearching">
    <account-item
      v-for="n in this.accountList"
      :key="n"
      :website="n.webpage"
      :username="n.username"
      :password="n.password"
    ></account-item>
  </div>
</template>

<script>
import AccountItem from "./account-item.vue";
import { writeFile, readFile, getEntry } from "../db.js";

export default {
  name: "mainContainer",
  data() {
    return {
      fileName: "accountList",
      isAddingNew: false,
      accountList: [],
      finishedLoading: false,
      isSearching: false,
      searchQuery: "",
      searchResult: [],
    };
  },
  components: {
    AccountItem,
  },
  mounted() {
    this.loadAccounts();
  },
  methods: {
    toggleAccountAdd(state) {
      this.isAddingNew = state;
    },
    saveAccount() {
      let data = {
        webpage: this.$refs.page.value,
        username: this.$refs.user.value,
        password: this.$refs.pw.value,
      };

      console.log(data);

      if (
        this.validate(data.webpage) &&
        this.validate(data.username) &&
        this.validate(data.password)
      ) {
        this.writeFile(this.fileName, data).then(() => {
          this.loadAccounts();
        });
      }
    },
    loadAccounts() {
      this.finishedLoading = false;
      this.accountList = new Array();
      this.readFile(this.fileName).then((data) => {
        this.accountList = data;
        this.finishedLoading = true;
      });
    },
    validate(data) {
      if (data === null || data === undefined || data === "" || data === " ") {
        return false;
      } else return true;
    },
    searchAccount(query) {
      this.isSearching = this.validate(query);

      getEntry(this.fileName, query, "account").then((accounts) => {
        this.searchResult = accounts;
      });
    },
    clearSearch() {
      this.searchResult = new Array();
      this.isSearching = false;
      this.searchQuery = "";
    },
    writeFile,
    readFile,
  },
};
</script>

<style lang="scss">
#accTop {
  width: 95%;
  height: 10vh;
  margin-bottom: 1%;

  .addAcc {
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

  .form {
    width: 98%;
    padding: 3% 0;
    margin: 0 2%;

    .formInput {
      display: inline-block;
      margin-right: 3%;

      label {
        position: absolute;
        transform: translateY(-20px);
      }

      input {
        height: 2em;
        border-radius: 4px;
        border: 2px #f5bb00 dashed;
        background: #141115;
        color: white;
      }
    }
  }

  button {
    width: 6vw;
    height: 2em;
    margin-right: 2%;
  }

  .confirmAddAccount {
    background: #ed6a5a;
    color: white;
    border-radius: 4px;
    font-weight: 700;
    transition: 0.25s;

    &:hover {
      border-radius: 0;
      transition: 0.25s;
      font-size: 1em;
    }
  }

  .cancelAddAccount {
    background: none;
    color: white;
    text-decoration: underline;
    transition: 0.25s;

    &:hover {
      transition: 0.25s;
      opacity: 0.5;
    }
  }
}

.accountDisplay {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 88vh;
}

.searchBar {
  height: 2em;
  border-radius: 4px;
  border: 2px #f5bb00 dashed;
  background: #141115;
  color: white;
  margin-right: 2%;
}

.clearSearch {
  background: #ed6a5a;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  transition: 0.25s;

  &:hover {
    border-radius: 0;
    transition: 0.25s;
    font-size: 1em;
  }
}
</style>
