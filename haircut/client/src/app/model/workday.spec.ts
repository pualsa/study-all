import { Workday } from './workday';

describe('Workday', () => {
  describe('formatHourIndex', () => {
    it('formats first slot as 08:00', () => {
      expect(Workday.formatHourIndex(0)).toBe('08:00');
    });

    it('formats slot 3 as 09:30', () => {
      expect(Workday.formatHourIndex(3)).toBe('09:30');
    });
  });

  describe('getHourIndex', () => {
    it('returns 0 for 08:00', () => {
      expect(Workday.getHourIndex('08:00')).toBe(0);
    });

    it('returns 3 for 09:30', () => {
      expect(Workday.getHourIndex('09:30')).toBe(3);
    });
  });

  it('formatHourIndex and getHourIndex are inverses of each other', () => {
    for (let i = 0; i < 22; i++) {
      expect(Workday.getHourIndex(Workday.formatHourIndex(i))).toBe(i);
    }
  });

  describe('isWorking', () => {
    it('returns false when all slots are unselected', () => {
      const wd = new Workday(new Date(), new Array(22).fill(false));
      expect(wd.isWorking()).toBe(false);
    });

    it('returns true when at least one slot is selected', () => {
      const hours = new Array(22).fill(false);
      hours[5] = true;
      expect(new Workday(new Date(), hours).isWorking()).toBe(true);
    });
  });
});
