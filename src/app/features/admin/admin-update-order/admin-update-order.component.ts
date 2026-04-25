import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-update-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-update-order.component.html',
  styleUrl: './admin-update-order.component.scss'
})
export class AdminUpdateOrderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminDataService);

  readonly order = signal<any | null>(null);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  orderId: string | null = null;

  readonly orderForm = this.fb.nonNullable.group({
    payment_status: ['', Validators.required]
  });

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (!this.orderId) {
      this.errorMessage.set('Order id is missing.');
      this.isLoading.set(false);
      return;
    }

    this.loadOrder(this.orderId);
  }

  loadOrder(id: string): void {
    this.adminService.getOrderDetails(id).subscribe({
      next: (response) => {
        const order = response.data || response;
        this.order.set(order);
        this.orderForm.patchValue({
          payment_status: order.payment_status || 'pending'
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading order for update:', err);
        this.errorMessage.set(err.error?.message || 'Unable to load order data.');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (!this.orderId || this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const payload = {
      payment_status: this.orderForm.controls.payment_status.getRawValue()
    };

    this.adminService.updateOrder(this.orderId, payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/admin/orders']);
      },
      error: (err) => {
        console.error('Error updating order:', err);
        this.errorMessage.set(err.error?.message || 'Failed to update order.');
        this.isSubmitting.set(false);
      }
    });
  }
}
