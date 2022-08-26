const { BrowserWindow } = require("electron");
const path = require("path");

class TrayMainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 200,
      height: 200,
      show: true,
      frame: false,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
      },
    });
    this.loadURL(url);
  }
}

module.exports = TrayMainWindow;
