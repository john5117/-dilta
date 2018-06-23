import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthPagesModule } from '@dilta/auth-module';
import { ProcessNgrxModule } from '@dilta/process';
import { entityMetadata } from '@dilta/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { NgrxDataModule } from 'ngrx-data';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DreamstackRoutingModule } from './app.routing.module';


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
    ProcessNgrxModule,
    DreamstackRoutingModule,
    AuthPagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
