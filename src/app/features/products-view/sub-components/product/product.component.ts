import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Product, ProductViewMode } from '../../../../data';
import { NgClass } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgClass, SkeletonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  product$ = input.required<Product>();
  mode$ = input.required<ProductViewMode>();

  filterCategory$ = model.required<string>();

  protected ProductViewMode = ProductViewMode;
}
