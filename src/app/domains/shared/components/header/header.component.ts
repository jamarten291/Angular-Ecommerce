import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private cartService = inject(CartService);
  hideShoppingCart = signal(true);
  cart = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;

  toggleShoppingCart() {
    this.hideShoppingCart.update(value => !value);
  }
}
