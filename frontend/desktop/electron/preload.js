const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ELECTRON_API", {
  //  send
  openWorkspaceWindow: () => ipcRenderer.send("open-workspace-window", ""),
  openCaptureWindow: () => ipcRenderer.send("open-capture-window", ""),
  showCaptureOptions: () => ipcRenderer.send("show-capture-options", ""),
  captureEntireScreen: () => ipcRenderer.send("capture-entire-screen", ""),
  capturePartialScreen: () => ipcRenderer.send("capture-partial-screen", ""),
  recordScreen: () => ipcRenderer.send("record-screen", ""),
  sendMessage: () => ipcRenderer.send("send-message", "SOME MESSAGE"),

  //  receive
  receiveMessage: (callback) => ipcRenderer.on("send-message", callback),
  receiveCapturedImage: (callback) =>
    ipcRenderer.on("screenshot-captured", callback),
});
