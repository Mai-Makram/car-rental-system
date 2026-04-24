import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private apiService = inject(ApiService);

  constructor() {}

  getCustomerProfile(): Observable<any> {
    return this.apiService.get('customer/profile');
  }

  getCars(page: number = 1, perPage: number = 15, searchTerm: string = '', brand: string = '', minPrice: string = '', maxPrice: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    if (brand) {
      params = params.set('brand', brand);
    }

    if (minPrice) {
      params = params.set('min_price', minPrice);
    }

    if (maxPrice) {
      params = params.set('max_price', maxPrice);
    }

    return this.apiService.getWithParams('customer/cars', params);
  }

  getOneCar(id: number | string): Observable<any> {
    return this.apiService.get(`customer/cars/${id}`);
  }

  getOrders(page: number = 1, perPage: number = 15): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.apiService.getWithParams('customer/orders', params);
  }

  getOneOrder(id: number | string): Observable<any> {
    return this.apiService.get(`customer/orders/${id}`);
  }

  createOrder(data: any): Observable<any> {
    return this.apiService.post('customer/orders', data);
  }

  getInstallments(page: number = 1, perPage: number = 15): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.apiService.getWithParams('customer/installments', params);
  }

  payInstallment(id: number | string): Observable<any> {
    return this.apiService.post(`customer/installments/${id}/pay`, {});
  }

  updateCustomerProfile(data: any): Observable<any> {
    return this.apiService.put('customer/profile', data);
  }
}
