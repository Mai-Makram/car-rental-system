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
    { label: 'Users', route: '/admin/users' },
    { label: 'Cars', route: '/admin/cars' },
    { label: 'Orders', route: '/admin/orders' }
  ];

  readonly footerLinks: FooterLink[] = [
    { label: 'Users', route: '/admin/users' },
    { label: 'Cars', route: '/admin/cars' },
    { label: 'Orders', route: '/admin/orders' },
    { label: 'Support', href: '#' }
  ];
}
