import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceOrderItems } from './invoice-order-items';

describe('InvoiceOrderItems', () => {
  let component: InvoiceOrderItems;
  let fixture: ComponentFixture<InvoiceOrderItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceOrderItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceOrderItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
