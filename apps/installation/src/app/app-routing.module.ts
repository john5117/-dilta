import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserSignupComponent } from '@dilta/auth-module';
import { UserBioDataFormPageComponent } from '@dilta/commonwebui';
import { AdminSetupComponent, LiensceKeyComponent, SchoolComponent, SetupDoneComponent } from './components';


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
    component: AuthUserSignupComponent
  },
  {
    path: 'biodata',
    component: UserBioDataFormPageComponent
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
