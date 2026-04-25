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
  getUsers(page: number = 1, perPage: number = 15, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

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
   * حذف مستخدم
   */
  deleteUser(id: number | string): Observable<any> {
    return this.apiService.delete(`admin/users/${id}`);
  }
}
