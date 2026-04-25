import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, UserRole } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  currentRole = signal<UserRole>('customer');

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  setRole(role: UserRole): void {
    this.currentRole.set(role);
    this.errorMessage.set(''); // مسح الأخطاء عند التبديل
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      
      this.authService.login(this.loginForm.value, this.currentRole()).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          if (this.currentRole() === 'admin') {
            this.router.navigate(['/admin/users']);
          } else {
            this.router.navigate(['/customer/cars']);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || 'Invalid email or password. Please try again.');
        }
      });
    }
  }
}
