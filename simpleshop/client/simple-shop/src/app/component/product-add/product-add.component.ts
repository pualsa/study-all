import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'si-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  productForm: FormGroup;
  newProductId?: number;
  submitEnabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductServiceService
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.1)]],
      description: '',
    });
  }

  onSubmit(): void {
    this.submitEnabled = false;

    let prod = new Product(this.productForm.value.title, this.productForm.value.price);
    prod.description = this.productForm.value.description;
    // can submit prod or this.productForm.value

    console.warn('Submit', this.productForm.value);
    this.productService.createProduct(this.productForm.value).subscribe(
      (data) => {
        this.newProductId = data;
        this.productForm.reset();
        this.submitEnabled = true;
      },
      (err) => {
        alert(err);
        this.submitEnabled = true;
      }
    );
  }
}
