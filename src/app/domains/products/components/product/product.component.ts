import { Component, inject, Input } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product',
  imports: [UpperCasePipe, CurrencyPipe, TimeAgoPipe, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  private cartService = inject(CartService);

  addToCartHandler() {
    this.cartService.addToCart(this.product);
  }
}
