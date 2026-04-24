import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-show-car',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-car.component.html',
  styleUrl: './show-car.component.scss'
})
export class ShowCarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerDataService);

  car = signal<any>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.loadCarDetails(carId);
    }
  }

  loadCarDetails(id: string): void {
    this.isLoading.set(true);
    this.customerService.getOneCar(id).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        // نأخذ البيانات من response.data إذا كان موجوداً، وإلا الـ response نفسه
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
