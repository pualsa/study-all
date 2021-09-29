export class Workday {
  day: Date;
  hours: boolean[]; // 8-18 * 2

  constructor(day: Date, hours: boolean[]) {
    this.day = day;
    this.hours = hours;
  }

  isWorking(): boolean {
    for (let h of this.hours) {
      if (h) {
        return true;
      }
    }
    return false;
  }

  static formatHourIndex(i: number): string {
    let h = i + 8 * 2;
    let s = Math.floor(h / 2) + ':' + (h % 2 ? '30' : '00');
    if (s.length < 5) {
      s = '0' + s;
    }
    return s;
  }

  static getHourIndex(slot: string): number {
    let i = parseInt(slot.substr(0, 2)) * 2;
    if ('30' == slot.substr(3, 2)) {
      i++;
    }
    return i;
  }
}
