import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSignupComponent } from '@dilta/auth-module';


const routes: Routes = [
  { path: '', component: AdminSignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class DreamstackRoutingModule { }

export const routedComponents = [AdminSignupComponent];
