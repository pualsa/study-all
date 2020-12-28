import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, switchMap } from 'rxjs/operators';
import { Product, ProductService } from "../shared/services/product.service";

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId$: Observable<number>;
  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    // TODO create a resolve guard, notify with MatSnackBar

    this.productId$ = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('productId') || '', 10))
      );

    this.product$ = this.productId$
      .pipe(
        filter(id => !!id),
        switchMap(id => this.productService.getById(id))
      );

    // filter out the selected product
    this.suggestedProducts$ = this.productId$
      .pipe(
        filter(id => !!id),
        switchMap(id => this.productService.getAll()
          .pipe(
            map(prods => prods.filter(prod => prod.id != id))
          )
        )
      );
  }

  ngOnInit(): void {
  }

}
