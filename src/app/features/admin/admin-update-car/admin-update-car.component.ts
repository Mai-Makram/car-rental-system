import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-admin-update-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-update-car.component.html',
  styleUrl: './admin-update-car.component.scss'
})
export class AdminUpdateCarComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminDataService);
  private readonly languageService = inject(LanguageService);

  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly car = signal<any | null>(null);

  carId: string | null = null;

  readonly carForm = this.fb.nonNullable.group({
    kilometers: [0, [Validators.min(0)]],
    price_per_day: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');

    if (!this.carId) {
      this.errorMessage.set(this.languageService.translate('Car id is missing.'));
      this.isLoading.set(false);
      return;
    }

    this.loadCar(this.carId);
  }

  loadCar(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.adminService.getCarDetails(id).subscribe({
      next: (response) => {
        const car = response.data || response;
        this.car.set(car);

        this.carForm.patchValue({
          kilometers: this.toNumber(car.kilometers, 0),
          price_per_day: this.toNumber(car.price_per_day, 0)
        });

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading car for update:', err);
        this.errorMessage.set(err.error?.message || this.languageService.translate('Unable to load car data.'));
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (!this.carId) {
      this.errorMessage.set(this.languageService.translate('Car id is missing.'));
      return;
    }

    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const payload = {
      price_per_day: this.carForm.controls.price_per_day.getRawValue(),
      kilometers: this.carForm.controls.kilometers.getRawValue()
    };

    this.adminService.updateCar(this.carId, payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set(this.languageService.translate('Car updated successfully.'));
        this.router.navigate(['/admin/cars']);
      },
      error: (err) => {
        console.error('Error updating car:', err);
        this.errorMessage.set(err.error?.message || this.languageService.translate('Failed to update car.'));
        this.isSubmitting.set(false);
      }
    });
  }

  private toNumber(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
}
