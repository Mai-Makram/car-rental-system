import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerDataService);

  car = signal<any>(null);
  isLoading = signal<boolean>(true);
  carId: string | null = null;

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
    if (this.carId) {
      this.loadCarDetails(this.carId);
    }
  }

  loadCarDetails(id: string): void {
    this.isLoading.set(true);
    this.customerService.getOneCar(id).subscribe({
      next: (response) => {
        this.car.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching car details:', err);
        this.isLoading.set(false);
      }
    });
  }
}
