import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header-actions',
  imports: [RouterLink],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.css',
})
export class HeaderActions {
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);
  readonly search = inject(SearchService);

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.search.setQuery(query);
  }
}
