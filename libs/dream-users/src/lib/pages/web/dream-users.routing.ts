import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBiodataProfileComponent } from './user-biodata-profile/user-biodata-profile.component';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';

const routes: Routes = [
  { path: 'biodata', component: UserBioDataFormPageComponent },
  { path: 'profile/:id', component: UserBiodataProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DreamUserWebRoutingModule { }

export const routedComponents = [UserBioDataFormPageComponent];
