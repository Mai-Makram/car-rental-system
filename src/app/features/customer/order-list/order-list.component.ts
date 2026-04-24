import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  private customerService = inject(CustomerDataService);

  orders = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalItems = signal<number>(0);
  perPage = 15;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 1): void {
    this.isLoading.set(true);
    this.customerService.getOrders(page, this.perPage).subscribe({
      next: (response) => {
        this.orders.set(response.data || response);
        this.currentPage.set(page);
        
        // استخراج بيانات الترقيم
        if (response.meta) {
          this.totalPages.set(response.meta.last_page || 1);
          this.totalItems.set(response.meta.total || 0);
        } else {
          this.totalPages.set(response.last_page || 1);
          this.totalItems.set(response.total || 0);
        }

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadOrders(page);
    }
  }

  getPages(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getStatusClass(status: string): string {
    if (!status) return 'status-pending';
    return `status-${status.toLowerCase()}`;
  }
}
