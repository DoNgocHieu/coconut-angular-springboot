import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-left">
        <a routerLink="/" class="logo">
          <i class="fas fa-music logo-icon"></i>
          <span>Coconut Music</span>
        </a>
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/music" routerLinkActive="active">Nhạc</a>
          <a routerLink="/categories" routerLinkActive="active">Thể loại</a>
          <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
        </nav>
      </div>

      <div class="header-center">
        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Search for songs, artists, albums..."
            (input)="onSearch($event)"
          >
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>

      <div class="header-right">
        <div class="user-menu" [class.active]="isDropdownOpen">
          <!-- User is logged in -->
          <div *ngIf="currentUser" class="user-info" (click)="toggleUserMenu()">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <span class="user-name">{{ currentUser.username }}</span>
            <i class="fas fa-chevron-down dropdown-icon" [class.rotated]="isDropdownOpen"></i>
          </div>          <!-- User is not logged in -->
          <div *ngIf="!currentUser" class="auth-buttons">
            <button (click)="goToLogin()" class="login-btn" type="button">Đăng nhập</button>
            <button (click)="goToRegister()" class="register-btn" type="button">Đăng ký</button>
            <!-- Backup links -->
            <a routerLink="/auth/login" class="login-btn backup-link" (click)="testClick('login')">Login Link</a>
          </div>

          <!-- Dropdown menu for logged in users -->
          <div *ngIf="currentUser && isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-header">
              <div class="user-avatar-large">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-details">
                <h4>{{ currentUser.username }}</h4>
                <p>{{ currentUser.email }}</p>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-items">
              <a routerLink="/favorites" class="dropdown-item" (click)="closeDropdown()">
                <i class="fas fa-heart"></i>
                <span>Yêu thích</span>
              </a>
              <a routerLink="/recently-played" class="dropdown-item" (click)="closeDropdown()">
                <i class="fas fa-history"></i>
                <span>Nghe gần đây</span>
              </a>
              <!-- Admin link for admin users -->
              <a *ngIf="currentUser?.isAdmin" routerLink="/admin" class="dropdown-item admin-link" (click)="closeDropdown()">
                <i class="fas fa-cog"></i>
                <span>Admin Panel</span>
              </a>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item logout-item" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isDropdownOpen = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to current user changes
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      // Close dropdown when user logs out
      if (!user) {
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSearch(event: any) {
    const query = event.target.value;
    console.log('Search query:', query);
    // TODO: Implement search functionality
  }

  toggleUserMenu() {
    if (this.currentUser) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isDropdownOpen = false;
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Even if logout API fails, clear local data and redirect
        this.isDropdownOpen = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }

  testClick(type: string) {
    console.log(`${type} button clicked!`);
    alert(`${type} button clicked!`);
  }

  goToLogin() {
    console.log('Going to login...');
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    console.log('Going to register...');
    this.router.navigate(['/auth/register']);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const userMenu = target.closest('.user-menu');
    if (!userMenu && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}
