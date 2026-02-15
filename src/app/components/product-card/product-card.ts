import { Component, output, input } from '@angular/core';
import { Product } from '../../models/product';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  // ✔ Correct required input signal
  product = input.required<Product>();

  // ✔ Correct output signal
  addToCartClicked = output<Product>();
}
