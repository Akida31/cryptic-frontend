const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
  win = new BrowserWindow({ 
      width: 800, 
      height: 600,
      title: "Cryptic Game",
      icon: path.join(__dirname, "/dist/frontend/icons/icon-512x512.png") 
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/frontend/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  win.on("closed", () => {
    win = null;
  });
}
app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
