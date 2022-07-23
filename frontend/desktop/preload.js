const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ELECTRON_API", {
  openWorkspaceWindow: () => ipcRenderer.send("open-workspace-window", ""),
  // we can also expose variables, not just functions
});
