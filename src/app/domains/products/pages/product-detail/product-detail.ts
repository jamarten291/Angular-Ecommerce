import {
  Component,
  inject,
  input,
  linkedSignal,
  resource,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { MetaTags } from '@shared/services/meta-tags.service';
import { Related } from '@products/components/related/related.component';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, UpperCasePipe, NgOptimizedImage, Related],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetail implements OnInit {
  cartService = inject(CartService);
  private productService = inject(ProductService);
  private metadataService = inject(MetaTags);

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

  ngOnInit() {
    this.productService.getOneBySlug(this.slug()).then((product) => {
      // Actualizar metadatos con información del producto
      this.metadataService.updateMetaTags({
        title: product.title,
        description: product.description,
        image: product.images[0],
      });
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
