import { Component, OnInit, signal, inject } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  private customerService = inject(CustomerDataService);

  // State using Signals
  cars = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalItems = signal<number>(0);
  searchQuery = signal<string>('');
  perPage = 15;

  // للتحكم في سرعة الطلبات عند الكتابة (Debounce)
  private filterSubject = new Subject<void>();

  ngOnInit(): void {
    this.loadCars();

    // إعداد الـ Debounce للبحث
    this.filterSubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.loadCars(1);
    });
  }

  loadCars(page: number = 1): void {
    this.isLoading.set(true);
    
    console.log('Sending Search Request:', {
      page,
      search: this.searchQuery()
    });

    this.customerService.getCars(page, this.perPage, this.searchQuery()).subscribe({
      next: (response) => {
        console.log("response",response);
        this.cars.set(response.data || response); 
        this.currentPage.set(page);
        
        if (response.meta) {
          this.totalPages.set(response.meta.last_page || response.meta.total_pages || 1);
          this.totalItems.set(response.meta.total || 0);
        } else {
          this.totalPages.set(response.last_page || response.total_pages || 1);
          this.totalItems.set(response.total || response.total_items || 0);
        }
        
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
        this.isLoading.set(false);
      }
    });
  }

  onSearch(event: any): void {
    this.searchQuery.set(event.target.value);
    this.filterSubject.next();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadCars(page);
    }
  }

  // دالة مساعدة لإنشاء مصفوفة الصفحات للـ Pagination
  getPages(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
