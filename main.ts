import { createLiensceWindow, mainframeIPC } from '@dilta/electron';
import { logger } from '@dilta/electron/src/lib/main/localscope';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
const { debug } = logger;


let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createMainWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }
}

async function createWindow() {
  debug({
    message: 'window ready event triggered',
    trace: 'main::createWindow'
  });
  await mainframeIPC(ipcMain);
  createLiensceWindow({});
  // createMainWindow();
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    debug({
      message: 'window-all-closed event triggered',
      trace: 'main::close-window'
    });
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    debug({
      message: 'window activate event triggered',
      trace: 'main::close-window'
    });
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
