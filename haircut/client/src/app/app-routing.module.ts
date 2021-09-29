import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkdayHeaderComponent } from "./workplan/workday-header/workday-header.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'workdays' },
  { path: 'workdays', component: WorkdayHeaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
