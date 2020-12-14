import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from "@angular/flex-layout";

import { Product, ProductService } from "../shared/services";

@Component({
  selector: 'nga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly columns$: Observable<number>;
  readonly products$: Observable<Product[]>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
  ]);

  constructor(private mediaObserver: MediaObserver, private productService: ProductService) {
    this.products$ = this.productService.getAll();

    this.columns$ = this.mediaObserver.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc[0].mqAlias))
      );
  }

  ngOnInit(): void {
  }
}
