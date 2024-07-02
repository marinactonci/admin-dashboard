import { Component } from '@angular/core';
import { StatisticsComponent } from '../../components/statistics/statistics.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StatisticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
