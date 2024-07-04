import { Component, OnInit, inject } from '@angular/core';
import {
  PaymentOrder,
  PaymentOrderService,
} from '../../services/payment-order.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-payment-orders',
  standalone: true,
  imports: [ToastModule, TableModule, ButtonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './payment-orders.component.html',
  styleUrl: './payment-orders.component.css',
})
export class PaymentOrdersComponent implements OnInit {
  paymentOrders: PaymentOrder[] = [];
  sortField: string = '';
  sortOrder: number = 1;

  paymentOrderService = inject(PaymentOrderService);
  messageService = inject(MessageService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadPaymentOrders();
  }

  loadPaymentOrders(): void {
    this.paymentOrderService.getPaymentOrders().subscribe({
      next: (orders) => {
        this.paymentOrders = orders;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load payment orders',
        });
      },
    });
  }

  applyGlobalFilter(event: Event, dt: any): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      dt.filterGlobal(input.value, 'contains');
    }
  }

  applyColumnFilter(event: Event, field: string, dt: any): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      dt.filter(input.value, field, 'contains');
    }
  }

  viewDetails(order: PaymentOrder): void {
    this.router.navigate(['/payment-orders', order.id]);
  }
}
