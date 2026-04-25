import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.scss'
})
export class ShowUserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminDataService);

  user = signal<any>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserDetails(userId);
    }
  }

  loadUserDetails(id: string): void {
    this.isLoading.set(true);
    this.adminService.getUserDetails(id).subscribe({
      next: (response) => {
        this.user.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading user details:', err);
        this.isLoading.set(false);
      }
    });
  }

  toggleStatus(): void {
    if (!this.user()) return;
    const userId = this.user().id;
    this.adminService.toggleUserStatus(userId).subscribe({
      next: () => this.loadUserDetails(userId.toString()),
      error: (err) => console.error('Error toggling status:', err)
    });
  }
}
