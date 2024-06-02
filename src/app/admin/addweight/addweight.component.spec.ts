import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddweightComponent } from './addweight.component';

describe('AddweightComponent', () => {
  let component: AddweightComponent;
  let fixture: ComponentFixture<AddweightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddweightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
