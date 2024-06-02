import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelpolicyComponent } from './cancelpolicy.component';

describe('CancelpolicyComponent', () => {
  let component: CancelpolicyComponent;
  let fixture: ComponentFixture<CancelpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
