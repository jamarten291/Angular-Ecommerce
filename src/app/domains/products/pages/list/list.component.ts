import { Component, inject, Input, signal, OnInit, OnChanges } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})

export default class List implements OnInit, OnChanges {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  @Input() categoryId?: string;

  ngOnInit() {
    this.fetchCategories();
  }

  ngOnChanges() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts(this.categoryId)
      .subscribe({
        next: (response) => this.products.set(response),
        error: (err) => console.error(err)
      });
  }

  fetchCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (response) => this.categories.set(response),
        error: (err) => console.error(err)
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
