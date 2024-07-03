import { Component, OnInit, inject } from '@angular/core';
import {
  PaymentOrder,
  PaymentOrderService,
} from '../../services/payment-order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-order-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './payment-order-details.component.html',
  styleUrl: './payment-order-details.component.css',
})
export class PaymentOrderDetailsComponent implements OnInit {
  order: PaymentOrder | null = null;

  route = inject(ActivatedRoute);
  paymentOrderService = inject(PaymentOrderService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.paymentOrderService.getPaymentOrderById(id).subscribe((order) => {
      this.order = order;
    });
  }
}
