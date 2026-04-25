import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private apiService = inject(ApiService);

  constructor() { }

  /**
   * جلب قائمة المستخدمين مع الترقيم والبحث
   */
  getUsers(page: number = 1, perPage: number = 15, search: string = '', role: string = '', country: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) params = params.set('search', search);
    if (role) params = params.set('role', role);
    if (country) params = params.set('country', country);

    return this.apiService.getWithParams('admin/users', params);
  }

  /**
   * جلب بيانات مستخدم واحد
   */
  getUserDetails(id: number | string): Observable<any> {
    return this.apiService.get(`admin/users/${id}`);
  }

  /**
   * تغيير حالة المستخدم (تفعيل/حظر)
   */
  toggleUserStatus(id: number | string): Observable<any> {
    return this.apiService.post(`admin/users/${id}/toggle-status`, {});
  }

  /**
   * جلب بيانات سيارة واحدة
   */
  getCarDetails(id: number | string): Observable<any> {
    return this.apiService.get(`admin/cars/${id}`);
  }

  /**
   * جلب قائمة السيارات
   */
  getCars(page: number = 1, perPage: number = 15, search: string = '', brand: string = '', minPrice: string = '', maxPrice: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) params = params.set('search', search);
    if (brand) params = params.set('brand', brand);
    if (minPrice) params = params.set('min_price', minPrice);
    if (maxPrice) params = params.set('max_price', maxPrice);

    return this.apiService.getWithParams('admin/cars', params);
  }

  updateCar(id: number | string, payload: Record<string, unknown>): Observable<any> {
    return this.apiService.put(`admin/cars/${id}`, payload);
  }

  deleteCar(id: number | string): Observable<any> {
    return this.apiService.delete(`admin/cars/${id}`);
  }
}
