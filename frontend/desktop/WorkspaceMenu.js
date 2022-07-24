const { Menu, MenuItem } = require("electron");

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
