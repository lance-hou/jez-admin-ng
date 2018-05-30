import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NavLayoutComponent} from './components/nav-layout/nav-layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SecurityGuard} from './modules/system/security/security-guard.service';
import {SecurityService} from './modules/system/security/security.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import {SECURITY_OPTIONS} from './modules/system/security/security-options';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent
  },
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
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      },
      {
        path: 'system',
        loadChildren: './modules/system/system.module#SystemModule'
      }
    ]
  }
];

const securityOptions = {
  loginUrl: '/login',
  notFoundUrl: '/not-found',
  forbiddenUrl: '/forbidden',
  navigateErrorUrl: '/error'
};

function SecurityOptionsFactory() {
  return securityOptions;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    SecurityService,
    SecurityGuard,
    {
      provide: SECURITY_OPTIONS,
      useFactory: SecurityOptionsFactory
    }
  ]
})
export class AppRoutingModule {
}
