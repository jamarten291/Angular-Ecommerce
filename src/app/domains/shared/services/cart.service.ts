import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  totalPrice = computed(() => {
    const cart = this.cart();
    let sum = 0;
    cart.forEach((product) => (sum += product.price));
    return sum;
  });

  addToCart(product: Product) {
    this.cart.update((value) => [...value, product]);
  }
}
