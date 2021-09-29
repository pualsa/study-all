import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayHeaderComponent } from './workday-header.component';

describe('WorkdayHeaderComponent', () => {
  let component: WorkdayHeaderComponent;
  let fixture: ComponentFixture<WorkdayHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayHeaderComponent ]
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
