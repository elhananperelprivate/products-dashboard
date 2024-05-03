import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  Product,
  productActions,
  ProductFormMode,
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
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';

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
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    MatFabButton,
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
  protected filterCategory$ = signal('');

  protected productLoaded$: Signal<boolean> =
    this.store.selectSignal(selectProductLoaded);
  protected productLoading$: Signal<boolean> =
    this.store.selectSignal(selectProductLoading);

  protected allProducts$: Signal<Product[]> =
    this.store.selectSignal(selectAllProducts);

  protected filterQueryWithDebounce$ = toSignal(
    toObservable(this.filterQuery$).pipe(debounceTime(300)),
    { initialValue: '' },
  );

  protected filteredProducts$ = computed(() => {
    const query = this.filterQueryWithDebounce$();
    const categoryFilter = this.filterCategory$();
    const allProducts = this.allProducts$();
    const lcf = query?.toLowerCase() || '';
    return (
      allProducts?.filter(
        (product) =>
          (lcf ? product.title.toLowerCase().includes(lcf) : true) &&
          (categoryFilter ? product.category === categoryFilter : true),
      ) || []
    );
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
  protected ProductFormMode = ProductFormMode;

  protected sidebarVisible$ = signal(false);
  pageSizeOptions: number[] = [5, 10];

  constructor() {
    effect(
      () => {
        const selectedProduct = this.selectedProductToEdit$();
        if (selectedProduct) {
          this.sidebarVisible$.set(true);
        } else {
          this.sidebarVisible$.set(false);
        }
      },
      { allowSignalWrites: true },
    );
    effect(() => {
      const filterQuery = this.filterQueryWithDebounce$();
      if (filterQuery) {
        this.currentPage$.set(0);
      }
    }, { allowSignalWrites: true});
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.getAllProducts());
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize$.set(e.pageSize);
    this.currentPage$.set(e.pageIndex);
  }

  protected readonly ProductFormComponent = ProductFormComponent;
}
