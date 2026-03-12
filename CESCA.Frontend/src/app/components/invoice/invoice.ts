import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InvoiceSearchParameter } from '../../models/search-parameter';
import { InvoiceModel } from '../../models/component-models/invoice/invoice-model';
import { MetadataModel } from '../../models/component-models/metadata-model';
import { FormsModule } from "@angular/forms";
import { OrderService } from '../../services/order-service';
import { Toast, ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { NormalizeDatePipePipe } from '../../pipe/normalize-date-pipe-pipe';
import { DatePipe } from '@angular/common';

// angular  material
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-invoice',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, NormalizeDatePipePipe, DatePipe, MatPaginator, MatIcon],
  providers: [provideNativeDateAdapter()],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class Invoice implements OnInit{

  private orderService = inject(OrderService);
  private toastr = inject(ToastrService);

  // set maximum 
  readonly maxDate = new Date(Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ));

  // table model
  invoiceTableModel :InvoiceModel[] = [];

  //datepicker filter
  startDate: Date | null = null;
  endDate: Date | null = null;

  //paginator
  paginatorMetadata : MetadataModel | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  //search params
  searchParams: InvoiceSearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    orderFrom: null,
    orderTo: null
  };

  // table dataSource
  dataSource = this.invoiceTableModel;
  // columns
  displayedColumns: string[] = ['invoiceNumber', 'orderDate', 'orderAmount', 'discountApplied', 'finalAmount', 'status', 'processBy'];

  ngOnInit(): void {
    this.getInvoiceList();
  }

  getInvoiceList(){
    this.orderService.getOrders$(this.searchParams).subscribe({
      next: (res) => {
        this.paginatorMetadata = res.data.metaData;
        // console.log(res);
        this.dataSource = res.data.orders.map(mapToInvoice);
        console.log(this.dataSource);
      }, 
      error: (err) => {
        this.toastr.error(`error: ${err.message}`);
      }
    });
  }

 search() {
  if (this.startDate && this.endDate) {
    // normalize to start of day (00:00:00)
    const orderFrom = new Date(this.startDate);
    orderFrom.setHours(0, 0, 0, 0);

    // normalize to end of day (23:59:59.999)
    const orderTo = new Date(this.endDate);
    orderTo.setHours(23, 59, 59, 999);

    this.searchParams.orderFrom = orderFrom;
    this.searchParams.orderTo   = orderTo;
  } else {
    this.searchParams.orderFrom = null;
    this.searchParams.orderTo   = null;
  }

  this.getInvoiceList();
}


  resetPaginator(){
    this.paginatorMetadata = null;
  }

  onPageChange(event: PageEvent){
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.getInvoiceList();
  }

}


//Function
function mapToInvoice(src: any) : InvoiceModel{
  return{
    invoiceNumber: src.invoiceNumber,
    orderDate: src.orderDate ? new Date(src.orderDate) : new Date(),
    orderAmount: src.orderAmount,
    discountApplied: src.discountApplied,
    finalAmount: src.finalAmount,
    status: src.status,
    processBy: src.processBy
  }
}
