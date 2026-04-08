import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  totalPrice = computed(() => {
    const cart = this.cart();
    return cart.reduce((sum, product) => sum += product.price, 0);
  });

  addToCart(product: Product) {
    this.cart.update(value => [...value, product]);
  }
}
