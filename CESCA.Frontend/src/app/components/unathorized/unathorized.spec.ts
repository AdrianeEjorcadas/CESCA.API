import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unathorized } from './unathorized';

describe('Unathorized', () => {
  let component: Unathorized;
  let fixture: ComponentFixture<Unathorized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unathorized]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unathorized);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
