import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { MatGridListModule } from "@angular/material/grid-list";

import { HomeComponent } from './home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductGridComponent } from './product-grid/product-grid.component';

@NgModule({
  declarations: [HomeComponent, SearchResultsComponent, ProductGridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    FlexLayoutModule,
    MatGridListModule
  ]
})
export class HomeModule { }
