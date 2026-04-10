import { Component, inject, Input, signal, OnInit } from '@angular/core';
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
  @Input() slug?: string;
  product = signal<Product | null>(null);
  cover = signal('');
  cartService = inject(CartService);

  private productService = inject(ProductService);

  ngOnInit() {
    const productSlug = this.slug;
    if (productSlug) {
      this.productService.getOneBySlug(productSlug).subscribe({
        next: (product) => this.handleProduct(product),
        error: (err) => console.error(err),
      });
    }
  }

  handleProduct(product: Product) {
    this.product.set(product);
    const imageArray = product.images;
    if (imageArray) {
      this.cover.set(imageArray[0]);
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
