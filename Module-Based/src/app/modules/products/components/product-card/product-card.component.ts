import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-card',
    template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.imageUrl || 'https://via.placeholder.com/200'" [alt]="product.name">
      </div>
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <div class="product-footer">
          <span class="price">\${{ product.price }}</span>
          <span class="stock" [class.low-stock]="product.stock < 10">
            Stock: {{ product.stock }}
          </span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }
    
    .product-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .product-info {
      padding: 15px;
      
      h3 {
        margin: 0 0 10px;
        font-size: 18px;
        color: #333;
      }
      
      .description {
        margin: 0 0 15px;
        font-size: 14px;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .price {
        font-size: 20px;
        font-weight: 700;
        color: #1976d2;
      }
      
      .stock {
        font-size: 12px;
        color: #4caf50;
        
        &.low-stock {
          color: #f44336;
        }
      }
    }
  `]
})
export class ProductCardComponent {
    @Input() product!: Product;
}
