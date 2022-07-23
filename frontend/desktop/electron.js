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

let trayWindowToggle, childWindow, tray;

const createTrayWindowToggle = () => {
  trayWindowToggle = new BrowserWindow({ width: 780, height: 620 });
  const trayWindowPath = path.join(app.getAppPath(), "dist", "index.html");
  trayWindowToggle.loadURL(trayWindowPath);
  trayWindowToggle.on("closed", () => (trayWindowToggle = null));
  createTrayIcon();
};

const createTrayIcon = () => {
  tray = new Tray(
    nativeImage.createFromPath(
      path.join(app.getAppPath(), "src", "assets", "bunny.png")
    )
  );
  tray.setToolTip("Take some screenshots");
};

const createChildWindow = () => {
  childWindow = new BrowserWindow({ width: 480, height: 320 });
  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../electron/tray.html")}`;
  childWindow.loadURL(appUrl);
  childWindow.on("closed", () => (childWindow = null));
};

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

