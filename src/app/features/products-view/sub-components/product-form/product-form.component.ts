import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  Product,
  productActions,
  ProductCategory,
  ProductFormMode,
} from '../../../../data';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { MatIcon } from '@angular/material/icon';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatIcon,
    DockModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    NgStyle,
    InputNumberModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);

  mode$ = input.required<ProductFormMode>();
  product$ = input<Product>();
  sideNavOpen$ = model.required<boolean>();

  protected productForm: FormGroup;
  protected ProductFormMode = ProductFormMode;
  protected categories: string[] = Object.values(ProductCategory);

  protected image$: WritableSignal<string> = signal('');
  protected isMobile$: WritableSignal<boolean> = signal(false);

  constructor() {
    effect(
      () => {
        const mode = this.mode$();
        const productToUpdate = this.product$();
        const sideNavOpen = this.sideNavOpen$();
        if (sideNavOpen) {
          if (mode && mode === ProductFormMode.Create) {
            this.initForm();
          } else if (mode && mode === ProductFormMode.Edit) {
            this.initForm(productToUpdate);
          }
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isMobile$.set(true);
    }
  }

  initForm(product?: Product) {
    this.productForm = this.fb.group({
      title: [
        product?.title || '',
        [Validators.required, Validators.maxLength(256)],
      ],
      description: [product?.description || ''],
      category: [product?.category || '', Validators.required],
      price: [product?.price || 0, [Validators.required, Validators.min(0)]],
    });
    this.image$.set(product?.image || '');
  }

  onImageSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const reader = new FileReader();
      reader.onload = () => {
        this.image$.set(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  submitForm() {
    if (this.productForm.valid && this.image$()) {
      const product = {
        ...this.product$(),
        ...this.productForm.value,
      } as Product;
      product.image = this.image$();
      this.store.dispatch(
        this.mode$() === ProductFormMode.Create
          ? productActions.addProduct({ product })
          : productActions.updateProduct({ product }),
      );
      this.sideNavOpen$.set(false);
    }
  }

  deleteProduct() {
    const productId = this.product$()?.id;
    if (productId) {
      const result = window.confirm(
        'Are you sure you want to delete this product?',
      );
      // Check if the user clicked OK
      if (result) {
        this.store.dispatch(productActions.deleteProduct({ productId }));
      }
    }
  }
}
