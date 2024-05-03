import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBoardComponent } from './products-board.component';

describe('ItemsBoardComponent', () => {
  let component: ProductsBoardComponent;
  let fixture: ComponentFixture<ProductsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
