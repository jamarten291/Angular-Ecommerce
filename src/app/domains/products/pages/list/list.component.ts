import { ChangeDetectionStrategy, Component, inject, input, resource } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class List {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories = resource({
    loader: () => this.categoryService.getCategories(),
  });
  // Este input puede o no recibir un slug de categoría, dependiendo de la ruta.
  // Si no recibe ninguno, se mostrarán todos los productos.
  slug = input<string | undefined>(undefined);
  products = resource({
    // Cada vez que se cambie el slug, se volverán a cargar los productos con el nuevo filtro.
    params: () => ({ categorySlug: this.slug() }),
    loader: ({ params }) => this.productService.getProducts(params),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
