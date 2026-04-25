import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-show-car',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-show-car.component.html',
  styleUrl: './admin-show-car.component.scss'
})
export class AdminShowCarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminDataService);

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
    this.adminService.getCarDetails(id).subscribe({
      next: (response) => {
        console.log(response);
        this.car.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading car details:', err);
        this.isLoading.set(false);
      }
    });
  }
}
