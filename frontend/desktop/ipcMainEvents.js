const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

module.exports = setAllIpcMainEvents = (app, workspaceWindow) => {
  ipcMain.on("open-workspace-window", () => {
    if (!workspaceWindow) {
      createWorkspaceWindow();
    }
  });

  const createWorkspaceWindow = () => {
    workspaceWindow = new BrowserWindow({ width: 700, height: 500 });
    const appUrl = isDev
      ? "http://localhost:3000"
      : path.join(app.getAppPath(), "public", "index.html");
    workspaceWindow.loadURL(appUrl);
    workspaceWindow.on("closed", () => {
      workspaceWindow = null;
    });
  };
};
