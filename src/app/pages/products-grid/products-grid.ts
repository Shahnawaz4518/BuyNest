import { Component, inject, computed } from '@angular/core';
import { input } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { PRODUCTS } from '../../data/products.data';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, RouterLink, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export default class ProductsGrid {
  private search = inject(SearchService);

  category = input<string>('all');

  readonly categories = ['all', 'electronics', 'wearables', 'fashion', 'accessories', 'home & kitchen', 'computer accessories'];

  readonly filteredProducts = computed(() => {
    const cat = this.category();
    const byCategory = cat === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category.toLowerCase() === cat.toLowerCase());
    return this.search.filter(byCategory);
  });
}
