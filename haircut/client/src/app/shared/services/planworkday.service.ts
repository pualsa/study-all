import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Workday } from '../../model/workday';

const MAX_HOURS = (19 - 8) * 2;

export abstract class PlanworkdayService {
  abstract getWorkday(day: Date): Observable<Workday>;
  abstract saveWorkingSlot(day: Date, index: number, selected: boolean): Observable<Workday>;
}

@Injectable()
export class StaticPlanworkdayService implements PlanworkdayService {
  private readonly dayMap = new Map();

  constructor() {}

  getWorkday(day: Date): Observable<Workday> {
    let wd = this.prepareDay(day);
    let copy = new Workday(day, Object.assign([], wd.hours));
    return of(copy);
  }

  saveWorkingSlot(day: Date, index: number, selected: boolean): Observable<Workday> {
    let wd = this.prepareDay(day);
    wd.hours[index] = selected;
    console.log("saved " + JSON.stringify(wd));
    let copy = new Workday(day, Object.assign([], wd.hours));
    return of(copy);
  }

  private prepareDay(d: Date): Workday {
    let wd = this.dayMap.get(d.toLocaleDateString());
    if (wd == null) {
      let hours = new Array(MAX_HOURS).fill(true);
      wd = new Workday(d, hours);
      this.dayMap.set(d.toLocaleDateString(), wd);
    }
    return wd;
  }
}
