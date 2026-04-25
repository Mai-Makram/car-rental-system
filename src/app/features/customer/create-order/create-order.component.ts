import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerDataService } from '../services/customer-data.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerDataService);
  private languageService = inject(LanguageService);

  bookingForm!: FormGroup;
  car = signal<any>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  carId: string | null = null;

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    if (this.carId) {
      this.loadCarDetails(this.carId);
    }
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      car_id: [this.carId, Validators.required],
      delivery_date: ['', Validators.required],
      receiving_date: ['', Validators.required],
      payment_type: ['', Validators.required],
      order_type: ['', Validators.required],
      down_payment: [''],
      number_of_installments: ['']
    });

    // مراقبة تغيير نوع الدفع لتطبيق القواعد الشرطية
    this.bookingForm.get('payment_type')?.valueChanges.subscribe(value => {
      this.handleOrderTypeLogic(value);
    });

    // مراقبة تغيير نوع الطلب للتحكم في حقول التقسيط
    this.bookingForm.get('order_type')?.valueChanges.subscribe(value => {
      this.handleInstallmentFields(value);
    });
  }

  handleOrderTypeLogic(paymentType: string): void {
    const orderTypeControl = this.bookingForm.get('order_type');
    if (!orderTypeControl) return;

    if (paymentType === 'tamara') {
      orderTypeControl.setValue('installments');
      orderTypeControl.disable(); 
    } else if (paymentType === 'cash') {
      orderTypeControl.setValue('full');
      orderTypeControl.disable(); 
    } else {
      orderTypeControl.enable();
      orderTypeControl.setValue('');
    }
  }

  handleInstallmentFields(orderType: string): void {
    const downPaymentControl = this.bookingForm.get('down_payment');
    const installmentsControl = this.bookingForm.get('number_of_installments');

    if (orderType === 'installments') {
      downPaymentControl?.setValidators([Validators.required, Validators.min(1)]);
      installmentsControl?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      downPaymentControl?.clearValidators();
      installmentsControl?.clearValidators();
      downPaymentControl?.setValue('');
      installmentsControl?.setValue('');
    }
    downPaymentControl?.updateValueAndValidity();
    installmentsControl?.updateValueAndValidity();
  }

  loadCarDetails(id: string): void {
    this.isLoading.set(true);
    this.customerService.getOneCar(id).subscribe({
      next: (response) => {
        this.car.set(response.data || response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching car details:', err);
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid || this.bookingForm.disabled) {
      this.isSubmitting.set(true);
      this.errorMessage.set(null);
      const formData = this.bookingForm.getRawValue();

      this.customerService.createOrder(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/customer/orders']);
        },
        error: (err) => {
          console.error('Booking Error:', err);
          this.errorMessage.set(err.error?.message || this.languageService.translate('Something went wrong. Please check your dates and try again.'));
          this.isSubmitting.set(false);
        }
      });
    }
  }
}
