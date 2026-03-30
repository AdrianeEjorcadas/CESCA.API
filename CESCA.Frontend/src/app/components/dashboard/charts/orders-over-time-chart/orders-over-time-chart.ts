import { Component } from '@angular/core';

import { BaseChartDirective} from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-orders-over-time-chart',
  imports: [BaseChartDirective],
  templateUrl: './orders-over-time-chart.html',
  styleUrl: './orders-over-time-chart.css'
})
export class OrdersOverTimeChart {
  chartOptions: ChartOptions<'bar'> = { responsive: true };

  chartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { data: [10, 20, 30, 40], label: 'Orders' },
      { data: [5, 15, 25, 35], label: 'Revenue' }
    ]
  };
}
