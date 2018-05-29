import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavLayoutComponent} from './nav-layout/nav-layout.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatSidenavModule} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {NgMaterialMultilevelMenuModule} from 'ng-material-multilevel-menu';

@NgModule({
  declarations: [
    AppComponent,
    NavLayoutComponent,
    LoginComponent,
    DashboardComponent
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
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 1500, verticalPosition: 'top'}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
