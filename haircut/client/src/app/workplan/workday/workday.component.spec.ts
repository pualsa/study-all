import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHARED_SERVICES } from '../../shared/services';
import { PlanworkdayService } from '../../shared/services/planworkday.service';
import { WorkdayComponent } from './workday.component';

describe('WorkdayComponent', () => {
  let component: WorkdayComponent;
  let fixture: ComponentFixture<WorkdayComponent>;
  const testDay = new Date(2024, 0, 15);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [WorkdayComponent],
      providers: [...SHARED_SERVICES],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have enableHours false by default', () => {
    expect(component.enableHours).toBe(false);
  });

  describe('when a day is assigned', () => {
    beforeEach(() => {
      component.day = testDay;
      fixture.detectChanges();
      fixture.detectChanges();
    });

    it('should render a row for each hour slot', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(22);
    });

    it('should have all slots unselected', () => {
      let result: any;
      component.workday$!.subscribe(wd => (result = wd));
      expect(result.hours.every((h: boolean) => !h)).toBe(true);
    });

    it('should have all slot checkboxes disabled', () => {
      const checkboxes: HTMLInputElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('tbody input[type="checkbox"]'),
      );
      expect(checkboxes.every(cb => cb.disabled)).toBe(true);
    });

    describe('when the day checkbox is checked', () => {
      beforeEach(() => {
        component.dayClicked({ target: { checked: true } });
        fixture.detectChanges();
        fixture.detectChanges();
      });

      it('should set enableHours to true', () => {
        expect(component.enableHours).toBe(true);
      });

      it('should select all hour slots', () => {
        let result: any;
        component.workday$!.subscribe(wd => (result = wd));
        expect(result.hours.every((h: boolean) => h)).toBe(true);
      });

      it('should enable all slot checkboxes', () => {
        const checkboxes: HTMLInputElement[] = Array.from(
          fixture.nativeElement.querySelectorAll('tbody input[type="checkbox"]'),
        );
        expect(checkboxes.every(cb => !cb.disabled)).toBe(true);
      });

      it('should call onSlotClicked with toggled value when a row is clicked', () => {
        const spy = vi.spyOn(component, 'onSlotClicked');
        const row = fixture.nativeElement.querySelectorAll('tbody tr')[3] as HTMLElement;
        row.click();
        expect(spy).toHaveBeenCalledWith(3, false);
      });

      it('should call onSlotClicked with checkbox value when a slot checkbox changes', () => {
        const spy = vi.spyOn(component, 'onSlotClicked');
        const checkbox = fixture.nativeElement.querySelectorAll(
          'tbody input[type="checkbox"]',
        )[2] as HTMLInputElement;
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith(2, false);
      });

      it('should deselect all slots when day checkbox is unchecked', () => {
        component.dayClicked({ target: { checked: false } });
        let result: any;
        component.workday$!.subscribe(wd => (result = wd));
        expect(result.hours.every((h: boolean) => !h)).toBe(true);
        expect(component.enableHours).toBe(false);
      });
    });

    it('should persist slot selection via saveWorkingSlot', () => {
      const service = TestBed.inject(PlanworkdayService);
      const spy = vi.spyOn(service, 'saveWorkingSlot');
      component.onSlotClicked(3, true);
      expect(spy).toHaveBeenCalledWith(testDay, 3, true);
    });
  });
});
