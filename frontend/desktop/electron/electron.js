const { app, BrowserWindow } = require("electron");
const path = require("path");

const TrayMainWindow = require("../windows/TrayMainWindow.js");
const TrayIcon = require("../windows/TrayIcon.js");
const setAllIpcMainEvents = require("./ipcMainEvents");

let trayMainWindow = null,
  workspaceWindow = null,
  captureOptionsWindow = null,
  tray = null;

const createTrayWindowToggle = () => {
  trayMainWindow = new TrayMainWindow(
    path.join(app.getAppPath(), "dist", "tray", "tray.index.html")
  );
  tray = new TrayIcon(
    path.join(app.getAppPath(), "src", "assets", "screenshot.png"),
    trayMainWindow
  );
  setAllIpcMainEvents(
    app,
    workspaceWindow,
    captureOptionsWindow,
    trayMainWindow
  );
  require("./../windows/WorkspaceMenu");
};

app.whenReady().then(createTrayWindowToggle);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTrayWindowToggle();
  }
});
