import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerAddComponent } from './home-banner-add.component';

describe('HomeBannerAddComponent', () => {
  let component: HomeBannerAddComponent;
  let fixture: ComponentFixture<HomeBannerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBannerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
