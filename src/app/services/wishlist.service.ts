import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
    private toast = inject(ToastService);

    private _items = signal<Product[]>([]);

    readonly items = this._items.asReadonly();
    readonly count = computed(() => this._items().length);
    readonly isEmpty = computed(() => this._items().length === 0);

    toggle(product: Product): void {
        if (this.isWishlisted(product.id)) {
            this.remove(product.id);
            this.toast.warning(`"${product.name}" removed from wishlist`);
        } else {
            this.add(product);
            this.toast.info(`"${product.name}" saved to wishlist ♥`);
        }
    }

    add(product: Product): void {
        if (!this.isWishlisted(product.id)) {
            this._items.update(items => [...items, product]);
        }
    }

    remove(productId: string): void {
        this._items.update(items => items.filter(p => p.id !== productId));
    }

    isWishlisted(productId: string): boolean {
        return this._items().some(p => p.id === productId);
    }

    clear(): void { this._items.set([]); }
}
