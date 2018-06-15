import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { NxModule } from '@nrwl/nx';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LienscePagesModule } from './components';
import { AppRoutingModule } from './app-routing.module';
import { ProcessNgrxModule } from '@dilta/process';
import { NgrxDataModule, EntityDataService } from 'ngrx-data';
import { entityMetadata } from '@dilta/store';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
