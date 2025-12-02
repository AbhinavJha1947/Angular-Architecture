import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app-order-list',
    template: `
    <div class="order-list">
      <h1>Orders</h1>
      
      <div class="orders-table" *ngIf="!isLoading">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders" (click)="viewOrder(order.id)">
              <td>{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>\${{ order.totalAmount }}</td>
              <td><app-order-status [status]="order.status"></app-order-status></td>
              <td>{{ order.createdAt | date:'short' }}</td>
              <td>
                <button (click)="viewOrder(order.id); $event.stopPropagation()">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="loading" *ngIf="isLoading">Loading orders...</div>
    </div>
  `,
    styles: [`
    .order-list {
      h1 {
        margin-bottom: 30px;
        color: #333;
      }
    }
    
    .orders-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }
        
        tbody tr {
          cursor: pointer;
          transition: background-color 0.3s;
          
          &:hover {
            background-color: #f9f9f9;
          }
        }
        
        button {
          background-color: #1976d2;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          
          &:hover {
            background-color: #1565c0;
          }
        }
      }
    }
    
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];
    isLoading = true;

    constructor(private ordersService: OrdersService) { }

    ngOnInit(): void {
        this.loadOrders();
    }

    private loadOrders(): void {
        this.ordersService.getOrders().subscribe({
            next: (orders) => {
                this.orders = orders;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load orders:', error);
                this.isLoading = false;
            }
        });
    }

    viewOrder(id: string): void {
        // Navigate to order details
    }
}
