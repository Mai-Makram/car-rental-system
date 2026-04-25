import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminDataService } from '../services/admin-data.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-car-list.component.html',
  styleUrl: './admin-car-list.component.scss'
})
export class AdminCarListComponent implements OnInit {
  private adminService = inject(AdminDataService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  cars = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  // الفلاتر والترقيم
  searchTerm = signal<string>('');
  selectedBrand = signal<string>('');
  minPrice = signal<string>('');
  maxPrice = signal<string>('');
  perPage = signal<number>(15);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalCars = signal<number>(0);

  ngOnInit(): void {
    this.loadCars();

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.searchTerm.set(term);
      this.loadCars(1);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCars(page: number = 1): void {
    this.isLoading.set(true);
    this.adminService.getCars(
      page,
      this.perPage(),
      this.searchTerm(),
      this.selectedBrand(),
      this.minPrice(),
      this.maxPrice()
    ).subscribe({
      next: (response) => {
        this.cars.set(response.data || response);
        this.currentPage.set(page);
        this.totalPages.set(response.meta?.last_page || response.last_page || 1);
        this.totalCars.set(response.meta?.total || response.total || 0);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading cars:', err);
        this.isLoading.set(false);
      }
    });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.loadCars(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadCars(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
