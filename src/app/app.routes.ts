import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentOrdersComponent } from './pages/payment-orders/payment-orders.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PaymentOrderDetailsComponent } from './pages/payment-order-details/payment-order-details.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/errors/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './pages/errors/forbidden/forbidden.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'payment-orders',
    component: PaymentOrdersComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'payment-orders/:id',
    component: PaymentOrderDetailsComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  { path: '401', component: UnauthorizedComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
