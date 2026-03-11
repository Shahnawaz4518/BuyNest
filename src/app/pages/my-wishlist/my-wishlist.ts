import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-my-wishlist',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.css',
})
export default class MyWishlist {
  readonly wishlist = inject(WishlistService);
  readonly cart = inject(CartService);

  isInCart(productId: string): boolean {
    return this.cart.isInCart(productId);
  }

  addToCart(product: Product): void {
    this.cart.add(product);
  }

  removeFromWishlist(productId: string): void {
    this.wishlist.remove(productId);
  }

  clearAll(): void {
    if (confirm('Remove all items from wishlist?')) {
      this.wishlist.clear();
    }
  }
}
