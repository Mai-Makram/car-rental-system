import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerDataService } from '../../../features/customer/services/customer-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private customerService = inject(CustomerDataService);
  private router = inject(Router);

  userProfile = this.customerService.userProfile;
  isDropdownOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.customerService.getCustomerProfile().subscribe();
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
