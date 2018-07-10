import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusarHomePageComponent, BusarInfoDashboardComponent, BusarPreferencesComponent } from './pages';

const routes: Routes = [
  {
    path: 'busar',
    component: BusarHomePageComponent,
    children: [
      { path: '', component: BusarInfoDashboardComponent, pathMatch: 'full' },
      { path: 'preferences', component: BusarPreferencesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusarRoutingModule {}
