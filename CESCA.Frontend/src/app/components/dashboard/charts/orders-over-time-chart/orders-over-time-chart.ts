import { Component, inject, OnInit } from '@angular/core';

import { BaseChartDirective} from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData, Chart } from 'chart.js';
import { DashboardService } from '../../../../services/dashboard-service';
import { DailySaleAndRevenuePayload } from '../../../../models/component-models/dashboard/daily-sale-and-revenue-payload';
import { getDaysInMonth } from '../../../../funtions/getDaysInMonth';

@Component({
  selector: 'app-orders-over-time-chart',
  imports: [BaseChartDirective],
  templateUrl: './orders-over-time-chart.html',
  styleUrl: './orders-over-time-chart.css'
})
export class OrdersOverTimeChart implements OnInit {

  private dashboardService = inject(DashboardService);
  
  //#region  sales line chart
  salesLineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  salesLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Sales Trend'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days'
        }
      },
      y: {
        title: {
          display: true,
          text: 'No of Sales'
        },
        beginAtZero: true
      }
    }
  }
  //#endregion sales line chart

  
  revenuLineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

   revenueLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Revenue Trend'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Revenue'
        },
        beginAtZero: true
      }
    }
  }

  ngOnInit(): void {
    this.getDailySaleAndRevTrend(new Date());
  }

  getDailySaleAndRevTrend(date: Date){
    this.dashboardService.getDailySaleAndRevTrend$(date).subscribe({
      next: (res) => {
        if(res.statusCode === 200){
          this.getSalesData(res.data);
          this.getRevenueData(res.data);
          console.log(res.data);
        } 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSalesData(data: DailySaleAndRevenuePayload[]){
    const targetDate = new Date(data[0]?.transactionDate ?? new Date());
    const labels = getDaysInMonth(targetDate.getFullYear(), targetDate.getMonth());

    this.salesLineChartData = {
      labels,
      datasets: [
        {
          label: 'Sales',
          data:labels.map(label => {
            const match = data.find(d =>
              new Date(d.transactionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label
            );
            return match ? match.sales : 0; // fill missing days with 0
          }),
            borderColor: '#0ad143',                  // softer blue
            backgroundColor: 'rgba(10, 209, 67,0.5)', // light fill under line
            fill: false,                              // enable area fill
            tension: 0.4,                            // smoother curve
            pointRadius: 5,                          // slightly larger points
            pointHoverRadius: 7,                     // highlight on hover
            pointBackgroundColor: '#0ad143',         // consistent point color
            pointBorderColor: '#fff',                // white border for contrast
          },
      ]
    };
  }

  getRevenueData(data: DailySaleAndRevenuePayload[]){
    const targetDate = new Date(data[0]?.transactionDate ?? new Date());
    const labels = getDaysInMonth(targetDate.getFullYear(), targetDate.getMonth());

    this.revenuLineChartData = {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data:labels.map(label => {
            const match = data.find(d =>
              new Date(d.transactionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label
            );
            return match ? match.revenue : 0; // fill missing days with 0
          }),
            borderColor: '#6723ba',                  // softer blue
            backgroundColor: 'rgba(103, 35, 186,0.5)', // light fill under line
            fill: false,                              // enable area fill
            tension: 0.4,                            // smoother curve
            pointRadius: 5,                          // slightly larger points
            pointHoverRadius: 7,                     // highlight on hover
            pointBackgroundColor: '#6723ba',         // consistent point color
            pointBorderColor: '#fff',                // white border for contrast
          },
      ]
    };
  }
}