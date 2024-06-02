import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurepaymentComponent } from './securepayment.component';

describe('SecurepaymentComponent', () => {
  let component: SecurepaymentComponent;
  let fixture: ComponentFixture<SecurepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurepaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
