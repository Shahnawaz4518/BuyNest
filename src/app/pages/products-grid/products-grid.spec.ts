import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProductsGrid from './products-grid';
import { ProductCard } from '../../components/product-card/product-card';

describe('ProductsGrid', () => {
  let fixture: ComponentFixture<ProductsGrid>;
  let component: ProductsGrid;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGrid, ProductCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
