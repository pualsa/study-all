import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workday } from './workday';

describe('Workday', () => {
  it('formatHourIndex', () => {
    expect(Workday.formatHourIndex(3)).toBe('09:30');
  });

  it('getHourIndex', () => {
    expect(Workday.getHourIndex('09:30')).toBe(3);
  });
});
