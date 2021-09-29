import { Component, HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}

@Component({
  selector: 'hc-workday-header',
  templateUrl: './workday-header.component.html',
  styleUrls: ['./workday-header.component.css'],
})
export class WorkdayHeaderComponent {
  selectedDay: Date;

  constructor() {
    this.selectedDay = new Date();
    this.selectedDay.setHours(0, 0, 0, 0);
  }

  selectDay(offset: number): void {
    let day = new Date(this.selectedDay);
    day.setDate(day.getDate() + offset);
    this.selectedDay = day;
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.selectDay(-1);
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.selectDay(1);
    }
  }
}
