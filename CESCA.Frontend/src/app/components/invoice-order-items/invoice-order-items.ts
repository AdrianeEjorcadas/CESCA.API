import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order-service';
import { InvoiceOrderDetailsModel } from '../../models/component-models/invoice/invoice-order-details';
import { MatTableModule } from '@angular/material/table';
import { ReturnResponse } from '../../models/return-response';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-order-items',
  imports: [MatTableModule, CurrencyPipe,],
  templateUrl: './invoice-order-items.html',
  styleUrl: './invoice-order-items.css'
})
export class InvoiceOrderItems implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private orderService = inject(OrderService);

  protected invoiceNumber?: string;
  protected invoiceDetails: InvoiceOrderDetailsModel[] = [];

  dataSource = this.invoiceDetails;
  displayedColumns: string[] = ['productName', 'quantity', 'price', 'total'];


  ngOnInit(): void {
    // this.invoiceNumber = this.route.snapshot.paramMap.get('id')!;
    const state = this.location.getState() as {invoiceNumber?: string}
    this.invoiceNumber = state.invoiceNumber;
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.orderService.getOrdersByInvoiceNumber$(this.invoiceNumber!).subscribe({
      next: (res) => {
        if(res.statusCode === 200 ){
          this.dataSource = res.data.map((item: InvoiceOrderDetailsModel) => mapToInvoiceOrderDetails(item));
          console.log(this.dataSource);     
         }
      },
      error: (err) => {
        console.log(err);
      } 
    });
  }

  downloadInvoice(){
    this.orderService.downloadInvoice(this.invoiceNumber!)
    .subscribe((blob: Blob)=> {
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = `Invoice_${this.invoiceNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(fileUrl);
    });
  }

}

function mapToInvoiceOrderDetails(src: InvoiceOrderDetailsModel): InvoiceOrderDetailsModel{
  return {
    productId: src.productId,
    productName: src.productName,
    quantity: src.quantity,
    price: src.price,
    total: src.total
  }
}