import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user/profile/id', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'libs/auth-module/src/lib/webcomponents/pages/auth.module#AuthPagesModule' },
  { path: 'user', loadChildren: 'libs/dream-users/src/lib/pages/web/dream-users.module#DreamUsersModule' }
  // { path: '', component: AppComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class DreamstackRoutingModule {}

export const routedComponents = [];
