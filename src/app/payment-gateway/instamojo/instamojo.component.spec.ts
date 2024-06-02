import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstamojoComponent } from './instamojo.component';

describe('InstamojoComponent', () => {
  let component: InstamojoComponent;
  let fixture: ComponentFixture<InstamojoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstamojoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstamojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
