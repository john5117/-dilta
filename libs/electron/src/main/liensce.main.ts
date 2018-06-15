import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import { errorInvalidArray } from '@dilta/screwbox';
import { addExtension } from '@dilta/electron/src/main/extensions';

/**
 * customized events configuration for the window object created
 *
 * @export
 * @interface BrowserWindowEvents
 */
export interface BrowserWindowEvents {
  /**
   * the name of the event
   *
   * @type {string}
   * @memberof BrowserWindowEvents
   */
  name: string;
  /**
   * functional implementation of the event
   *
   * @memberof BrowserWindowEvents
   */
  event();
}

export function createLiensceWindow({
  events
}: {
  events?: BrowserWindowEvents[];
}) {
  // instatiating the liensce window
  let liensceWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    modal: true,
    center: true,
    movable: false,
    resizable: true,
    width: 503,
    height: 671,
    // frame: false,
    webPreferences: {
      webSecurity: false
    }
  });

  liensceWindow.setMenu(null);
  liensceWindow.setMenuBarVisibility(false);
  liensceWindow.webContents.openDevTools();

  addExtension(BrowserWindow as any);

  // loading events
  if (events) {
    // throws error if the events is not an array
    errorInvalidArray(events);
    events.forEach(e => {
      // validates the event
      validateBrowserEvent(e);
      // append the event
      liensceWindow.on(e.name as any, e.event);
    });

    // Emitted when the window is closed.
    liensceWindow.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      liensceWindow = null;
    });
  }

  liensceWindow.loadURL(`http://localhost:4200`);
  // liensceWindow.loadURL(`file://${path.join(__dirname, '..', 'dist', '/index.html')}`);

  // returning the instantiated lienscewindow
  return liensceWindow;
}

/**
 * validates an browserEvent if it's value is acceptable else
 * throws an error
 *
 * @param {BrowserWindowEvents} e event to be validated
 */
export function validateBrowserEvent(e: BrowserWindowEvents) {
  if (typeof e.name !== 'string' || typeof e.event !== 'function') {
    throw browserWindowEventsError;
  }
}

/**
 * error thrown for invalid BrowserWindowEvent array passed
 */
export const browserWindowEventsArrayError = new Error(
  `expected an array of browserWindowEvents`
);
/**
 * error thron for invalid BrowserWindowEvent
 */
export const browserWindowEventsError = new Error(`expected browserWindowEvents object name to be
  a string name and  event to be a function`);
