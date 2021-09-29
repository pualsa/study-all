import { TestBed } from '@angular/core/testing';

import { PlanworkdayService } from './planworkday.service';

describe('PlanworkdayService', () => {
  let service: PlanworkdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanworkdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
