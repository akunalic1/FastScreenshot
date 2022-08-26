const { BrowserWindow } = require("electron");
const path = require("path");

class WorkspaceWindow extends BrowserWindow {
  constructor(url) {
    super({
      useContentSize: true,
      webPreferences: {
        preload: path.join(__dirname, "../electron/preload.js"),
        nodeIntegration: true,
      },
    });
    this.loadURL(url);
  }
}

module.exports = WorkspaceWindow;
