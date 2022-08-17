const { BrowserWindow } = require("electron");
const path = require("path");

class CaptureWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
      },
    });
    this.webContents.openDevTools();
    this.loadURL(url);
  }
}

module.exports = CaptureWindow;
