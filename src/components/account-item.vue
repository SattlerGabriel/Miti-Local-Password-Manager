<template>
  <div :class="{ space: removingAccount }" class="accountItem">
    <div
      :class="{ opac: removingAccount }"
      @click="copyToClipboard(this.website, 'web')"
      class="accountProp"
    >
      <p class="webT">{{ copiedWeb == true ? "Copied!" : "Website" }}</p>
      <h1>{{ website }}</h1>
    </div>
    <div
      :class="{ opac: removingAccount }"
      @click="copyToClipboard(this.username, 'user')"
      class="accountProp"
    >
      <p class="userT">{{ copiedUser == true ? "Copied!" : "Username" }}</p>
      <h1>{{ username }}</h1>
    </div>
    <div
      :class="{ opac: removingAccount }"
      @click="copyToClipboard(this.password, 'pass')"
      class="accountProp"
    >
      <p class="passT">{{ copiedPass == true ? "Copied!" : "Password" }}</p>
      <h1 class="password">{{ this.password }}</h1>
    </div>
    <button
      class="removeButton accountOptionsButton"
      v-if="!removingAccount"
      @click="this.toggleConfirmation()"
    >
      <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
    </button>
    <p v-if="removingAccount" class="removeAccountText">
      Are you sure you want to remove this account?
    </p>
    <button
      v-if="removingAccount"
      class="removeAccountButton confirmRemoval"
      @click="this.removeAccount()"
    >
      Yes
    </button>
    <button
      v-if="removingAccount"
      class="removeAccountButton cancelRemoval"
      @click="this.toggleConfirmation()"
    >
      No
    </button>
  </div>
</template>

<script>
import { removeEntry } from "../db.js";

export default {
  name: "account-item",
  props: {
    website: String,
    username: String,
    password: String,
  },
  data() {
    return {
      removingAccount: false,
      editingAccount: false,
      copiedWeb: false,
      copiedUser: false,
      copiedPass: false,
    };
  },
  methods: {
    copyToClipboard(value, field) {
      switch (field) {
        case "web":
          this.copiedWeb = true;
          setTimeout(() => {
            this.copiedWeb = false;
          }, 2500);
          break;
        case "user":
          this.copiedUser = true;
          setTimeout(() => {
            this.copiedUser = false;
          }, 2500);
          break;
        case "pass":
          this.copiedPass = true;
          setTimeout(() => {
            this.copiedPass = false;
          }, 2500);
          break;
      }

      navigator.clipboard.writeText(value);
    },
    toggleConfirmation() {
      this.removingAccount = !this.removingAccount;
    },
    editAccount() {
      this.editingAccount = !this.editingAccount;
    },
    removeAccount() {
      let obj = {
        webpage: this.website,
        username: this.username,
        password: this.password,
      };

      this.removeEntry(this.$parent.fileName, obj, "account").then(() => {
        this.$parent.loadAccounts();
      });
    },
    removeEntry,
  },
};
</script>

<style lang="scss">
.accountItem {
  display: inline-block;
  width: 90%;
  height: 7.5vh;
  padding: 1% 5%;
  transition: 0.5s;
  background: none;
  border-bottom: #f5bb00 dashed 1px;

  .accountProp {
    display: inline-block;
    margin-right: 5%;
    width: 26%;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      transition: 0.5s;

      p {
        transition: 0.5s;
        color: #f5bb00;
      }
    }

    p {
      transition: 0.5s;
      margin: 0;
      display: block;
      color: #778da9;
    }

    h1 {
      width: 100%;
      display: inline-block;
      font-size: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.password {
  filter: blur(4px);
  transition: 0.25s;

  &:hover {
    filter: blur(0);
    transition: 0.25s;
  }
}

.accountOptionsButton {
  margin: 0 1%;
  transition: 0.25s;
  transform: scale(1);

  &:hover {
    transition: 0.25s;
    transform: scale(1.15);
  }
}

.removeButton {
  height: 100%;
  width: 4%;
  background: none;

  img {
    width: 150%;
    filter: invert(1);
  }
}

.space {
  margin-bottom: 5%;
  height: 18vh;
}

.opac {
  opacity: 0.25;
  filter: blur(5px);
  transition: 0.5s;
}

.removeAccountText {
  color: red;
}

.removeAccountButton {
  margin: 1% 1%;
  padding: 1% 2%;
  font-weight: 700;

  &:first-of-type {
    margin-left: 0;
  }
}

.cancelRemoval {
  color: white;
  background: none;

  &:hover {
    text-decoration: underline;
  }
}

.confirmRemoval {
  border-radius: 10px;
  transition: 1s;

  &:hover {
    transform: scale(125%);
    transition: 1s;
  }
}
</style>
