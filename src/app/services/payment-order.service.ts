import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side or network error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getPaymentOrders(): Observable<PaymentOrder[]> {
    return this.http.get<PaymentOrder[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPaymentOrderById(id: string): Observable<PaymentOrder> {
    return this.http.get<PaymentOrder>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
