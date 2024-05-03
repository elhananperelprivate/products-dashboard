import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  Product,
  productActions,
  ProductViewMode,
  selectAllProducts,
  selectProductLoaded,
  selectProductLoading,
} from '../../../data';
import { Store } from '@ngrx/store';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductComponent, ProductFormComponent } from '../sub-components';
import { NgClass } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-products-board',
  standalone: true,
  imports: [
    SkeletonModule,
    ProductComponent,
    NgClass,
    SidebarModule,
    MatIcon,
    MatIconButton,
    ProductFormComponent,
    MatPaginator,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatPrefix,
  ],
  templateUrl: './products-board.component.html',
  styleUrl: './products-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsBoardComponent implements OnInit {
  protected store: Store = inject(Store);

  protected viewMode$ = signal(ProductViewMode.List);
  protected pageSize$ = signal(10);
  protected currentPage$ = signal(0);
  protected filterQuery$ = signal('');

  protected productLoaded$: Signal<boolean> =
    this.store.selectSignal(selectProductLoaded);
  protected productLoading$: Signal<boolean> =
    this.store.selectSignal(selectProductLoading);

  protected allProducts$: Signal<Product[]> =
    this.store.selectSignal(selectAllProducts);

  protected filteredProducts$: Signal<Product[]> = computed(() => {
    const allProducts = this.allProducts$();
    const query = this.filterQuery$().toLowerCase();
    return query === ''
      ? allProducts
      : allProducts?.filter((product) =>
          product.title.toLowerCase().includes(query),
        ) || [];
  });

  protected productsToShow$: Signal<Product[]> = computed(() => {
    const allProducts = this.filteredProducts$();
    const start = this.currentPage$() * this.pageSize$();
    const end = start + this.pageSize$();
    return allProducts.slice(start, end);
  });

  protected selectedProductToEdit$: WritableSignal<Product | undefined> =
    signal(undefined);

  protected ProductViewMode = ProductViewMode;

  protected sidebarVisible$ = signal(false);
  pageSizeOptions: number[] = [5, 10];

  ngOnInit(): void {
    this.store.dispatch(productActions.getAllProducts());
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize$.set(e.pageSize);
    this.currentPage$.set(e.pageIndex);
  }
}
