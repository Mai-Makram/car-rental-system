import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-show-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-show-order.component.html',
  styleUrl: './admin-show-order.component.scss'
})
export class AdminShowOrderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly adminService = inject(AdminDataService);

  readonly order = signal<any | null>(null);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      this.loadOrder(orderId);
    }
  }

  loadOrder(id: string): void {
    this.isLoading.set(true);

    this.adminService.getOrderDetails(id).subscribe({
      next: (response) => {
        this.order.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading order details:', err);
        this.isLoading.set(false);
      }
    });
  }
}
