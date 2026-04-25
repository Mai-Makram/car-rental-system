import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-order-list.component.html',
  styleUrl: './admin-order-list.component.scss'
})
export class AdminOrderListComponent implements OnInit, OnDestroy {
  private readonly adminService = inject(AdminDataService);
  private readonly destroy$ = new Subject<void>();
  private readonly filterSubject = new Subject<void>();

  readonly orders = signal<any[]>([]);
  readonly isLoading = signal(true);
  readonly userId = signal('');
  readonly carId = signal('');
  readonly paymentType = signal('');
  readonly paymentStatus = signal('');
  readonly orderType = signal('');
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly totalOrders = signal(0);
  readonly perPage = signal(15);

  ngOnInit(): void {
    this.loadOrders();

    this.filterSubject.pipe(
      debounceTime(400),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadOrders(1);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrders(page: number = 1): void {
    this.isLoading.set(true);

    this.adminService.getOrders(
      page,
      this.perPage(),
      this.userId(),
      this.carId(),
      this.paymentType(),
      this.paymentStatus(),
      this.orderType()
    ).subscribe({
      next: (response) => {
        this.orders.set(response.data || response);
        this.currentPage.set(page);
        this.totalPages.set(response.meta?.last_page || response.last_page || 1);
        this.totalOrders.set(response.meta?.total || response.total || 0);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading admin orders:', err);
        this.isLoading.set(false);
      }
    });
  }

  onFilterInput(): void {
    this.filterSubject.next();
  }

  onFilterChange(): void {
    this.filterSubject.next();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadOrders(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  }

  calculateDuration(start: string, end: string): number {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getOrderStatus(order: any): string {
    return order.status || order.payment_status || 'pending';
  }

  getStatusClass(order: any): string {
    const status = this.getOrderStatus(order).toLowerCase();

    if (status === 'success' || status === 'completed') {
      return 'status-success';
    }

    if (status === 'failed' || status === 'cancelled') {
      return 'status-failed';
    }

    if (status === 'pending' || status === 'confirmed') {
      return 'status-pending';
    }

    return 'status-neutral';
  }
}
