import { Component, inject, input, computed, output } from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private cart = inject(CartService);
  private wishlist = inject(WishlistService);

  product = input.required<Product>();

  // Legacy output kept for compatibility
  addToCartClicked = output<Product>();

  get isWishlisted(): boolean {
    return this.wishlist.isWishlisted(this.product().id);
  }

  get inCart(): boolean {
    return this.cart.isInCart(this.product().id);
  }

  get cartQty(): number {
    return this.cart.quantityOf(this.product().id);
  }

  onWishlistToggle(): void {
    this.wishlist.toggle(this.product());
  }

  onAddToCart(): void {
    if (!this.product().inStock) return;
    this.cart.add(this.product());
    this.addToCartClicked.emit(this.product());
  }

  onIncrement(): void {
    this.cart.add(this.product());
  }

  onDecrement(): void {
    this.cart.decrement(this.product().id);
  }
}
