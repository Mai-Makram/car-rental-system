import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminDataService } from '../services/admin-data.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-admin-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './admin-car-list.component.html',
  styleUrl: './admin-car-list.component.scss'
})
export class AdminCarListComponent implements OnInit {
  private adminService = inject(AdminDataService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  cars = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  deletingCarId = signal<number | string | null>(null);
  carPendingDelete = signal<any | null>(null);
  isCreateModalOpen = signal<boolean>(false);
  isCreatingCar = signal<boolean>(false);
  createCarError = signal<string>('');
  createCarSuccess = signal<string>('');
  newCar = signal({
    name: '',
    brand: '',
    model: '',
    kilometers: '',
    price_per_day: ''
  });

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

  onDeleteCar(car: any): void {
    if (!car?.id) {
      return;
    }

    this.carPendingDelete.set(car);
  }

  openCreateModal(): void {
    this.createCarError.set('');
    this.createCarSuccess.set('');
    this.newCar.set({
      name: '',
      brand: '',
      model: '',
      kilometers: '',
      price_per_day: ''
    });
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    if (this.isCreatingCar()) {
      return;
    }

    this.isCreateModalOpen.set(false);
  }

  updateNewCarField(field: keyof ReturnType<typeof this.newCar>, value: string): void {
    this.newCar.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  createCar(): void {
    const car = this.newCar();
    this.createCarError.set('');
    this.createCarSuccess.set('');

    if (!car.name.trim() || !car.brand.trim() || !car.model.trim() || !car.price_per_day) {
      this.createCarError.set('Please fill all required fields.');
      return;
    }

    this.isCreatingCar.set(true);

    const payload = {
      name: car.name.trim(),
      brand: car.brand.trim(),
      model: car.model.trim(),
      kilometers: car.kilometers ? Number(car.kilometers) : 0,
      price_per_day: Number(car.price_per_day)
    };

    this.adminService.createCar(payload).subscribe({
      next: () => {
        this.isCreatingCar.set(false);
        this.createCarSuccess.set('Car added successfully.');
        this.isCreateModalOpen.set(false);
        this.loadCars(1);
      },
      error: (err) => {
        this.isCreatingCar.set(false);
        this.createCarError.set(err.error?.message || 'Failed to add car.');
      }
    });
  }

  closeDeleteModal(): void {
    if (this.deletingCarId()) {
      return;
    }

    this.carPendingDelete.set(null);
  }

  confirmDeleteCar(): void {
    const car = this.carPendingDelete();

    if (!car?.id) {
      return;
    }

    this.deletingCarId.set(car.id);

    this.adminService.deleteCar(car.id).subscribe({
      next: () => {
        this.cars.update((currentCars) => currentCars.filter((currentCar) => currentCar.id !== car.id));
        this.totalCars.update((total) => Math.max(0, total - 1));
        this.deletingCarId.set(null);
        this.carPendingDelete.set(null);

        if (this.cars().length === 0 && this.currentPage() > 1) {
          this.loadCars(this.currentPage() - 1);
          return;
        }

        this.loadCars(this.currentPage());
      },
      error: (err) => {
        console.error('Error deleting car:', err);
        this.deletingCarId.set(null);
      }
    });
  }
}
