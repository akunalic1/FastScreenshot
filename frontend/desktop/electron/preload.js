const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ELECTRON_API", {
  //  send
  openWorkspaceWindow: () => ipcRenderer.send("open-workspace-window", ""),
  showCaptureOptions: () => ipcRenderer.send("show-capture-options", ""),
  captureEntireScreen: () => ipcRenderer.send("capture-entire-screen", ""),
  recordScreen: () => ipcRenderer.send("record-screen", ""),
  sendMessage: () => ipcRenderer.send("send-message", "SOME MESSAGE"),

  //  receive
  receiveMessage: (callback) => ipcRenderer.on("receive-message", callback),
  receiveScreenshot: (callback) =>
    ipcRenderer.once("receive-screenshot", callback),
});
