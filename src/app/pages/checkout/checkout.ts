import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ToastService } from '../../services/toast.service';

declare var Stripe: any;

@Component({
    selector: 'app-checkout',
    imports: [RouterLink, DecimalPipe, FormsModule],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css',
})
export default class Checkout implements OnInit, OnDestroy {
    readonly cart = inject(CartService);
    private router = inject(Router);
    private orderSvc = inject(OrderService);
    private toast = inject(ToastService);

    stripe: any = null;
    cardElement: any = null;
    processing = false;
    cardError = '';

    name = '';
    email = '';

    get savings(): number {
        return Math.round(this.cart.total() * 0.08);
    }

    ngOnInit(): void {
        if (this.cart.isEmpty()) {
            this.router.navigate(['/products/all']);
            return;
        }
        this.initStripe();
    }

    ngOnDestroy(): void {
        if (this.cardElement) this.cardElement.destroy();
    }

    private initStripe(): void {
        try {
            if (typeof Stripe === 'undefined') return;
            // Replace with your real Stripe test publishable key at:
            // https://dashboard.stripe.com/test/apikeys
            this.stripe = Stripe('pk_test_51OABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk');
            const elements = this.stripe.elements({
                appearance: {
                    theme: 'night',
                    variables: {
                        colorPrimary: '#6366F1',
                        colorBackground: '#1A1A24',
                        colorText: '#F1F1F5',
                        colorDanger: '#EF4444',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        borderRadius: '6px',
                    },
                },
            });
            this.cardElement = elements.create('card', { hidePostalCode: true });
            this.cardElement.mount('#stripe-card-element');
            this.cardElement.on('change', (e: any) => {
                this.cardError = e.error ? e.error.message : '';
            });
        } catch {
            this.stripe = null;
        }
    }

    async onPay(): Promise<void> {
        if (!this.name.trim() || !this.email.trim()) {
            this.toast.error('Please fill in your name and email.');
            return;
        }
        this.processing = true;
        this.cardError = '';

        if (this.stripe && this.cardElement) {
            const { token, error } = await this.stripe.createToken(this.cardElement, { name: this.name });
            if (error) {
                this.cardError = error.message;
                this.processing = false;
                return;
            }
            this.placeOrder(token.card?.last4 ?? '****');
        } else {
            // Simulated payment (Stripe not loaded / test key not set)
            await new Promise(r => setTimeout(r, 1800));
            this.placeOrder('4242');
        }
    }

    private placeOrder(last4: string): void {
        this.orderSvc.setOrder({
            id: this.orderSvc.generateOrderId(),
            items: this.cart.items(),
            subtotal: this.cart.total(),
            total: this.cart.total(),
            createdAt: new Date(),
            paymentLast4: last4,
        });
        this.cart.clear();
        this.toast.success('Payment successful! Your order is confirmed 🎉');
        this.router.navigate(['/order-confirmation']);
    }
}
