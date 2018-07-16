import { BrowserWindow } from 'electron';
import { logger } from './localscope';


const { debug } = logger;
export async function addExtension(browserWindow: BrowserWindow) {
  debug({ message: `adding developement extensions to electron`, trace: 'extensions:: addExtension' });
  Extensions.forEach(async (path) => {
    await BrowserWindow.addDevToolsExtension(path);
  });
  BrowserWindow.getFocusedWindow().webContents.openDevTools();
}

const Extensions = [
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.2_0`,
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.19.1_0`
];
