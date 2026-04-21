import { Component, inject, signal, OnInit, input, linkedSignal, effect } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, UpperCasePipe, NgOptimizedImage],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export default class ProductDetail implements OnInit {
  cartService = inject(CartService);
  private productService = inject(ProductService);
  titleService = inject(Title);
  metaService = inject(Meta);

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

  ngOnInit() {
    const productSlug = this.slug();
    if (productSlug) {
      this.productService.getOneBySlug(productSlug).then((product) => {
        this.product.set(product);
      });
    }
  }

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) {
        this.titleService.setTitle(product.title);
        this.metaService.updateTag({
          name: 'description',
          content: product.description,
        });
        this.metaService.updateTag({
          name: 'og:title',
          content: product.title,
        });
        this.metaService.updateTag({
          name: 'og:description',
          content: product.description,
        });
      }
    });
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
