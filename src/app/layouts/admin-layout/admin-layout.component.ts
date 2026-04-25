import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, FooterLink } from '../../core/layout/footer/footer.component';
import { HeaderComponent, HeaderLink } from '../../core/layout/header/header.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  readonly adminLinks: HeaderLink[] = [
    { label: 'nav.users', route: '/admin/users' },
    { label: 'nav.cars', route: '/admin/cars' },
    { label: 'nav.orders', route: '/admin/orders' }
  ];

  readonly footerLinks: FooterLink[] = [
    { label: 'nav.users', route: '/admin/users' },
    { label: 'nav.cars', route: '/admin/cars' },
    { label: 'nav.orders', route: '/admin/orders' },
    { label: 'nav.support', href: '#' }
  ];
}
