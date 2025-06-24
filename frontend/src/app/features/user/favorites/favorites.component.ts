import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserMusicService, FavoriteMusic, FavoritePlaylist } from '../../../core/services/user-music.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { Music, MusicType } from '../../../core/models/music.model';
import { Playlist } from '../../../core/models/playlist.model';

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
            Your Favorites
          </h1>
          <p>Your collection of loved music and playlists</p>
          <div class="stats" *ngIf="favorites.length > 0 || favoritePlaylists.length > 0">
            <span class="stat-item">
              <i class="fas fa-music"></i>
              {{ favorites.length }} bài hát
            </span>
            <span class="stat-item">
              <i class="fas fa-list-music"></i>
              {{ favoritePlaylists.length }} playlist
            </span>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button [class.active]="activeTab === 'music'"
                (click)="activeTab = 'music'"
                class="tab-btn">
          <i class="fas fa-music"></i>
          Favorite Songs ({{ favorites.length }})
        </button>
        <button [class.active]="activeTab === 'playlists'"
                (click)="activeTab = 'playlists'"
                class="tab-btn">
          <i class="fas fa-list-music"></i>
          Favorite Playlists ({{ favoritePlaylists.length }})
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Đang tải danh sách yêu thích...</p>
      </div>

      <!-- Music Tab -->
      <div *ngIf="activeTab === 'music'" class="tab-content">
        <!-- Empty State for Music -->
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

      <!-- Playlists Tab -->
      <div *ngIf="activeTab === 'playlists'" class="tab-content">
        <!-- Empty State for Playlists -->
        <div *ngIf="!isLoading && favoritePlaylists.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-list-music"></i>
          </div>
          <h3>Chưa có playlist yêu thích</h3>
          <p>Khám phá và thêm những playlist bạn yêu thích vào đây</p>
          <button routerLink="/playlist" class="btn btn-primary">
            <i class="fas fa-search"></i>
            Khám phá playlist
          </button>
        </div>

        <!-- Favorite Playlists Grid -->
        <div *ngIf="!isLoading && favoritePlaylists.length > 0" class="playlists-grid">
          <div class="list-header">
            <div class="bulk-actions">
              <button (click)="clearAllFavoritePlaylists()" class="btn btn-outline"
                      [disabled]="favoritePlaylists.length === 0">
                <i class="fas fa-trash"></i>
                Xóa tất cả
              </button>
            </div>
          </div>

          <div class="playlist-cards">
            <div *ngFor="let favoritePlaylist of favoritePlaylists"
                 class="playlist-card"
                 [routerLink]="['/playlist', favoritePlaylist.playlist.id]">
              <div class="playlist-image">
                <img [src]="favoritePlaylist.playlist.imageUrl || '/assets/default-playlist.png'"
                     [alt]="favoritePlaylist.playlist.name">
                <div class="playlist-overlay">
                  <div class="play-button" (click)="$event.stopPropagation(); playPlaylist(favoritePlaylist.playlist)">
                    <i class="fas fa-play"></i>
                  </div>
                </div>
                <div class="playlist-type" [class.public]="favoritePlaylist.playlist.isPublic" [class.private]="!favoritePlaylist.playlist.isPublic">
                  <i class="fas" [class.fa-globe]="favoritePlaylist.playlist.isPublic" [class.fa-lock]="!favoritePlaylist.playlist.isPublic"></i>
                </div>
              </div>

              <div class="playlist-info">
                <h3>{{ favoritePlaylist.playlist.name }}</h3>
                <p class="playlist-description">{{ favoritePlaylist.playlist.description || 'No description' }}</p>
                <div class="playlist-meta">
                  <span class="song-count">
                    <i class="fas fa-music"></i>
                    {{ favoritePlaylist.playlist.songCount }} {{ favoritePlaylist.playlist.songCount === 1 ? 'song' : 'songs' }}
                  </span>
                  <span class="duration">
                    <i class="fas fa-clock"></i>
                    {{ formatDuration(favoritePlaylist.playlist.totalDurationSeconds || 0) }}
                  </span>
                </div>
                <div class="playlist-creator">
                  <span>By {{ favoritePlaylist.playlist.createdBy }}</span>
                  <span class="added-date">Added {{ formatDate(favoritePlaylist.addedAt) }}</span>
                </div>
              </div>

              <div class="playlist-actions" (click)="$event.stopPropagation()">
                <button (click)="playPlaylist(favoritePlaylist.playlist)" class="action-btn play-btn">
                  <i class="fas fa-play"></i>
                </button>
                <button (click)="removeFromFavoritePlaylists(favoritePlaylist.playlist.id)" class="action-btn remove-btn">
                  <i class="fas fa-heart-broken"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: FavoriteMusic[] = [];
  favoritePlaylists: FavoritePlaylist[] = [];
  isLoading = false;
  activeTab: 'music' | 'playlists' = 'music';

  private subscriptions = new Subscription();

  constructor(
    private userMusicService: UserMusicService,
    private musicPlayerService: MusicPlayerService
  ) {}  ngOnInit() {
    console.log('🎵 Favorites component initialized');
    this.loadFavorites();
    this.loadFavoritePlaylists();

    // Subscribe to favorites refresh events
    const refreshSub = this.userMusicService.favoritesRefresh$.subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        console.log('🔄 Refreshing favorites list due to external change');
        this.loadFavorites();
      }
    });
    this.subscriptions.add(refreshSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }  loadFavorites() {
    console.log('📋 Loading favorites...');
    this.isLoading = true;

    this.userMusicService.getFavorites().subscribe({
      next: (response) => {
        console.log('✅ Favorites loaded:', response);
        if (response.success && response.data) {
          this.favorites = response.data.content;
          console.log(`📊 Loaded ${this.favorites.length} favorite songs`);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading favorites:', error);
        this.isLoading = false;
        // Fallback to empty list or show error message
        this.favorites = [];
      }
    });
  }

  loadFavoritePlaylists() {
    this.userMusicService.getFavoritePlaylists().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.favoritePlaylists = response.data.content;
        }
      },
      error: (error) => {
        console.error('Error loading favorite playlists:', error);
        this.favoritePlaylists = [];
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
        console.log('✅ Removed from favorites:', musicId);
        // Don't need to manually filter here - the service will trigger refresh
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

  // ===== PLAYLIST METHODS =====
  playPlaylist(playlist: Playlist) {
    console.log('Play playlist:', playlist.name);
    // TODO: Implement playlist playback
  }

  removeFromFavoritePlaylists(playlistId: number) {
    this.userMusicService.removeFromFavoritePlaylists(playlistId).subscribe({
      next: (response) => {
        if (response.success) {
          this.favoritePlaylists = this.favoritePlaylists.filter(fp => fp.playlist.id !== playlistId);
        }
      },
      error: (error) => {
        console.error('Error removing playlist from favorites:', error);
      }
    });
  }

  clearAllFavoritePlaylists() {
    if (confirm('Bạn có chắc muốn xóa tất cả playlist yêu thích?')) {
      // Remove all favorite playlists
      const removePromises = this.favoritePlaylists.map(fp =>
        this.userMusicService.removeFromFavoritePlaylists(fp.playlist.id).toPromise()
      );

      Promise.all(removePromises).then(() => {
        this.favoritePlaylists = [];
      }).catch(error => {
        console.error('Error clearing all favorite playlists:', error);
      });
    }
  }
}
