import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderMenuComponent } from './components/order-menu/order-menu.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import {MatDialogModule} from '@angular/material/dialog';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { GeralDialogComponent } from './components/geral-dialog/geral-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const MODULES = [
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    CreateAccountComponent,
    NavBarComponent,
    MainHomeComponent,
    ProfileComponent,
    OrderMenuComponent,
    MyOrdersComponent,
    OrderDialogComponent,
    GeralDialogComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MODULES,
  ],
  exports: [MODULES, LoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
