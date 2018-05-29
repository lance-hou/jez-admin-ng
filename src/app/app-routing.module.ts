import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SecurityGuard} from './system/security/security-guard.service';
import {SecurityService} from './system/security/security.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [SecurityGuard],
    component: NavLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityService, SecurityGuard]
})
export class AppRoutingModule {
}
