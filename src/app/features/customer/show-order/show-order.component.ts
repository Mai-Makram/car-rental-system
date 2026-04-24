import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-show-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.scss'
})
export class ShowOrderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerDataService);

  order = signal<any>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(orderId);
    }
  }

  loadOrderDetails(id: string): void {
    this.isLoading.set(true);
    this.customerService.getOneOrder(id).subscribe({
      next: (response) => {
        this.order.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
        this.isLoading.set(false);
      }
    });
  }

  getStatusClass(status: string): string {
    if (!status) return 'status-pending';
    return `status-${status.toLowerCase()}`;
  }
}
