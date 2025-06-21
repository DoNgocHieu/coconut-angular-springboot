import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService, DashboardStats, CategoryMusicStats, UserTrends, SystemHealth } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
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
