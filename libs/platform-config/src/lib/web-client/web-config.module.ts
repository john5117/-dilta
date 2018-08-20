import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, ValueProvider } from '@angular/core';
import { AppConfiguration } from '@dilta/platform-config/src/lib/shared';
import { AppConfigToken } from './web-config.service';


@NgModule({
  imports: []
})
export class WebPlatformConfigModule {

  /** setup root */
  static forRoot(config: AppConfiguration): ModuleWithProviders {
    return {
      ngModule: WebPlatformConfigModule,
      providers: [
        <ValueProvider>{ provide:  AppConfigToken, useValue: config }
      ]
    };
  }
}

