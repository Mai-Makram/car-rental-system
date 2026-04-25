import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerDataService } from '../../../features/customer/services/customer-data.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

export type HeaderLink = {
  label: string;
  route: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private customerService = inject(CustomerDataService);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  mode = input<'customer' | 'admin'>('customer');
  homeRoute = input('/customer/cars');
  brandTitle = input('Car');
  brandAccent = input('Rental');
  accountLabel = input('account.customer');
  navLinks = input<HeaderLink[]>([
    { label: 'nav.browseCars', route: '/customer/cars' },
    { label: 'nav.myOrders', route: '/customer/orders' },
    { label: 'nav.installments', route: '/customer/installments' }
  ]);

  userProfile = this.customerService.userProfile;
  isDropdownOpen = signal(false);

  readonly hasProfileData = computed(() => this.mode() === 'admin' || !!this.userProfile());
  readonly userName = computed(() => this.mode() === 'customer' ? this.userProfile()?.name || this.languageService.translate('common.user') : this.languageService.translate('common.admin'));
  readonly userEmail = computed(() => this.mode() === 'customer' ? this.userProfile()?.email || '' : 'account.adminAccess');
  readonly userMeta = computed(() => this.mode() === 'customer' ? this.userProfile()?.country || this.languageService.translate('common.na') : 'account.adminPanel');
  readonly userExtraLabel = computed(() => this.mode() === 'customer' ? 'common.walletBalance' : 'common.accessLevel');
  readonly userExtraValue = computed(() => this.mode() === 'customer' ? `$${this.userProfile()?.wallet || 0}` : 'common.fullAccess');
  readonly isDarkTheme = computed(() => this.themeService.theme() === 'dark');
  readonly currentLanguage = computed(() => this.languageService.currentLanguage());

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

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
