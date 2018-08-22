import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterState } from '@dilta/common-ui';
import { AppConfiguration, WebPlatformConfigModule } from '@dilta/platform-config/src';
import { LoggerService } from '@dilta/util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DreamstackRoutingModule } from './app.routing.module';

const logger = new LoggerService('@dilta/installation', 'info');

const config: AppConfiguration = {
  baseUrl: 'http://localhost:3000',
  signupRedirect: 'biodata'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    NxModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'NgRx Book Store DevTools'
        })
      : [],
    HttpClientModule,
    WebPlatformConfigModule.forRoot(config),
    DreamstackRoutingModule
  ],
  providers: [{ useValue: logger, provide: LoggerService }, RouterState],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(routingState: RouterState) {
    routingState.loadRouting();
  }
}
