const { BrowserWindow } = require("electron");
const path = require("path");

class TrayMainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 200,
      height: 300,
      show: true,
      frame: false,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.loadURL(url);
    this.on("blur", this.onBlur.bind(this));
  }

  onBlur = () => {
    //need to handle blur event
  };
}

module.exports = TrayMainWindow;

