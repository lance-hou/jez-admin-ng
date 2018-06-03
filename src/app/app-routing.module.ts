import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {NavLayoutComponent} from './core/nav-layout/nav-layout.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {SecurityGuard} from './core/security/security-guard.service';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ForbiddenComponent} from './core/forbidden/forbidden.component';
import {SECURITY_OPTIONS} from './core/security/security-options';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavLayoutComponent,
    canActivate: [SecurityGuard],
    canActivateChild: [SecurityGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

const securityOptions = {
  rootUrl: '/',
  loginUrl: '/login',
  notFoundUrl: '/not-found',
  forbiddenUrl: '/forbidden'
};

export function SecurityOptionsFactory() {
  return securityOptions;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    SecurityGuard,
    {
      provide: SECURITY_OPTIONS,
      useFactory: SecurityOptionsFactory
    }
  ]
})
export class AppRoutingModule {
}
