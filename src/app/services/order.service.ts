import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    total: number;
    createdAt: Date;
    paymentLast4: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
    private _order = signal<Order | null>(null);
    readonly order = this._order.asReadonly();

    setOrder(order: Order): void {
        this._order.set(order);
    }

    clear(): void {
        this._order.set(null);
    }

    generateOrderId(): string {
        return 'BN-' + Date.now().toString(36).toUpperCase();
    }
}
