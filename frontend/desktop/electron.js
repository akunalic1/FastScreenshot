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

const env = "dev";

let trayMainWindow, workspaceWindow, tray;

const createTrayWindowToggle = () => {
  trayMainWindow = new BrowserWindow({
    width: 200,
    height: 300,
    show: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const trayWindowPath =
    env === "dev"
      ? "http://localhost:8080"
      : path.join(app.getAppPath(), "dist", "index.html");
  trayMainWindow.loadURL(trayWindowPath);

  trayMainWindow.on("closed", () => {
    trayMainWindow = null;
    tray = null;
  });
  createTrayIcon();
};

const createTrayIcon = () => {
  tray = new Tray(
    nativeImage.createFromPath(
      path.join(app.getAppPath(), "src", "assets", "bunny.png")
    )
  );
  const { x, y } = tray.getBounds();
  const { width, height } = trayMainWindow.getBounds();

  trayMainWindow.setBounds({
    x: x - width / 2,
    y: y - height - 10,
  });
  tray.setToolTip("Take some screenshots");

  tray.on("click", () => {
    if (trayMainWindow.isVisible()) trayMainWindow.hide();
    else trayMainWindow.show();
  });
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
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTrayWindowToggle();
  }
});

