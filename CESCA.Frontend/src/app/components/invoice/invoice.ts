import { Component, inject, OnInit } from '@angular/core';
import { InvoiceSearchParameter } from '../../models/search-parameter';
import { InvoiceModel } from '../../models/component-models/invoice/invoice-model';
import { MetadataModel } from '../../models/component-models/metadata-model';
import { FormsModule } from "@angular/forms";
import { OrderService } from '../../services/order-service';
import { Toast, ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { NormalizeDatePipePipe } from '../../pipe/normalize-date-pipe-pipe';

// angular  material
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-invoice',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, NormalizeDatePipePipe],
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

  //search params
  searchParams: InvoiceSearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    startDate: null,
    endDate: null
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


}

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
