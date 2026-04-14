import { Component, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export default class List {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories = rxResource({
    stream: () => this.categoryService.getCategories(),
  });
  currentCategoryId = signal<number | null>(null);
  products = rxResource({
    params: () => ({ categoryId: this.currentCategoryId() }),
    // TODO fix problem with products not loading when switching category for the first time, but works on subsequent switches
    stream: ({ params }) => this.productService.getProducts(String(params.categoryId)),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  switchCurrentCategory(categoryId: number) {
    this.currentCategoryId.set(categoryId);
  }
}
