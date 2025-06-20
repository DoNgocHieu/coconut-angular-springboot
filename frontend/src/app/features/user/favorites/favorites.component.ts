import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserMusicService, FavoriteMusic } from '../../../core/services/user-music.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { Music, MusicType } from '../../../core/models/music.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="favorites-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="fas fa-heart"></i>
            Favorite Songs
          </h1>
          <p>Your collection of loved music</p>
          <div class="stats" *ngIf="favorites.length > 0">
            <span class="stat-item">
              <i class="fas fa-music"></i>
              {{ favorites.length }} bài hát
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Đang tải danh sách yêu thích...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && favorites.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-heart-broken"></i>
        </div>
        <h3>Chưa có bài hát yêu thích</h3>
        <p>Khám phá và thêm những bài hát bạn yêu thích vào đây</p>
        <button routerLink="/music" class="btn btn-primary">
          <i class="fas fa-search"></i>
          Khám phá nhạc
        </button>
      </div>

      <!-- Favorites List -->
      <div *ngIf="!isLoading && favorites.length > 0" class="favorites-list">
        <div class="list-header">
          <div class="bulk-actions">
            <button (click)="clearAllFavorites()" class="btn btn-outline"
                    [disabled]="favorites.length === 0">
              <i class="fas fa-trash"></i>
              Xóa tất cả
            </button>
          </div>
        </div>

        <div class="music-table">
          <div class="table-header">
            <div class="col-track">#</div>
            <div class="col-title">Tên bài hát</div>
            <div class="col-artist">Nghệ sĩ</div>
            <div class="col-category">Thể loại</div>
            <div class="col-duration">Thời lượng</div>
            <div class="col-added">Ngày thêm</div>
            <div class="col-actions">Hành động</div>
          </div>

          <div *ngFor="let favorite of favorites; let i = index"
               class="table-row"
               [class.playing]="isCurrentTrack(favorite.music)"
               (click)="playMusic(favorite.music)">
            <div class="col-track">
              <span *ngIf="!isCurrentTrack(favorite.music)" class="track-number">{{ i + 1 }}</span>
              <i *ngIf="isCurrentTrack(favorite.music)" class="fas fa-volume-up playing-icon"></i>
            </div>
            <div class="col-title">
              <div class="track-info">
                <img [src]="favorite.music.imageUrl || '/assets/default-music.png'"
                     [alt]="favorite.music.title" class="track-image">
                <div class="track-details">
                  <span class="track-title">{{ favorite.music.title }}</span>
                  <span class="track-type">{{ getTypeDisplayName(favorite.music.typeMusic) }}</span>
                </div>
              </div>
            </div>
            <div class="col-artist">{{ favorite.music.artist?.name || 'Unknown Artist' }}</div>
            <div class="col-category">{{ favorite.music.category?.name || 'Uncategorized' }}</div>
            <div class="col-duration">{{ formatDuration(favorite.music.durationSeconds) }}</div>
            <div class="col-added">{{ formatDate(favorite.addedAt) }}</div>
            <div class="col-actions">
              <button (click)="$event.stopPropagation(); removeFromFavorites(favorite.music.id)"
                      class="action-btn remove-btn" title="Xóa khỏi yêu thích">
                <i class="fas fa-heart-broken"></i>
              </button>
              <button (click)="$event.stopPropagation(); shareMusic(favorite.music)"
                      class="action-btn" title="Chia sẻ">
                <i class="fas fa-share"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteMusic[] = [];
  isLoading = false;

  constructor(
    private userMusicService: UserMusicService,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }
  loadFavorites() {
    this.isLoading = true;

    this.userMusicService.getFavorites().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.favorites = response.data.content;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.isLoading = false;
        // Fallback to empty list or show error message
        this.favorites = [];
      }
    });
  }

  getMockFavorites(): FavoriteMusic[] {
    // Mock data - in real app this would come from the service
    return [
      {
        id: 1,
        music: {
          id: 1,
          title: "Shape of You",
          artist: { id: 1, name: "Ed Sheeran", isActive: true, createdAt: "", updatedAt: "" },
          category: { id: 1, name: "Pop", isActive: true, createdAt: "", updatedAt: "" },
          typeMusic: MusicType.TRENDING,
          durationSeconds: 235,
          imageUrl: "https://via.placeholder.com/400x400",
          fileUrl: "",
          playCount: 1000000,
          likeCount: 50000,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        },
        addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 1
      },
      {
        id: 2,
        music: {
          id: 2,
          title: "Blinding Lights",
          artist: { id: 2, name: "The Weeknd", isActive: true, createdAt: "", updatedAt: "" },
          category: { id: 2, name: "Electronic", isActive: true, createdAt: "", updatedAt: "" },
          typeMusic: MusicType.TOP_VIEW,
          durationSeconds: 200,
          imageUrl: "https://via.placeholder.com/400x400",
          fileUrl: "",
          playCount: 800000,
          likeCount: 40000,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        },
        addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 1
      }
    ];
  }

  playMusic(music: Music) {
    this.musicPlayerService.playTrack(music, this.favorites.map(f => f.music));
  }

  isCurrentTrack(music: Music): boolean {
    const currentTrack = this.musicPlayerService.getCurrentTrack();
    return currentTrack?.id === music.id;
  }

  removeFromFavorites(musicId: number) {
    this.userMusicService.removeFromFavorites(musicId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.music.id !== musicId);
      },
      error: (error) => {
        console.error('Error removing from favorites:', error);
      }
    });
  }

  clearAllFavorites() {
    if (confirm('Bạn có chắc muốn xóa tất cả bài hát yêu thích?')) {
      // Remove all favorites
      const removePromises = this.favorites.map(f =>
        this.userMusicService.removeFromFavorites(f.music.id).toPromise()
      );

      Promise.all(removePromises).then(() => {
        this.favorites = [];
      }).catch(error => {
        console.error('Error clearing all favorites:', error);
      });
    }
  }

  shareMusic(music: Music) {
    // TODO: Implement share functionality
    console.log('Share music:', music.title);
  }

  getTypeDisplayName(type: string): string {
    const names: { [key: string]: string } = {
      'TRENDING': 'Thịnh hành',
      'NEW_MUSIC': 'Mới',
      'TOP_VIEW': 'Top nghe',
      'VN_LOFI': 'VN Lofi',
      'FAVORITE': 'Yêu thích'
    };
    return names[type] || 'Nhạc';
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;

    return date.toLocaleDateString('vi-VN');
  }
}
