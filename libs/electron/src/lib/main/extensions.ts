import { BrowserWindow } from 'electron';


export async function addExtension(browserWindow: BrowserWindow) {
  Extensions.forEach(async (path) => {
    await BrowserWindow.addDevToolsExtension(path);
  });
  BrowserWindow.getFocusedWindow().webContents.openDevTools();
}

const Extensions = [
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.2_0`,
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.19.1_0`
];
