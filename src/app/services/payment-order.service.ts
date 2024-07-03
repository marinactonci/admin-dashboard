import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PaymentOrder {
  id: string;
  paymentReference: string;
  title: string;
  description: string;
  status: 'Created' | 'Successful' | 'Unsuccessful';
  amount: number;
  currency: string;
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
  };
  createdOn: Date;
  paidOn?: Date;
  authorizationCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderService {
  private apiUrl = 'http://localhost:3000/paymentOrders';

  http = inject(HttpClient);

  getPaymentOrders(): Observable<PaymentOrder[]> {
    return this.http.get<PaymentOrder[]>(this.apiUrl);
  }

  getPaymentOrderById(id: string): Observable<PaymentOrder> {
    return this.http.get<PaymentOrder>(`${this.apiUrl}/${id}`);
  }

  createPaymentOrder(paymentOrder: PaymentOrder): Observable<PaymentOrder> {
    return this.http.post<PaymentOrder>(this.apiUrl, paymentOrder);
  }

  updatePaymentOrder(
    id: string,
    paymentOrder: PaymentOrder
  ): Observable<PaymentOrder> {
    return this.http.put<PaymentOrder>(`${this.apiUrl}/${id}`, paymentOrder);
  }

  deletePaymentOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
