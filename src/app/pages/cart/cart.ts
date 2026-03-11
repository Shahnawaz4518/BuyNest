import { Component, inject, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-cart',
    imports: [RouterLink, DecimalPipe],
    templateUrl: './cart.html',
    styleUrl: './cart.css',
})
export default class Cart {
    readonly cart = inject(CartService);
    readonly wishlist = inject(WishlistService);

    readonly savings = computed(() => Math.round(this.cart.total() * 0.08));

    increment(product: Product): void { this.cart.add(product); }
    decrement(productId: string): void { this.cart.decrement(productId); }
    remove(productId: string): void { this.cart.remove(productId); }

    clearCart(): void {
        if (confirm('Remove all items from cart?')) {
            this.cart.clear();
        }
    }
}
