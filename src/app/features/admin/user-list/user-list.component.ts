import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private adminService = inject(AdminDataService);

  users = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  
  // الترقيم
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalUsers = signal<number>(0);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.isLoading.set(true);
    this.adminService.getUsers(page).subscribe({
      next: (response) => {
        console.log(response);
        
        this.users.set(response.data || response);
        this.currentPage.set(page);
        this.totalPages.set(response.meta?.last_page || response.last_page || 1);
        this.totalUsers.set(response.meta?.total || response.total || 0);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading.set(false);
      }
    });
  }

  toggleUserStatus(userId: number): void {
    this.adminService.toggleUserStatus(userId).subscribe({
      next: () => this.loadUsers(this.currentPage()),
      error: (err) => console.error('Error toggling status:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadUsers(page);
    }
  }

  getPages(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
