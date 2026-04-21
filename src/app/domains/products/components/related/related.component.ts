import { Component, inject, input, resource } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.html',
})
export class Related {
  productService = inject(ProductService);
  slug = input.required<string>();

  relatedProducts = resource({
    params: () => ({ slug: this.slug() }),
    loader: ({ params }) => this.productService.getRelatedBySlug(params.slug),
  });
}
