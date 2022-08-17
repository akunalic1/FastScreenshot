const { BrowserWindow } = require("electron");
const path = require("path");

class WorkspaceWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 500,
      height: 500,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
      },
    });
    this.webContents.openDevTools();
    this.loadURL(url);
  }
}

module.exports = WorkspaceWindow;
