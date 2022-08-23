const { BrowserWindow } = require("electron");
const path = require("path");

class CaptureOptionsWindow extends BrowserWindow {
  constructor(url) {
    super({
      useContentSize: true,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
      },
      allowEval: false,
    });
    this.webContents.openDevTools();
    this.loadURL(url);
  }
}

module.exports = CaptureOptionsWindow;
