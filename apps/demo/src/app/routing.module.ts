import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCardComponent } from './demo/ReportCard/ReportCard.component';
import { DemoComponent } from './demo/demo.component';


const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'demo/exam', component: ReportCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}

export const routedComponents = [DemoComponent, ReportCardComponent];
