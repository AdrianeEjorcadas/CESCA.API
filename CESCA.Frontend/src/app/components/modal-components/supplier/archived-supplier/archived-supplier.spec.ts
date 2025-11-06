import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedSupplier } from './archived-supplier';

describe('ArchivedSupplier', () => {
  let component: ArchivedSupplier;
  let fixture: ComponentFixture<ArchivedSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedSupplier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
