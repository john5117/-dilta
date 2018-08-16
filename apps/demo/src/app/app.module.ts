import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { ReportCardComponent } from './demo/ReportCard/ReportCard.component';
import { DemoRoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    FormsModule,
    CommonwebuiModule,
    DemoRoutingModule
  ],
  declarations: [AppComponent, DemoComponent, ReportCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
