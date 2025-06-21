import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService, DashboardStats, CategoryMusicStats, UserTrends, SystemHealth } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],  encapsulation: ViewEncapsulation.None,
  styles: [`
    .modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.8) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 9999 !important;
      padding: 1rem !important;
    }
    .modal-overlay .modal {
      background: linear-gradient(145deg, #1e1e1e 0%, #282828 100%) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 16px !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6) !important;
      width: 100% !important;
      max-width: 600px !important;
      min-width: 500px !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
    }
    .modal-overlay .modal .modal-header {
      padding: 1.5rem !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
    }
    .modal-overlay .modal .modal-header h3 {
      margin: 0 !important;
      color: #ffffff !important;
      font-size: 1.25rem !important;
      font-weight: 600 !important;
    }
    .modal-overlay .modal .modal-header .btn-close {
      background: none !important;
      border: none !important;
      color: #6a6a6a !important;
      font-size: 1.5rem !important;
      cursor: pointer !important;
      padding: 0.25rem !important;
      border-radius: 50% !important;
    }
    .modal-overlay .modal .modal-header .btn-close:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      color: #ffffff !important;
    }
    .modal-overlay .modal .modal-body {
      padding: 2rem !important;
    }
    .modal-overlay .modal .modal-body .form-group {
      margin-bottom: 1.5rem !important;
    }
    .modal-overlay .modal .modal-body .form-group label {
      display: block !important;
      margin-bottom: 0.75rem !important;
      color: #b3b3b3 !important;
      font-weight: 500 !important;
      font-size: 0.875rem !important;
    }
    .modal-overlay .modal .modal-body .form-group input,
    .modal-overlay .modal .modal-body .form-group textarea,
    .modal-overlay .modal .modal-body .form-group select {
      width: 100% !important;
      padding: 0.75rem 1rem !important;
      background: #282828 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 8px !important;
      color: #ffffff !important;
      font-size: 0.875rem !important;
      box-sizing: border-box !important;
    }
    .modal-overlay .modal .modal-body .form-group input:focus,
    .modal-overlay .modal .modal-body .form-group textarea:focus,
    .modal-overlay .modal .modal-body .form-group select:focus {
      outline: none !important;
      border-color: #1db954 !important;
      box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3) !important;
      background: #3e3e3e !important;
    }
    .modal-overlay .modal .modal-footer {
      padding: 1.5rem 2rem !important;
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
      display: flex !important;
      justify-content: flex-end !important;
      gap: 1rem !important;
    }
    .modal-overlay .modal .modal-footer .admin-btn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 0.5rem !important;
      padding: 0.75rem 1.5rem !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 500 !important;
      font-size: 0.875rem !important;
      cursor: pointer !important;
    }
    .modal-overlay .modal .modal-footer .admin-btn.btn-secondary {
      background: #282828 !important;
      color: #b3b3b3 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    .modal-overlay .modal .modal-footer .admin-btn.btn-secondary:hover {
      background: #3e3e3e !important;
      color: #ffffff !important;
    }
    .modal-overlay .modal .modal-footer .admin-btn:not(.btn-secondary) {
      background: linear-gradient(135deg, #1db954 0%, #1ed760 100%) !important;
      color: #ffffff !important;
    }
    .modal-overlay .modal .modal-footer .admin-btn:not(.btn-secondary):hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
    }
    .modal-overlay .modal .modal-body .form-group .error {
      color: #e22134 !important;
      font-size: 0.8rem !important;
      margin-top: 0.25rem !important;
    }
  `],
  template: `
    <div class="admin-dashboard">
      <div class="dashboard-header">
        <h1>
          <i class="fas fa-tachometer-alt"></i>
          Admin Dashboard
        </h1>
        <p>Welcome to the administration panel</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="dashboardStats">
        <div class="stat-card">
          <div class="stat-icon music">
            <i class="fas fa-music"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.totalMusic }}</h3>
            <p>Total Music</p>
            <small>{{ dashboardStats.activeMusic }} active</small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon users">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.totalUsers }}</h3>
            <p>Total Users</p>
            <small>{{ dashboardStats.verifiedUsers }} verified</small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon categories">
            <i class="fas fa-tags"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.totalCategories }}</h3>
            <p>Categories</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon playlists">
            <i class="fas fa-list"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.totalPlaylists }}</h3>
            <p>Playlists</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon artists">
            <i class="fas fa-microphone"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.totalArtists }}</h3>
            <p>Artists</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon admins">
            <i class="fas fa-user-shield"></i>
          </div>
          <div class="stat-content">
            <h3>{{ dashboardStats.adminUsers }}</h3>
            <p>Admin Users</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="dashboard-content">
        <div class="content-section">
          <h2>
            <i class="fas fa-chart-line"></i>
            This Week's Activity
          </h2>
          <div class="activity-grid" *ngIf="dashboardStats">
            <div class="activity-card">
              <div class="activity-number">{{ dashboardStats.newMusicThisWeek }}</div>
              <div class="activity-label">New Music Added</div>
            </div>
            <div class="activity-card">
              <div class="activity-number">{{ dashboardStats.newUsersThisWeek }}</div>
              <div class="activity-label">New Users Registered</div>
            </div>
          </div>
        </div>

        <!-- Top Played Music -->
        <div class="content-section">
          <h2>
            <i class="fas fa-fire"></i>
            Top Played Music
          </h2>
          <div class="top-music-list" *ngIf="topPlayedMusic.length > 0">
            <div class="music-item" *ngFor="let music of topPlayedMusic; let i = index">
              <div class="music-rank">{{ i + 1 }}</div>
              <div class="music-cover">
                <img [src]="music.imageUrl || '/assets/default-music.jpg'" [alt]="music.title">
              </div>
              <div class="music-info">
                <h4>{{ music.title }}</h4>
                <p>{{ music.artist?.name || 'Unknown Artist' }}</p>
              </div>
              <div class="music-stats">
                <span class="play-count">
                  <i class="fas fa-play"></i>
                  {{ music.playCount | number }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Music by Category -->
        <div class="content-section">
          <h2>
            <i class="fas fa-chart-pie"></i>
            Music by Category
          </h2>
          <div class="category-stats" *ngIf="categoryStats">
            <div class="category-item" *ngFor="let category of categoryStats.categories">
              <div class="category-name">{{ category.categoryName }}</div>
              <div class="category-bar">
                <div class="category-fill" [style.width.%]="getCategoryPercentage(category.musicCount)"></div>
              </div>
              <div class="category-count">{{ category.musicCount }}</div>
            </div>
          </div>
        </div>

        <!-- System Health -->
        <div class="content-section">
          <h2>
            <i class="fas fa-server"></i>
            System Health
          </h2>
          <div class="health-grid" *ngIf="systemHealth">
            <div class="health-card">
              <div class="health-status" [class]="systemHealth.database.toLowerCase()">
                <i class="fas fa-database"></i>
                <span>Database: {{ systemHealth.database }}</span>
              </div>
            </div>
            <div class="health-card">
              <div class="health-status">
                <i class="fas fa-memory"></i>
                <span>Memory: {{ systemHealth.memory.usagePercentage }}% used</span>
              </div>
              <div class="memory-bar">
                <div class="memory-fill" [style.width.%]="systemHealth.memory.usagePercentage"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>
          <i class="fas fa-bolt"></i>
          Quick Actions
        </h2>
        <div class="actions-grid">
          <a routerLink="/admin/music" class="action-card">
            <i class="fas fa-music"></i>
            <span>Manage Music</span>
          </a>
          <a routerLink="/admin/categories" class="action-card">
            <i class="fas fa-tags"></i>
            <span>Manage Categories</span>
          </a>
          <a routerLink="/admin/users" class="action-card">
            <i class="fas fa-users"></i>
            <span>Manage Users</span>
          </a>
          <a routerLink="/admin/playlists" class="action-card">
            <i class="fas fa-list"></i>
            <span>Manage Playlists</span>
          </a>
        </div>      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats: DashboardStats | null = null;
  categoryStats: CategoryMusicStats | null = null;
  userTrends: UserTrends | null = null;
  systemHealth: SystemHealth | null = null;
  topPlayedMusic: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    // Load dashboard stats
    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardStats = response.data!;
        }
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.error = 'Failed to load dashboard statistics';
      }
    });

    // Load category stats
    this.adminService.getMusicStatsByCategory().subscribe({
      next: (response) => {
        if (response.success) {
          this.categoryStats = response.data!;
        }
      },
      error: (error) => {
        console.error('Error loading category stats:', error);
      }
    });

    // Load top played music
    this.adminService.getTopPlayedMusic(5).subscribe({
      next: (response) => {
        if (response.success) {
          this.topPlayedMusic = response.data!;
        }
      },
      error: (error) => {
        console.error('Error loading top played music:', error);
      }
    });

    // Load system health
    this.adminService.getSystemHealth().subscribe({
      next: (response) => {
        if (response.success) {
          this.systemHealth = response.data!;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading system health:', error);
        this.loading = false;
      }
    });
  }

  getCategoryPercentage(count: number): number {
    if (!this.categoryStats) return 0;
    const maxCount = Math.max(...this.categoryStats.categories.map(c => c.musicCount));
    return maxCount > 0 ? (count / maxCount) * 100 : 0;
  }
}
