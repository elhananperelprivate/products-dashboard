import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Product, ProductViewMode } from '../../../../data';
import { NgClass } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import {HighlightSearchPipe} from "../../directves";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgClass, SkeletonModule, HighlightSearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  product$ = input.required<Product>();
  mode$ = input.required<ProductViewMode>();
  filterQuery$ = input.required<string>();

  filterCategory$ = model.required<string>();

  protected ProductViewMode = ProductViewMode;
}
