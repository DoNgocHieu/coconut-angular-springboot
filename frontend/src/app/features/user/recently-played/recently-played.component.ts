import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserMusicService, RecentlyPlayed } from '../../../core/services/user-music.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { Music, MusicType } from '../../../core/models/music.model';

@Component({
  selector: 'app-recently-played',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="recently-played-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="fas fa-history"></i>
            Recently Played
          </h1>
          <p>Your music listening history</p>          <div class="stats" *ngIf="recentlyPlayed.length > 0">
            <span class="stat-item">
              <i class="fas fa-music"></i>
              {{ recentlyPlayed.length }} bài hát gần đây (tối đa 10 bài)
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Đang tải lịch sử nghe nhạc...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && recentlyPlayed.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-clock"></i>
        </div>
        <h3>Chưa có lịch sử nghe nhạc</h3>
        <p>Bắt đầu nghe nhạc để xem lịch sử phát nhạc của bạn</p>
        <button routerLink="/music" class="btn btn-primary">
          <i class="fas fa-play"></i>
          Bắt đầu nghe nhạc
        </button>
      </div>

      <!-- Recently Played List -->
      <div *ngIf="!isLoading && recentlyPlayed.length > 0" class="recently-played-list">
        <div class="list-header">
          <div class="bulk-actions">
            <button (click)="clearHistory()" class="btn btn-outline"
                    [disabled]="recentlyPlayed.length === 0">
              <i class="fas fa-trash"></i>
              Xóa lịch sử
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
            <div class="col-played">Nghe lúc</div>
            <div class="col-actions">Hành động</div>
          </div>

          <div *ngFor="let item of recentlyPlayed; let i = index"
               class="table-row"
               [class.playing]="isCurrentTrack(item.music)"
               (click)="playMusic(item.music)">
            <div class="col-track">
              <span *ngIf="!isCurrentTrack(item.music)" class="track-number">{{ i + 1 }}</span>
              <i *ngIf="isCurrentTrack(item.music)" class="fas fa-volume-up playing-icon"></i>
            </div>
            <div class="col-title">
              <div class="track-info">
                <img [src]="item.music.imageUrl || '/assets/default-music.png'"
                     [alt]="item.music.title" class="track-image">
                <div class="track-details">
                  <span class="track-title">{{ item.music.title }}</span>
                  <span class="track-type">{{ getTypeDisplayName(item.music.typeMusic) }}</span>
                </div>
              </div>
            </div>
            <div class="col-artist">{{ item.music.artist?.name || 'Unknown Artist' }}</div>
            <div class="col-category">{{ item.music.category?.name || 'Uncategorized' }}</div>
            <div class="col-duration">{{ formatDuration(item.music.durationSeconds) }}</div>
            <div class="col-played">{{ formatPlayedTime(item.playedAt) }}</div>
            <div class="col-actions">
              <button (click)="$event.stopPropagation(); addToFavorites(item.music)"
                      class="action-btn"
                      [class.favorited]="isFavorite(item.music.id)"
                      [title]="isFavorite(item.music.id) ? 'Đã yêu thích' : 'Thêm vào yêu thích'">
                <i class="fas fa-heart"></i>
              </button>
              <button (click)="$event.stopPropagation(); shareMusic(item.music)"
                      class="action-btn" title="Chia sẻ">
                <i class="fas fa-share"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {
  recentlyPlayed: RecentlyPlayed[] = [];
  isLoading = false;
  favoriteStates: { [key: number]: boolean } = {}; // Track favorite states

  constructor(
    private userMusicService: UserMusicService,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit() {
    this.loadRecentlyPlayed();
  }  loadRecentlyPlayed() {
    this.isLoading = true;

    this.userMusicService.getRecentlyPlayed().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentlyPlayed = response.data.content;
          // Load favorite states for each music
          this.recentlyPlayed.forEach(item => {
            this.userMusicService.isFavorite(item.music.id).subscribe(isFav => {
              this.favoriteStates[item.music.id] = isFav;
            });
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recently played:', error);
        this.isLoading = false;
        // Fallback to empty list or show error message
        this.recentlyPlayed = [];
      }
    });
  }

  getMockRecentlyPlayed(): RecentlyPlayed[] {
    // Mock data - in real app this would come from the service
    return [
      {
        id: 1,
        music: {
          id: 1,
          title: "Bohemian Rhapsody",
          artist: { id: 1, name: "Queen", isActive: true, createdAt: "", updatedAt: "" },
          category: { id: 1, name: "Rock", isActive: true, createdAt: "", updatedAt: "" },
          typeMusic: "TRENDING" as MusicType,
          durationSeconds: 355,
          imageUrl: "https://via.placeholder.com/400x400",
          fileUrl: "",
          playCount: 2000000,
          likeCount: 100000,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        },
        playedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        userId: 1
      },
      {
        id: 2,
        music: {
          id: 2,
          title: "Hotel California",
          artist: { id: 2, name: "Eagles", isActive: true, createdAt: "", updatedAt: "" },
          category: { id: 1, name: "Rock", isActive: true, createdAt: "", updatedAt: "" },
          typeMusic: "TOP_VIEW" as MusicType,
          durationSeconds: 391,
          imageUrl: "https://via.placeholder.com/400x400",
          fileUrl: "",
          playCount: 1500000,
          likeCount: 80000,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        },
        playedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        userId: 1
      },
      {
        id: 3,
        music: {
          id: 3,
          title: "Imagine",
          artist: { id: 3, name: "John Lennon", isActive: true, createdAt: "", updatedAt: "" },
          category: { id: 3, name: "Pop", isActive: true, createdAt: "", updatedAt: "" },
          typeMusic: "FAVORITE" as MusicType,
          durationSeconds: 183,
          imageUrl: "https://via.placeholder.com/400x400",
          fileUrl: "",
          playCount: 1200000,
          likeCount: 90000,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        },
        playedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        userId: 1
      }
    ];
  }

  playMusic(music: Music) {
    this.musicPlayerService.playTrack(music, this.recentlyPlayed.map(item => item.music));

    // Add to recently played (in real app, this would be handled by the music player service)
    this.userMusicService.addToRecentlyPlayed(music);
  }

  isCurrentTrack(music: Music): boolean {
    const currentTrack = this.musicPlayerService.getCurrentTrack();
    return currentTrack?.id === music.id;
  }

  addToFavorites(music: Music) {
    this.userMusicService.addToFavorites(music.id).subscribe({
      next: () => {
        console.log('Added to favorites:', music.title);
      },
      error: (error) => {
        console.error('Error adding to favorites:', error);
      }
    });
  }
  isFavorite(musicId: number): boolean {
    return this.favoriteStates[musicId] || false;
  }

  clearHistory() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử nghe nhạc?')) {
      this.userMusicService.clearRecentlyPlayed().subscribe({
        next: () => {
          this.recentlyPlayed = [];
        },
        error: (error) => {
          console.error('Error clearing history:', error);
        }
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

  formatPlayedTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString('vi-VN');
  }
}
