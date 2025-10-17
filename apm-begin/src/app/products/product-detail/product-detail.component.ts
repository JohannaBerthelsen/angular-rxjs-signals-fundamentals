import { Component, computed, inject, Input } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { catchError, EMPTY } from 'rxjs';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
})
export class ProductDetailComponent {
  @Input() productId: number = 0;

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Product to display
  product = this.productService.product;
  errorMessage = this.productService.productError;

  pageTitle = computed(() =>
    this.product()
      ? `Product Detail for: ${this.product()?.productName}`
      : 'Product Detail'
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
