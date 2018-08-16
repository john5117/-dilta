import { BrowserWindow } from 'electron';
import { logger } from '@dilta/electron/src/lib/main/localscope';

export async function addExtension(browserWindow: BrowserWindow) {
  logger.debug({
    message: `adding developement extensions to electron`,
    trace: 'extensions:: addExtension'
  });
  Extensions.forEach(async path => {
    await BrowserWindow.addDevToolsExtension(path);
  });
  BrowserWindow.getFocusedWindow().webContents.openDevTools();
}

const Extensions = [
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_0`,
  `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.19.1_0`
];
