import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerDataService } from '../../../features/customer/services/customer-data.service';
import { AuthService } from '../../services/auth.service';

export type HeaderLink = {
  label: string;
  route: string;
};

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

  mode = input<'customer' | 'admin'>('customer');
  homeRoute = input('/customer/cars');
  brandTitle = input('Car');
  brandAccent = input('Rental');
  accountLabel = input('Customer Account');
  navLinks = input<HeaderLink[]>([
    { label: 'Browse Cars', route: '/customer/cars' },
    { label: 'My Orders', route: '/customer/orders' },
    { label: 'Installments', route: '/customer/installments' }
  ]);

  userProfile = this.customerService.userProfile;
  isDropdownOpen = signal(false);

  readonly hasProfileData = computed(() => this.mode() === 'admin' || !!this.userProfile());
  readonly userName = computed(() => this.mode() === 'customer' ? this.userProfile()?.name || 'User' : 'Admin');
  readonly userEmail = computed(() => this.mode() === 'customer' ? this.userProfile()?.email || '' : 'Administrator Access');
  readonly userMeta = computed(() => this.mode() === 'customer' ? this.userProfile()?.country || 'N/A' : 'Admin Control Panel');
  readonly userExtraLabel = computed(() => this.mode() === 'customer' ? 'Wallet Balance' : 'Access Level');
  readonly userExtraValue = computed(() => this.mode() === 'customer' ? `$${this.userProfile()?.wallet || 0}` : 'Full Access');

  ngOnInit(): void {
    if (this.mode() === 'customer') {
      this.customerService.getCustomerProfile().subscribe();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((value) => !value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
