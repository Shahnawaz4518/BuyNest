import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { Header } from './layout/header/header';
import { HeaderActions } from './layout/header-actions/header-actions';
import ProductsGrid from './pages/products-grid/products-grid';
import { ProductCard } from './components/product-card/product-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Header,MatToolbar,HeaderActions,ProductsGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-ecommerc--inline-style--inline-template--skip-tests');
}
