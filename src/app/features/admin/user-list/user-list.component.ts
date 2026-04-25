import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  private adminService = inject(AdminDataService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  users = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  
  // الفلاتر والترقيم
  searchTerm = signal<string>('');
  selectedRole = signal<string>('');
  selectedCountry = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalUsers = signal<number>(0);

  ngOnInit(): void {
    this.loadUsers();

    // مراقبة البحث مع debounce
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.searchTerm.set(term);
      this.loadUsers(1);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(page: number = 1): void {
    this.isLoading.set(true);
    this.adminService.getUsers(
      page, 
      15, 
      this.searchTerm(), 
      this.selectedRole(), 
      this.selectedCountry()
    ).subscribe({
      next: (response) => {
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

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.loadUsers(1);
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

  getUserStatus(user: any): string {
    return user?.status || 'active';
  }

  getUserStatusLabel(user: any): string {
    const status = this.getUserStatus(user);
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
