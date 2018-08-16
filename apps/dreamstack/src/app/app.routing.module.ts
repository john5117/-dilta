import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserLoginComponent } from '@dilta/auth-module';

const routes: Routes = [
  { path: '', redirectTo: 'busar', pathMatch: 'full' },
  { path: 'login', component: AuthUserLoginComponent }
  // { path: 'busar', component: BusarAppModule.RootComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class DreamstackRoutingModule {}

export const routedComponents = [AuthUserLoginComponent];
