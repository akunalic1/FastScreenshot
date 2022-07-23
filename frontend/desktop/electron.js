const {
  app,
  ipcMain,
  globalShortcut,
  Menu,
  MenuItem,
  BrowserWindow,
  Tray,
  nativeImage,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const TrayMainWindow = require("./TrayMainWindow");
const TrayIcon = require("./TrayIcon");

let trayMainWindow, workspaceWindow, tray;
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
};

const createWorkspaceWindow = () => {
  workspaceWindow = new BrowserWindow({ width: 700, height: 500 });
  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../electron/tray.html")}`;
  workspaceWindow.loadURL(appUrl);
  workspaceWindow.on("closed", () => (workspaceWindow = null));
};

ipcMain.on("open-workspace-window", () => {
  createWorkspaceWindow();
});

const menu = new Menu();
menu.append(
  new MenuItem([
    {
      label: "Electron",
      submenu: [
        {
          role: "help",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
          click: () => {
            console.log("Electron rocks!");
          },
        },
      ],
    },
    {
      label: "Skracenica",
      submenu: [
        {
          role: "help",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
          click: () => {
            console.log("Electron roasdsdsdcks!");
          },
        },
      ],
    },
  ])
);

Menu.setApplicationMenu(menu);

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
    trayMainWindow = null;
    tray = null;
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTrayWindowToggle();
  }
});

