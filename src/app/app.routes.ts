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

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [
      { path: '', redirectTo: 'cars', pathMatch: 'full' },
      { path: 'cars', component: CarListComponent },
      { path: 'cars/:id', component: ShowCarComponent },
      { path: 'cars/:id/order', component: CreateOrderComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: ShowOrderComponent }
    ]
  }
];
