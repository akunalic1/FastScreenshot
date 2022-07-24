const { app, globalShortcut, BrowserWindow } = require("electron");
const path = require("path");

const TrayMainWindow = require("./TrayMainWindow");
const TrayIcon = require("./TrayIcon");
const setAllIpcMainEvents = require("./ipcMainEvents");

let trayMainWindow = null,
  workspaceWindow = null,
  tray = null;
const env = "dev";

const createTrayWindowToggle = () => {
  trayMainWindow = new TrayMainWindow(
    env === "dev"
      ? "http://localhost:8080"
      : path.join(app.getAppPath(), "dist", "index.html")
  );
  tray = new TrayIcon(
    path.join(app.getAppPath(), "src", "assets", "bunny.png"),
    trayMainWindow
  );
  console.log(tray.trayMainWindow === trayMainWindow, "iste ? ?????");
  setAllIpcMainEvents(app, workspaceWindow);
};

app
  .whenReady()
  .then(() => {
    globalShortcut.register("Alt+CommandOrControl+I", () => {
      console.log("Electron loves global shortcuts!");
    });
  })
  .then(createTrayWindowToggle);

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

