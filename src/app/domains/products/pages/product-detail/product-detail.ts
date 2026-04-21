import { Component, inject, input, linkedSignal, effect, resource } from '@angular/core';
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
export default class ProductDetail {
  cartService = inject(CartService);
  private productService = inject(ProductService);
  titleService = inject(Title);
  metaService = inject(Meta);

  readonly slug = input.required<string>();
  productResource = resource({
    params: () => ({ slug: this.slug() }),
    loader: ({ params }) => this.productService.getOneBySlug(params.slug),
  });
  cover = linkedSignal({
    source: this.productResource.value,
    computation: (product, previousValue) => {
      if (product && product.images.length > 0) {
        return product.images[0];
      }
      return previousValue?.value || '';
    },
  });

  constructor() {
    effect(() => {
      const product = this.productResource.value();
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
    const product = this.productResource.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
