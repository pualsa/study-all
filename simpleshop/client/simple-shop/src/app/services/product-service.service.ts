import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class Product {
  [key: string]: any; // To make compatible with HttpParams type. 
  id?: number;
  title: string;
  price: number;
  description?: string;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  url = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {}

  createProduct(product: Product): Observable<number> {
    console.log('createProduct', product);
    return this.httpClient
      .post<number>(this.url, product)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
