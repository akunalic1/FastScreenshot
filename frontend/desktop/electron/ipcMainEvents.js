const path = require("path");
const { ipcMain, desktopCapturer, globalShortcut } = require("electron");
const CaptureOptionsWindow = require("../windows/CaptureOptionsWindow");
const WorkspaceWindow = require("../windows/WorkspaceWindow");
const CaptureWindow = require("../windows/CaptureWindow");

module.exports = setAllIpcMainEvents = (
  app,
  workspaceWindow,
  captureWindow,
  captureOptionsWindow
) => {
  //  opening windows
  ipcMain.on("open-workspace-window", () => {
    workspaceWindow = createWindow(
      workspaceWindow,
      // path.join(app.getAppPath(), "public", "index.html"),
      "http://localhost:3000",
      "workspaceWindow"
    );
  });

  ipcMain.on("open-capture-window", () => {
    captureWindow = createWindow(
      captureWindow,
      path.join(
        app.getAppPath(),
        "dist/captureOptions/captureOptions.index.html"
      ),
      "captureWindow"
    );
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
  });

  //  capturing events
  ipcMain.on("capture-entire-screen", () => {
    createAndSendRecordingToScreen();
  });

  ipcMain.on("capture-partial-screen", () => {});

  ipcMain.on("record-screen", () => {});

  ipcMain.on("send-message", (event, arg) => {
    if (captureWindow) {
      captureWindow.webContents.send("send-message", arg);
    }
  });

  // refactor to utils...

  globalShortcut.register("Alt+CommandOrControl+I", () => {
    console.log("Electron loves global shortcuts!");
    console.log(workspaceWindow);
    console.log(captureWindow);
    createWindow(
      captureWindow,
      path.join(
        app.getAppPath(),
        "dist/captureOptions/captureOptions.index.html"
      ),
      "captureWindow"
    );
    createAndSendRecordingToScreen();
  });

  const createAndSendRecordingToScreen = () => {
    desktopCapturer
      .getSources({
        types: ["screen"],
        thumbnailSize: { width: 400, height: 400 },
      })
      .then((sources) => {
        let image = sources[0].thumbnail.toDataURL();
        createWindow(
          captureWindow,
          path.join(
            app.getAppPath(),
            "dist/captureOptions/captureOptions.index.html"
          ),
          "captureWindow"
        );
        captureWindow?.webContents.send("send-message", image);
      });
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
        default:
          window.on("closed", () => {
            window = null;
          });
      }
    }
    return window;
  };
};
