<template>
  <div id="aboutUs">
    <div class="portrait">
      <img src="../../public/miti.png" />
    </div>
    <h1 class="name">
      Miti <br />
      Local Password Manager
    </h1>
    <h1 class="version">{{ this.version }}</h1>
    <p class="by">
      Made by Gabriel Sattler <br />
      Xolthanod#8008
    </p>
  </div>
</template>

<script>
import { version } from "../../package.json";

export default {
  name: "aboutUs",
  data() {
    return {
      version: version,
    };
  },
};
</script>

<style lang="scss">
#aboutUs {
  padding: 10% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .portrait {
    width: 25%;
    padding: 1%;
    border: 2px #f5bb00 solid;
    border-radius: 20%;
    img {
      width: 100%;
      border-radius: 20%;
    }
  }

  h1 {
    text-align: center;
  }

  .name {
    margin: 2% 0 0 0;
  }

  .version {
    font-size: 1.5em;
    color: #778da9;
  }

  .by {
    text-align: center;
    margin-top: 5%;
    color: #f5bb00;
  }
}
</style>
