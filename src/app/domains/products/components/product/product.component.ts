import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { UpperCasePipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [UpperCasePipe, CurrencyPipe, TimeAgoPipe, RouterLink, NgOptimizedImage],
  templateUrl: './product.html',
  styleUrl: './product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  readonly product = input.required<Product>();
  private cartService = inject(CartService);

  addToCartHandler() {
    this.cartService.addToCart(this.product());
  }
}
