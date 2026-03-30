import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InitialDashboardPayload } from '../../models/component-models/dashboard/initial-dashboard-payload';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard-service';

import { OrdersOverTimeChart } from './charts/orders-over-time-chart/orders-over-time-chart';
import { MatCalendar } from "@angular/material/datepicker";
@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, OrdersOverTimeChart, MatCalendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  initialDashboardData!: InitialDashboardPayload;

  toastr = inject(ToastrService);
  dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.getInitialDashboardData();
  }

  getInitialDashboardData(){
    this.dashboardService.getInitialDashboardData().subscribe({
      next : (res) => {
        if(res.statusCode === 200){
          this.initialDashboardData = res.data;
          console.log(this.initialDashboardData);
        } else {
          this.toastr.error(res.message);
        }
      },
        error: (err) =>{
          this.toastr.error('Something went wrong ' + err);
        }
    }
  )
  }

}
