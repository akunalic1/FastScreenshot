const path = require("path");
const {
  ipcMain,
  desktopCapturer,
  globalShortcut,
  nativeImage,
} = require("electron");
const CaptureOptionsWindow = require("../windows/CaptureOptionsWindow");
const WorkspaceWindow = require("../windows/WorkspaceWindow");
const { Notification } = require("electron/main");

module.exports = setAllIpcMainEvents = (
  app,
  workspaceWindow,
  captureOptionsWindow,
  trayMainWindow
) => {
  if (process.platform === "win32") {
    app.setAppUserModelId("Fast Screenshot");
  }

  ipcMain.on("open-workspace-window", () => {
    workspaceWindow = createWindow(
      workspaceWindow,
      // path.join(app.getAppPath(), "public", "index.html"),
      "http://localhost:3000",
      "workspaceWindow"
    );
    workspaceWindow?.on("closed", () => {
      workspaceWindow = null;
    });
  });

  ipcMain.on("show-capture-options", () => {
    captureOptionsWindow = createWindow(
      captureOptionsWindow,
      path.join(
        app.getAppPath(),
        "dist/captureOptions/captureOptions.index.html"
      ),
      "captureOptionsWindow"
    );
    captureOptionsWindow?.on("closed", () => {
      captureOptionsWindow = null;
    });
  });

  ipcMain.on("capture-entire-screen", () => {
    getScreenshot("receive-screenshot", captureOptionsWindow);
  });

  globalShortcut.register("Alt+CommandOrControl+I", () => {
    console.log("Electron loves global shortcuts!");
    getScreenshot("receive-screenshot", trayMainWindow);
    new Notification({
      title: "New screenshot",
      body: "Your screenshot is added to your workspace!",
      icon: nativeImage.createFromPath(
        path.join(app.getAppPath(), "src", "assets", "screenshot.png")
      ),
    }).show();
  });

  const getScreenshot = async (eventName, window) => {
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width: 400, height: 400 },
    });
    let image = sources[0].thumbnail.toDataURL();
    window?.webContents.send(eventName, image);
  };

  const createWindow = (window, url, type) => {
    if (!window) {
      switch (type) {
        case "workspaceWindow":
          window = new WorkspaceWindow(url);
          break;
        case "captureWindow":
          window = new CaptureWindow(url);
          break;
        case "captureOptionsWindow":
          window = new CaptureOptionsWindow(url);
          break;
      }
    }
    window?.show();
    return window;
  };
};
