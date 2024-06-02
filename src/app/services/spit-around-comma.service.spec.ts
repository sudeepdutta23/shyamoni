import { TestBed } from '@angular/core/testing';

import { SpitAroundCommaService } from './spit-around-comma.service';

describe('SpitAroundCommaService', () => {
  let service: SpitAroundCommaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpitAroundCommaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
