import { Component, inject, input } from '@angular/core';
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
  // Este input puede o no recibir un slug de categoría, dependiendo de la ruta.
  // Si no recibe ninguno, se mostrarán todos los productos.
  slug = input<string | undefined>(undefined);
  products = rxResource({
    // Cada vez que se cambie el slug, se volverán a cargar los productos con el nuevo filtro.
    params: () => ({ categorySlug: this.slug() }),
    stream: ({ params }) => this.productService.getProducts(params),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
