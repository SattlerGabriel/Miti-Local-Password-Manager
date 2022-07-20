const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Miti LPM",
        appId: "mitilpm.com",
        win: {
          target: ["nsis"],
          icon: "public/icon.ico",
        },
        nsis: {
          installerIcon: "public/icon.ico",
          uninstallerIcon: "public/icon.ico",
          uninstallDisplayName: "CPU Monitor",
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
});

