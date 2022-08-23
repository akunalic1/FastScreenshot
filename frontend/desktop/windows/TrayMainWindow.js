const { BrowserWindow } = require("electron");
const path = require("path");

class TrayMainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 700,
      height: 300,
      show: true,
      frame: false,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
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
