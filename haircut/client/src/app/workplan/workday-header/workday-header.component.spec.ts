import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SHARED_SERVICES } from '../../shared/services';
import { WorkdayComponent } from '../workday/workday.component';
import { WorkdayHeaderComponent } from './workday-header.component';

describe('WorkdayHeaderComponent', () => {
  let component: WorkdayHeaderComponent;
  let fixture: ComponentFixture<WorkdayHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [WorkdayHeaderComponent, WorkdayComponent],
      providers: [...SHARED_SERVICES],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
