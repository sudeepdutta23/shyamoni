import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStepsComponent } from './shipping-steps.component';

describe('ShippingStepsComponent', () => {
  let component: ShippingStepsComponent;
  let fixture: ComponentFixture<ShippingStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
