const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow;

const appURL = url.format({
  pathname: path.join(__dirname, 'www', 'index.html'),
  protocol: "file:",
  slashes: true
});

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 780,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      // contextIsolation: false,
    }
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode) => {
    appStarted.next(false);
    const route = mainWindow.webContents.getURL().replace(path.dirname(appURL), '');
    mainWindow.loadURL(appURL);
    // ipcMain.handle('send', (event) => {
    //   if (event == 'ready') {
    //   }
      // console.debug('MYTEST CALL REGISTER APP', app);
      // app.router.navigateByUrl(route);
    // });
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  })

}

app.on('ready', createWindow);
app.whenReady().then(() => {
  console.debug('MYTEST APP READY');
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

