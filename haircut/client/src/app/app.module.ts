import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SHARED_SERVICES } from './shared/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkdayComponent } from './workplan/workday/workday.component';
import { WorkdayHeaderComponent } from './workplan/workday-header/workday-header.component';

@NgModule({
  declarations: [AppComponent, WorkdayComponent, WorkdayHeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [...SHARED_SERVICES],
  bootstrap: [AppComponent],
})
export class AppModule {}
