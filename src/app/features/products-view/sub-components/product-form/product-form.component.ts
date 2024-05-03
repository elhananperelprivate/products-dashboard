import {
  Component,
  effect,
  inject,
  input,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { Product, productActions, ProductFormMode } from '../../../../data';
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
import {InputNumberModule} from "primeng/inputnumber";

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
export class ProductFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);

  mode$ = input.required<ProductFormMode>();
  product$ = input<Product>();
  sideNavOpen$ = model.required<boolean>();

  protected productForm: FormGroup;
  protected ProductFormMode = ProductFormMode;
  protected categories: string[] = [
    "men's clothing",
    "women' clothing",
    'jewelery',
    'electronics',
    'furniture',
  ];
  protected image$: WritableSignal<string> = signal('');

  constructor() {
    effect(
      () => {
        const mode = this.mode$();
        const productToUpdate = this.product$();
        if (mode) {
          this.initForm(productToUpdate);
        }
      },
      { allowSignalWrites: true },
    );
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
}
