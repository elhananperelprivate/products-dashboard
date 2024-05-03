import { Component, effect, inject, input } from '@angular/core';
import { Product, ProductFormMode } from '../../../../data';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import {MatIcon} from "@angular/material/icon";

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
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);

  mode = input.required<ProductFormMode>();
  product = input<Product>();

  protected productForm: FormGroup;
  protected ProductFormMode = ProductFormMode;
  protected categories: string[] = ['Men Clothing', 'Women Clothing', 'Other'];
  protected image: string;

  constructor() {
    effect(() => {
      const mode = this.mode();
      const productToUpdate = this.product();
      if (mode) {
        this.initForm(productToUpdate);
      }
    });
  }

  initForm(product?: Product) {
    this.productForm = this.fb.group({
      title: [
        product?.title || '',
        [Validators.required, Validators.maxLength(256)],
      ],
      description: [product?.description || ''],
      category: [product?.category || ''],
    });
    this.image = product?.image || '';
  }

  onImageSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  submitForm() {
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      product.image = this.image;
      //this.store.dispatch(createProduct({ product }));
    }
  }
}
