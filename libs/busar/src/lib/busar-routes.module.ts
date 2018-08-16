import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BusarHomePageComponent,
  BusarInfoDashboardComponent,
  BusarPreferencesComponent,
  BusarRecieptWebFormComponent,
  BusarExpenseWebFormComponent
} from './pages';

const routes: Routes = [
  {
    path: 'busar',
    component: BusarHomePageComponent,
    children: [
      {
        path: '',
        component: BusarInfoDashboardComponent,
        children: [
          { path: 'reciept', component: BusarRecieptWebFormComponent },
          { path: 'expense', component: BusarExpenseWebFormComponent }
        ]
      },
      { path: 'preferences', component: BusarPreferencesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusarRoutingModule {}
