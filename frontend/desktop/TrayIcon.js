const { Tray, nativeImage } = require("electron");
const path = require("path");

class TrayIcon extends Tray {
  constructor(url, trayMainWindow) {
    super(nativeImage.createFromPath(url));

    this.trayMainWindow = trayMainWindow;
    this.setToolTip("Take some screenshots");
    this.setWindowPosition();

    this.on("click", this.onClick.bind(this));
  }

  onClick = () => {
    this.trayMainWindow.isVisible()
      ? this.trayMainWindow.hide()
      : this.trayMainWindow.show();
  };

  setWindowPosition = () => {
    const { x, y } = this.getBounds();
    const { width, height } = this.trayMainWindow.getBounds();

    this.trayMainWindow.setBounds({
      x: x - width / 2,
      y: y - height - 10,
    });
  };
}

module.exports = TrayIcon;
