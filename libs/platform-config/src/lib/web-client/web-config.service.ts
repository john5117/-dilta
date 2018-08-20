import { InjectionToken } from '@angular/core';
import { AppConfiguration } from '@dilta/platform-config/src/lib/shared';

/** Enums of Application TOken */
export enum Application_Tokens {
  // configutation
  App_Global_Token = 'application configuration',
}

/** Application Config Token */
export const AppConfigToken = new InjectionToken<AppConfiguration>(Application_Tokens.App_Global_Token);
