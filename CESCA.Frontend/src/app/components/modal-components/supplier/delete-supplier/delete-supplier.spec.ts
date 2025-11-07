import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSupplier } from './delete-supplier';

describe('DeleteSupplier', () => {
  let component: DeleteSupplier;
  let fixture: ComponentFixture<DeleteSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
