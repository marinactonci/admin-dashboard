import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import {
  PaymentOrder,
  PaymentOrderService,
} from '../../services/payment-order.service';
import { User, UserService } from '../../services/user.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ChartModule, CardModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  paymentOrders: PaymentOrder[] = [];
  users: User[] = [];

  transactionChartData: any;
  transactionChartOptions: any;

  usersChartData: any;
  usersChartOptions: any;

  paymentStatusChartData: any;
  paymentStatusChartOptions: any;

  constructor(
    private paymentOrderService: PaymentOrderService,
    private userService: UserService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchPaymentOrders();
    this.fetchUsers();
  }

  fetchPaymentOrders(): void {
    this.paymentOrderService.getPaymentOrders().subscribe((paymentOrders) => {
      this.paymentOrders = paymentOrders;
      this.initTransactionChart();
      this.initPaymentStatusChart();
    });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.initUserChart();
    });
  }

  initTransactionChart(): void {
    const successfulTransactions = this.paymentOrders.filter(
      (order) => order.status === 'Successful'
    );
    const dailyCount = this.getLast30DaysData(
      successfulTransactions.map((order) => new Date(order.paidOn!))
    );

    this.transactionChartData = {
      labels: dailyCount.labels,
      datasets: [
        {
          label: 'Successful Transactions',
          data: dailyCount.counts,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        },
      ],
    };

    this.transactionChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  initUserChart(): void {
    const dailyCount = this.getLast30DaysData(
      this.users.map((user) => new Date(user.createdOn))
    );

    this.usersChartData = {
      labels: dailyCount.labels,
      datasets: [
        {
          label: 'New Users',
          data: dailyCount.counts,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 1,
        },
      ],
    };

    this.usersChartOptions = {
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  }

  initPaymentStatusChart(): void {
    const statusCounts = {
      Successful: 0,
      Unsuccessful: 0,
      Created: 0,
    };

    this.paymentOrders.forEach((order) => {
      statusCounts[order.status]++;
    });

    this.paymentStatusChartData = {
      labels: ['Successful', 'Unsuccessful', 'Created'],
      datasets: [
        {
          label: 'Payment Status',
          data: [
            statusCounts.Successful,
            statusCounts.Unsuccessful,
            statusCounts.Created,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.paymentStatusChartOptions = {
      maintainRatio: true,
      ratio: 0.6,
      responsive: true,
    };
  }

  getLast30DaysData(dates: Date[]): { labels: string[]; counts: number[] } {
    const counts: { [key: string]: number } = {};
    const labels: string[] = [];
    const countsArray: number[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      labels.push(dateString);
      counts[dateString] = 0;
    }

    dates.forEach((date) => {
      const dateString = date.toISOString().split('T')[0];
      if (counts[dateString] !== undefined) {
        counts[dateString]++;
      }
    });

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      countsArray.push(counts[dateString]);
    }

    return { labels, counts: countsArray };
  }
}
