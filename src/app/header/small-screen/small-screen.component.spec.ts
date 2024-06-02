import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallScreenComponent } from './small-screen.component';

describe('SmallScreenComponent', () => {
  let component: SmallScreenComponent;
  let fixture: ComponentFixture<SmallScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
