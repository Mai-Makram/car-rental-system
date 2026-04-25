import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

export type FooterLink = {
  label: string;
  route?: string;
  href?: string;
};

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  title = input('CarRental');
  description = input('footer.defaultDescription');
  companyName = input('footer.defaultCompany');
  links = input<FooterLink[]>([
    { label: 'nav.privacyPolicy', href: '#' },
    { label: 'nav.termsOfService', href: '#' },
    { label: 'nav.helpCenter', href: '#' }
  ]);
}
