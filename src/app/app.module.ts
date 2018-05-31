import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavLayoutComponent} from './components/nav-layout/nav-layout.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatSidenavModule} from '@angular/material';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from './modules/shared/shared.module';
import {NgMaterialMultilevelMenuModule} from 'ng-material-multilevel-menu';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import {HandleErrorInterceptor} from './http/handle-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavLayoutComponent,
    NavMenuComponent,
    DashboardComponent,
    NotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    NgMaterialMultilevelMenuModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 1500, verticalPosition: 'top'}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
