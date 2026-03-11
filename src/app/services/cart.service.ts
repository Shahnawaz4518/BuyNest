import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class CartService {
    private toast = inject(ToastService);

    // ── State ──────────────────────────────────────────────────────────────
    private _items = signal<CartItem[]>([]);

    // ── Derived ────────────────────────────────────────────────────────────
    readonly items = this._items.asReadonly();
    readonly count = computed(() => this._items().reduce((acc, i) => acc + i.quantity, 0));
    readonly total = computed(() => this._items().reduce((acc, i) => acc + i.product.price * i.quantity, 0));
    readonly isEmpty = computed(() => this._items().length === 0);

    // ── Actions ────────────────────────────────────────────────────────────

    add(product: Product): void {
        this._items.update(items => {
            const existing = items.find(i => i.product.id === product.id);
            if (existing) {
                return items.map(i =>
                    i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...items, { product, quantity: 1 }];
        });
        this.toast.success(`"${product.name}" added to cart ✔`);
    }

    decrement(productId: string): void {
        const item = this._items().find(i => i.product.id === productId);
        if (item && item.quantity === 1) {
            this.toast.warning(`"${item.product.name}" removed from cart`);
        }
        this._items.update(items =>
            items
                .map(i => i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
                .filter(i => i.quantity > 0)
        );
    }

    setQuantity(productId: string, quantity: number): void {
        if (quantity <= 0) { this.remove(productId); return; }
        this._items.update(items =>
            items.map(i => i.product.id === productId ? { ...i, quantity } : i)
        );
    }

    remove(productId: string): void {
        const item = this._items().find(i => i.product.id === productId);
        if (item) this.toast.warning(`"${item.product.name}" removed from cart`);
        this._items.update(items => items.filter(i => i.product.id !== productId));
    }

    clear(): void { this._items.set([]); }

    isInCart(productId: string): boolean {
        return this._items().some(i => i.product.id === productId);
    }

    quantityOf(productId: string): number {
        return this._items().find(i => i.product.id === productId)?.quantity ?? 0;
    }
}
