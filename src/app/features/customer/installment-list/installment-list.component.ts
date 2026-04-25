import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss'
})
export class InstallmentListComponent implements OnInit {
  private customerService = inject(CustomerDataService);

  installments = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  payingId = signal<number | null>(null);
  feedback = signal<{ message: string, type: 'success' | 'error' } | null>(null);

  // Pagination Signals
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalItems = signal<number>(0);
  perPage = 15;

  ngOnInit(): void {
    this.loadInstallments();
  }

  loadInstallments(page: number = 1): void {
    this.isLoading.set(true);
    this.customerService.getInstallments(page, this.perPage).subscribe({
      next: (response) => {
        console.log(response);
        this.installments.set(response.data || response);
        this.currentPage.set(page);

        // استخراج بيانات الترقيم من meta أو مباشرة
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
        console.error('Error fetching installments:', err);
        this.isLoading.set(false);
      }
    });
  }

  payInstallment(id: number): void {
    this.payingId.set(id);
    this.feedback.set(null);

    this.customerService.payInstallment(id).subscribe({
      next: (response) => {
        this.feedback.set({ 
          message: response.message || 'Payment completed successfully!', 
          type: 'success' 
        });
        this.customerService.refreshProfile(); // تحديث المحفظة في الهيدر فوراً
        this.loadInstallments(this.currentPage());
        this.payingId.set(null);
        this.clearFeedback();
      },
      error: (err) => {
        this.feedback.set({ 
          message: err.error?.message || 'Payment failed. Please try again.', 
          type: 'error' 
        });
        this.payingId.set(null);
        this.clearFeedback();
      }
    });
  }

  private clearFeedback(): void {
    setTimeout(() => {
      this.feedback.set(null);
    }, 4000);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadInstallments(page);
    }
  }

  getPages(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getStatusClass(status: string): string {
    if (!status) return 'status-pending';
    const s = status.toLowerCase();
    if (s === 'paid') return 'status-paid';
    if (s === 'overdue') return 'status-overdue';
    return 'status-pending';
  }
}
