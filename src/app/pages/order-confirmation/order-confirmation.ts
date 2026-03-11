import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';

@Component({
    selector: 'app-order-confirmation',
    imports: [RouterLink, DecimalPipe],
    templateUrl: './order-confirmation.html',
    styleUrl: './order-confirmation.css',
})
export default class OrderConfirmation implements OnInit {
    private router = inject(Router);
    private orderSvc = inject(OrderService);

    order!: Order;

    ngOnInit(): void {
        const o = this.orderSvc.order();
        if (!o) {
            this.router.navigate(['/products/all']);
            return;
        }
        this.order = o;
    }
}
