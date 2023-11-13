import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { authGuard } from './account/shared/auth.guard';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderMenuComponent } from './components/order-menu/order-menu.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home' , pathMatch: 'full'},
      { path: 'home', component: MainHomeComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'order-menu', component: OrderMenuComponent},
      { path: 'my-orders', component: MyOrdersComponent},
    ]
    
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login' , pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
