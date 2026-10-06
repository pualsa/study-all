import { TestBed } from '@angular/core/testing';

import { SHARED_SERVICES } from '.';
import { PlanworkdayService } from './planworkday.service';

const SLOT_COUNT = 22; // (19 - 8) * 2

describe('PlanworkdayService', () => {
  let service: PlanworkdayService;
  const testDay = new Date(2024, 0, 15);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [...SHARED_SERVICES] });
    service = TestBed.inject(PlanworkdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWorkday returns a workday with all slots unselected by default', () => {
    let result: any;
    service.getWorkday(testDay).subscribe(wd => (result = wd));
    expect(result.hours.length).toBe(SLOT_COUNT);
    expect(result.hours.every((h: boolean) => !h)).toBe(true);
  });

  it('saveWorkday with true selects all slots', () => {
    let result: any;
    service.saveWorkday(testDay, true).subscribe(wd => (result = wd));
    expect(result.hours.every((h: boolean) => h)).toBe(true);
  });

  it('saveWorkday with false deselects all slots', () => {
    let result: any;
    service.saveWorkday(testDay, true).subscribe();
    service.saveWorkday(testDay, false).subscribe(wd => (result = wd));
    expect(result.hours.every((h: boolean) => !h)).toBe(true);
  });

  it('saveWorkingSlot selects a specific slot and leaves others unchanged', () => {
    let result: any;
    service.saveWorkingSlot(testDay, 5, true).subscribe(wd => (result = wd));
    expect(result.hours[5]).toBe(true);
    expect(result.hours[0]).toBe(false);
  });

  it('saveWorkingSlot deselects a specific slot and leaves others unchanged', () => {
    let result: any;
    service.saveWorkday(testDay, true).subscribe();
    service.saveWorkingSlot(testDay, 5, false).subscribe(wd => (result = wd));
    expect(result.hours[5]).toBe(false);
    expect(result.hours[0]).toBe(true);
  });

  it('persists slot state across getWorkday calls', () => {
    let result: any;
    service.saveWorkingSlot(testDay, 3, true).subscribe();
    service.getWorkday(testDay).subscribe(wd => (result = wd));
    expect(result.hours[3]).toBe(true);
  });
});
