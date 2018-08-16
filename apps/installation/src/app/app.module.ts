import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProcessNgrxModule } from '@dilta/process';
import { entityMetadata } from '@dilta/store';
import { loggerServiceFactory, LoggerService } from '@dilta/util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgrxDataModule } from 'ngrx-data';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LienscePagesModule } from './components';

const logger = new LoggerService('@dilta/installation', 'info');

@NgModule({
  declarations: [AppComponent],
  imports: [
    NxModule.forRoot(),
    BrowserModule,
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
    LienscePagesModule,
    ProcessNgrxModule,
    AppRoutingModule
  ],
  providers: [{ useValue: logger, provide: LoggerService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
