import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOverTimeChart } from './orders-over-time-chart';

describe('OrdersOverTimeChart', () => {
  let component: OrdersOverTimeChart;
  let fixture: ComponentFixture<OrdersOverTimeChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOverTimeChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersOverTimeChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
