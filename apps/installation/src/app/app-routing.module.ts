import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LiensceKeyComponent,
  SchoolComponent,
  SetupDoneComponent,
  AdminSetupComponent,
  AdminSignupComponent,
  AdminBiodataComponent
} from './components';

// const routes: Routes = [
//   {
//     path: '',
//     component: SetupDoneComponent
//   }
// ];
const routes: Routes = [
  {
    path: '',
    component: LiensceKeyComponent
  },
  {
    path: 'school/:id',
    component: SchoolComponent
  },
  {
    path: 'admin/:id',
    component: AdminSetupComponent
  },
  {
    path: 'signup/:id',
    component: AdminSignupComponent
  },
  {
    path: 'biodata/:authId',
    component: AdminBiodataComponent
  },
  {
    path: 'finished',
    component: SetupDoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
