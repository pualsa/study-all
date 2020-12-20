import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json');
  }

  getById(id: number) : Observable<Product> {
    return this.http.get<Product[]>('/data/products.json')
    .pipe(
      map(products => <Product>products.find(p => p.id === id) )
    );
  }

  search(params: ProductSearchParams) : Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  // Keep only those product that meet the criteria from search params
  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((<string>params.title).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }
}
