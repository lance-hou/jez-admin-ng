import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {ForbiddenComponent} from './core/forbidden/forbidden.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ExampleTableComponent} from './core/example-table/example-table.component';
import {LoginComponent} from './core/login/login.component';
import {NavLayoutComponent} from './core/nav-layout/nav-layout.component';
import {NavMenuComponent} from './core/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavLayoutComponent,
    NavMenuComponent,
    DashboardComponent,
    NotFoundComponent,
    ForbiddenComponent,
    ExampleTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
