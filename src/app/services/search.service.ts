import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class SearchService {
    readonly query = signal<string>('');

    setQuery(q: string): void {
        this.query.set(q.trim().toLowerCase());
    }

    /** Filter a product list by the current query */
    filter(products: Product[]): Product[] {
        const q = this.query();
        if (!q) return products;
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }
}
