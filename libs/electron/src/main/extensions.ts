import { BrowserWindow } from 'electron';

export function addExtension(browserWindow: BrowserWindow) {
  BrowserWindow.addDevToolsExtension(
    `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.2_0`
  );
  BrowserWindow.addDevToolsExtension(
    `C:/Users/AbiZeus/AppData/Local/Google/Chrome/User Data/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.16.0_0`
  );
}
