import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout'),
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./pages/order-confirmation/order-confirmation'),
  },
  {
    path: '**',
    redirectTo: 'products/all',
  },
];
