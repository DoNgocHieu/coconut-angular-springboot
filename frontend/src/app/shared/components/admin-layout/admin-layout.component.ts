import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <!-- Admin Sidebar -->
      <nav class="admin-sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <i class="fas fa-music"></i>
            <span>Coconut Admin</span>
          </div>
        </div>

        <div class="sidebar-menu">
          <a
            routerLink="/admin/dashboard"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>

          <a
            routerLink="/admin/music"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-music"></i>
            <span>Music</span>
          </a>
          <a
            routerLink="/admin/categories"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-tags"></i>
            <span>Categories</span>
          </a>

          <a
            routerLink="/admin/artists"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-microphone"></i>
            <span>Artists</span>
          </a>

          <a
            routerLink="/admin/users"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-users"></i>
            <span>Users</span>
          </a>

          <a
            routerLink="/admin/playlists"
            routerLinkActive="active"
            class="menu-item"
          >
            <i class="fas fa-list"></i>
            <span>Playlists</span>
          </a>
        </div>

        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>

          <a routerLink="/home" class="back-to-site">
            <i class="fas fa-arrow-left"></i>
            <span>Back to Site</span>
          </a>
        </div>
      </nav>

      <!-- Admin Content -->
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Logout failed:', error);
        // Vẫn logout ở client side và redirect về home trong trường hợp lỗi
        this.router.navigate(['/home']);
      },
    });
  }
}
