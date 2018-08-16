import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthPagesModule } from '@dilta/auth-module';
import { BusarAppModule } from '@dilta/busar/src/lib/busar.module';
import { ProcessNgrxModule } from '@dilta/process';
import { entityMetadata } from '@dilta/store';
import { AuthenticationFeatureNgrxModule } from '@dilta/store/src/lib/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgrxDataModule } from 'ngrx-data';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DreamstackRoutingModule } from './app.routing.module';
import { LoggerService } from '@dilta/util';
import { RouterState } from '@dilta/common-ui';

const logger = new LoggerService('@dilta/installation', 'info');

@NgModule({
  declarations: [AppComponent, BusarAppModule.RootComponent],
  imports: [
    NxModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    NgrxDataModule.forRoot({
      entityMetadata
    }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'NgRx Book Store DevTools'
        })
      : [],
    HttpClientModule,
    ProcessNgrxModule,
    BusarAppModule,
    AuthPagesModule,
    AuthenticationFeatureNgrxModule,
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
