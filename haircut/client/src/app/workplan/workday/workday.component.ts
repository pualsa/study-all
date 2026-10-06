import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Workday } from '../../model/workday';
import { PlanworkdayService } from '../../shared/services/planworkday.service';

@Component({
  selector: 'hc-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.css'],
  standalone: false,
})
export class WorkdayComponent {
  private _day: Date;

  workday$?: Observable<Workday>;
  enableHours: boolean;

  constructor(private planworkdayService: PlanworkdayService) {
    this._day = new Date();
    this.enableHours = false;
  }

  @Input() set day(value: Date) {
    if (value !== undefined) {
      this._day = value;
      this.enableHours = false;
      this.workday$ = this.planworkdayService.getWorkday(this._day);
    }
  }

  get day(): Date {
    return this._day;
  }

  formatHourIndex(i: number): string {
    return Workday.formatHourIndex(i);
  }

  dayClicked({ target }: any): void {
    this.enableHours = target.checked;
    this.workday$ = this.planworkdayService.saveWorkday(this._day, target.checked);
  }

  onSlotClicked(index: number, checked: boolean) {
    this.workday$ = this.planworkdayService.saveWorkingSlot(
      this._day,
      index,
      checked,
    );
  }
}
