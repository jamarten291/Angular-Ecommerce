import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export default class List implements OnInit {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  currentCategoryId = signal<number | null>(null);
  filteredProducts = computed(() => {
    const categoryId = this.currentCategoryId();
    const products = this.products();
    if (categoryId) {
      return products.filter((product) => product.category.id === categoryId);
    }
    return products;
  });

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => this.products.set(response),
      error: (err) => console.error(err),
    });
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => this.categories.set(response),
      error: (err) => console.error(err),
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  switchCurrentCategory(categoryId: number) {
    this.currentCategoryId.set(categoryId);
  }
}
