import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserLoginComponent } from './admin-login/admin-login.component';
import { AuthUserSignupComponent } from './admin-signup/admin-signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: AuthUserSignupComponent },
  { path: 'login', component: AuthUserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAuthWebRoutingModule { }

export const authRoutedComponents = [AuthUserSignupComponent, AuthUserLoginComponent];
