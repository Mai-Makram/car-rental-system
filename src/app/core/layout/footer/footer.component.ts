import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type FooterLink = {
  label: string;
  route?: string;
  href?: string;
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  title = input('CarRental');
  description = input('Premium car rental services for your business and personal needs.');
  companyName = input('CarRental Inc.');
  links = input<FooterLink[]>([
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Help Center', href: '#' }
  ]);
}
