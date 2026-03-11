import { Component, inject, computed } from '@angular/core';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ToastService } from '../../services/toast.service';
import { PRODUCTS } from '../../data/products.data';

@Component({
    selector: 'app-product-detail',
    imports: [RouterLink, DecimalPipe],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.css',
})
export default class ProductDetail {
    id = input.required<string>();
    private cart = inject(CartService);
    private wishlist = inject(WishlistService);
    private toast = inject(ToastService);

    readonly product = computed(() => PRODUCTS.find(p => p.id === this.id()) ?? null);

    get isWishlisted(): boolean {
        return !!this.product() && this.wishlist.isWishlisted(this.product()!.id);
    }

    get inCart(): boolean {
        return !!this.product() && this.cart.isInCart(this.product()!.id);
    }

    get cartQty(): number {
        return this.product() ? this.cart.quantityOf(this.product()!.id) : 0;
    }

    onAddToCart(): void {
        const p = this.product();
        if (!p || !p.inStock) return;
        this.cart.add(p);
    }

    onIncrement(): void { if (this.product()) this.cart.add(this.product()!); }
    onDecrement(): void { if (this.product()) this.cart.decrement(this.product()!.id); }

    onWishlistToggle(): void {
        const p = this.product();
        if (!p) return;
        this.wishlist.toggle(p);
    }

    get starsArray(): boolean[] {
        const p = this.product();
        return p ? [1, 2, 3, 4, 4.5].map(v => p.rating >= v) : [];
    }

    onImageClick(imgUrl: string): void {
        this.toast.show(`Image clicked: ${imgUrl}`);
    }
}
