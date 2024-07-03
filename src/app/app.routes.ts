import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentOrdersComponent } from './pages/payment-orders/payment-orders.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PaymentOrderDetailsComponent } from './pages/payment-order-details/payment-order-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'payment-orders', component: PaymentOrdersComponent },
  { path: 'payment-orders/:id', component: PaymentOrderDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
