import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invoice-order-items',
  imports: [],
  templateUrl: './invoice-order-items.html',
  styleUrl: './invoice-order-items.css'
})
export class InvoiceOrderItems implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  protected invoiceNumber?: string;

  ngOnInit(): void {
    // this.invoiceNumber = this.route.snapshot.paramMap.get('id')!;
    const state = this.location.getState() as {invoiceNumber?: string}
    this.invoiceNumber = state.invoiceNumber;
  }
}
  