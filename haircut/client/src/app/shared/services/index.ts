import { Provider } from '@angular/core';
import {
  PlanworkdayService,
  StaticPlanworkdayService,
} from './planworkday.service';

export { PlanworkdayService } from './planworkday.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: PlanworkdayService, useClass: StaticPlanworkdayService },
];
