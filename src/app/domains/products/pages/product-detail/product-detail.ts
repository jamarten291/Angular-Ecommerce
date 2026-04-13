import { Component, inject, signal, OnInit, input, linkedSignal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, UpperCasePipe, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export default class ProductDetail implements OnInit {
  readonly slug = input<string>();
  product = signal<Product | null>(null);
  cover = linkedSignal({
    source: this.product,
    computation: (product, previousValue) => {
      if (product && product.images.length > 0) {
        return product.images[0];
      }
      return previousValue?.value || '';
    },
  });
  cartService = inject(CartService);

  private productService = inject(ProductService);

  ngOnInit() {
    const productSlug = this.slug();
    if (productSlug) {
      this.productService.getOneBySlug(productSlug).subscribe({
        next: (product) => this.product.set(product),
        error: (err) => console.error(err),
      });
    }
  }

  changeCoverImage(imageUri: string) {
    this.cover.set(imageUri);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
