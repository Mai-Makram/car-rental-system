import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  // سنقوم لاحقاً بربطها بسيرفس حقيقي للآدمن
  users = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    // بيانات تجريبية حالياً (Mock Data) حتى نجهز AdminDataService
    setTimeout(() => {
      this.users.set([
        { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'customer', status: 'active', join_date: new Date() },
        { id: 2, name: 'Sara Mohamed', email: 'sara@example.com', role: 'customer', status: 'active', join_date: new Date() },
        { id: 3, name: 'Admin User', email: 'admin@rental.com', role: 'admin', status: 'active', join_date: new Date() },
      ]);
      this.isLoading.set(false);
    }, 1000);
  }

  toggleUserStatus(userId: number): void {
    // منطق حظر أو تفعيل المستخدم
    console.log('Toggling status for user:', userId);
  }
}
