import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQuantity } from './order-quantity';

describe('OrderQuantity', () => {
  let component: OrderQuantity;
  let fixture: ComponentFixture<OrderQuantity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderQuantity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderQuantity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
