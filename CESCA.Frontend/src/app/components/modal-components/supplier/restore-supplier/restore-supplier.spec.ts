import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreSupplier } from './restore-supplier';

describe('RestoreSupplier', () => {
  let component: RestoreSupplier;
  let fixture: ComponentFixture<RestoreSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreSupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
