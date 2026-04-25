import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { CarListComponent } from './features/customer/car-list/car-list.component';
import { ShowCarComponent } from './features/customer/show-car/show-car.component';
import { OrderListComponent } from './features/customer/order-list/order-list.component';
import { ShowOrderComponent } from './features/customer/show-order/show-order.component';
import { CreateOrderComponent } from './features/customer/create-order/create-order.component';
import { InstallmentListComponent } from './features/customer/installment-list/installment-list.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { ShowUserComponent } from './features/admin/show-user/show-user.component';
import { AdminCarListComponent } from './features/admin/admin-car-list/admin-car-list.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'cars', pathMatch: 'full' },
      { path: 'cars', component: CarListComponent },
      { path: 'cars/:id', component: ShowCarComponent },
      { path: 'cars/:id/order', component: CreateOrderComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: ShowOrderComponent },
      { path: 'installments', component: InstallmentListComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: ShowUserComponent },
      { path: 'cars', component: AdminCarListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
