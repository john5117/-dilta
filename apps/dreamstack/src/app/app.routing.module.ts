import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'libs/auth-module/src/lib/webcomponents/pages/auth.module#AuthPagesModule' }
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
