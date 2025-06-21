import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../core/services/music.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { UserMusicService } from '../../../core/services/user-music.service';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Music, MusicType } from '../../../core/models/music.model';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="music-list-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="fas fa-music"></i>
            <span *ngIf="!selectedCategoryName">Music Library</span>
            <span *ngIf="selectedCategoryName"
              >{{ selectedCategoryName }} Music</span
            >
          </h1>
          <p *ngIf="!selectedCategoryName">
            Discover and play thousands of songs from your favorite artists
          </p>
          <p *ngIf="selectedCategoryName">
            Discover and play songs in the {{ selectedCategoryName }} category
          </p>
          <div *ngIf="selectedCategoryName" class="category-breadcrumb">
            <a routerLink="/categories" class="breadcrumb-link">
              <i class="fas fa-arrow-left"></i>
              Back to Categories
            </a>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="search-filters">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for songs, artists, albums..."
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              class="search-input"
            />
            <button
              *ngIf="searchQuery"
              (click)="clearSearch()"
              class="clear-btn"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="filter-controls">
            <select
              [(ngModel)]="selectedType"
              (change)="onFilterChange()"
              class="filter-select"
            >
              <option value="">All Types</option>
              <option value="TRENDING">Trending</option>
              <option value="NEW_MUSIC">New Releases</option>
              <option value="TOP_VIEW">Top Charts</option>
              <option value="VN_LOFI">VN Lofi</option>
              <option value="FAVORITE">Favorites</option>
            </select>

            <select
              [(ngModel)]="sortBy"
              (change)="onSortChange()"
              class="filter-select"
            >
              <option value="createdAt">Latest</option>
              <option value="title">Title</option>
              <option value="playCount">Most Played</option>
              <option value="likeCount">Most Liked</option>
            </select>

            <button (click)="toggleViewMode()" class="view-toggle">
              <i
                class="fas"
                [class.fa-th-large]="viewMode === 'grid'"
                [class.fa-list]="viewMode === 'list'"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading music...</p>
      </div>
      <!-- Empty State -->
      <div *ngIf="!isLoading && musicList.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-music"></i>
        </div>
        <h3 *ngIf="!selectedCategoryName">No music found</h3>
        <h3 *ngIf="selectedCategoryName">
          No music found in {{ selectedCategoryName }}
        </h3>
        <p *ngIf="!selectedCategoryName">
          Try adjusting your search or filters
        </p>
        <p *ngIf="selectedCategoryName">
          This category doesn't have any songs yet
        </p>
        <button (click)="clearFilters()" class="btn btn-primary">
          <i class="fas fa-refresh"></i>
          <span *ngIf="!selectedCategoryName">Clear Filters</span>
          <span *ngIf="selectedCategoryName">View All Music</span>
        </button>
      </div>

      <!-- Music Grid View -->
      <div
        *ngIf="!isLoading && musicList.length > 0 && viewMode === 'grid'"
        class="music-grid"
      >
        <div
          *ngFor="let music of musicList"
          class="music-card"
          (click)="playMusic(music)"
        >
          <div class="music-image">
            <img
              [src]="music.imageUrl || '/assets/default-music.png'"
              [alt]="music.title"
            />
            <div class="play-overlay">
              <div class="play-button">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div
              class="music-type-badge"
              [class]="getTypeBadgeClass(music.typeMusic)"
            >
              {{ getTypeDisplayName(music.typeMusic) }}
            </div>
          </div>
          <div class="music-info">
            <h4>{{ music.title }}</h4>
            <p>{{ music.artist?.name || 'Unknown Artist' }}</p>
            <div class="music-stats">
              <span
                ><i class="fas fa-headphones"></i>
                {{ formatPlayCount(music.playCount) }}</span
              >
              <span><i class="fas fa-heart"></i> {{ music.likeCount }}</span>
              <span
                ><i class="fas fa-clock"></i>
                {{ formatDuration(music.durationSeconds) }}</span
              >
            </div>
          </div>
          <div class="music-actions">
            <button
              (click)="$event.stopPropagation(); toggleFavorite(music)"
              class="action-btn"
            >
              <i class="fas fa-heart" [class.active]="isFavorite(music.id)"></i>
            </button>
            <button
              *ngIf="!myListStates[music.id]"
              (click)="$event.stopPropagation(); addToPlaylist(music)"
              class="action-btn"
            >
              <i class="fas fa-plus"></i>
            </button>
            <button
              *ngIf="myListStates[music.id]"
              (click)="$event.stopPropagation(); removeFromPlaylist(music)"
              class="action-btn"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              (click)="$event.stopPropagation(); shareMusic(music)"
              class="action-btn"
              title="Copy share link"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Music List View -->
      <div
        *ngIf="!isLoading && musicList.length > 0 && viewMode === 'list'"
        class="music-table"
      >
        <div class="table-header">
          <div class="col-track">#</div>
          <div class="col-title">Title</div>
          <div class="col-artist">Artist</div>
          <div class="col-album">Category</div>
          <div class="col-duration">Duration</div>
          <div class="col-plays">Plays</div>
          <div class="col-actions">Actions</div>
        </div>

        <div
          *ngFor="let music of musicList; let i = index"
          class="table-row"
          [class.playing]="isCurrentTrack(music)"
          (click)="playMusic(music)"
        >
          <div class="col-track">
            <span *ngIf="!isCurrentTrack(music)" class="track-number">{{
              i + 1
            }}</span>
            <i
              *ngIf="isCurrentTrack(music)"
              class="fas fa-volume-up playing-icon"
            ></i>
          </div>
          <div class="col-title">
            <div class="track-info">
              <img
                [src]="music.imageUrl || '/assets/default-music.png'"
                [alt]="music.title"
                class="track-image"
              />
              <div class="track-details">
                <span class="track-title">{{ music.title }}</span>
                <span class="track-type">{{
                  getTypeDisplayName(music.typeMusic)
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-artist">
            {{ music.artist?.name || 'Unknown Artist' }}
          </div>
          <div class="col-album">
            {{ music.category?.name || 'Uncategorized' }}
          </div>
          <div class="col-duration">
            {{ formatDuration(music.durationSeconds) }}
          </div>
          <div class="col-plays">{{ formatPlayCount(music.playCount) }}</div>
          <div class="col-actions">
            <button
              (click)="$event.stopPropagation(); toggleFavorite(music)"
              class="action-btn"
            >
              <i class="fas fa-heart" [class.active]="isFavorite(music.id)"></i>
            </button>
            <button
              *ngIf="!myListStates[music.id]"
              (click)="$event.stopPropagation(); addToPlaylist(music)"
              class="action-btn"
            >
              <i class="fas fa-plus"></i>
            </button>
            <button
              *ngIf="myListStates[music.id]"
              (click)="$event.stopPropagation(); removeFromPlaylist(music)"
              class="action-btn"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              (click)="$event.stopPropagation(); shareMusic(music)"
              class="action-btn"
              title="Copy share link"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="!isLoading && musicList.length > 0" class="pagination">
        <button
          (click)="previousPage()"
          [disabled]="currentPage === 0"
          class="page-btn"
        >
          <i class="fas fa-chevron-left"></i>
          Previous
        </button>

        <div class="page-info">
          <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <span class="total-items">{{ totalItems }} songs total</span>
        </div>

        <button
          (click)="nextPage()"
          [disabled]="currentPage >= totalPages - 1"
          class="page-btn"
        >
          Next
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div *ngIf="userMessage" class="copy-toast">
        {{ userMessage }}
      </div>
    </div>
  `,
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  musicList: Music[] = [];
  isLoading = false;
  searchQuery = '';
  selectedType = '';
  selectedCategoryId: number | null = null;
  selectedCategoryName: string | null = null;
  sortBy = 'createdAt';
  viewMode: 'grid' | 'list' = 'grid';
  favoriteStates: { [key: number]: boolean } = {}; // Track favorite states
  myListStates: { [key: number]: boolean } = {};
  copySuccess = false;
  userMessage = '';

  // Pagination
  currentPage = 0;
  pageSize = 20;
  totalPages = 0;
  totalItems = 0;
  constructor(
    private musicService: MusicService,
    private musicPlayerService: MusicPlayerService,
    private userMusicService: UserMusicService,
    private route: ActivatedRoute,
    private sidebarService: SidebarService
  ) {}
  ngOnInit() {
    // Subscribe to query parameters to handle category filtering
    this.route.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['categoryId']
        ? +params['categoryId']
        : null;
      this.selectedCategoryName = params['categoryName'] || null;
      this.currentPage = 0; // Reset to first page when category changes
      this.loadMusic();
    });
  }
  loadMusic() {
    this.isLoading = true;

    const params = {
      page: this.currentPage,
      size: this.pageSize,
      search: this.searchQuery,
      sort: this.sortBy,
    };

    let observable;
    if (this.selectedCategoryId) {
      // Load music by category
      observable = this.musicService.getMusicByCategory(
        this.selectedCategoryId,
        params
      );
    } else if (this.selectedType) {
      // Load music by type
      observable = this.musicService.getMusicByType(
        this.selectedType as MusicType,
        params
      );
    } else {
      // Load all music
      observable = this.musicService.getAllMusic(params);
    }
    observable.subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.musicList = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalElements;
          this.loadFavoriteStates();
          this.loadMyListStates();
        }
      },
      error: (error: any) => {
        console.error('Error loading music:', error);
        this.loadMockData();
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  loadMockData() {
    // Mock data for development
    this.musicList = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Song ${i + 1}`,
      fileUrl: '',
      imageUrl: '',
      durationSeconds: 180 + Math.floor(Math.random() * 120),
      playCount: Math.floor(Math.random() * 10000),
      likeCount: Math.floor(Math.random() * 1000),
      isActive: true,
      typeMusic: ['TRENDING', 'NEW_MUSIC', 'TOP_VIEW'][
        Math.floor(Math.random() * 3)
      ] as MusicType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      artist: {
        id: 1,
        name: `Artist ${i + 1}`,
        isActive: true,
        createdAt: '',
        updatedAt: '',
      },
      category: {
        id: 1,
        name: 'Pop',
        isActive: true,
        createdAt: '',
        updatedAt: '',
      },
    }));
    this.totalPages = 3;
    this.totalItems = 60;
  }

  loadFavoriteStates() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.log('Chưa đăng nhập, không load favorite');
      return;
    }
    // Initialize favorite states for current music list
    this.musicList.forEach((music) => {
      this.userMusicService.isFavorite(music.id).subscribe((isFavorite) => {
        this.favoriteStates[music.id] = isFavorite;
      });
    });
  }
  loadMyListStates() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.log('Chưa đăng nhập, không load my list');
      return;
    }
    this.musicList.forEach((music) => {
      this.userMusicService.isInMyList(music.id).subscribe((isInMyList) => {
        this.myListStates[music.id] = isInMyList;
      });
    });
  }

  onSearch() {
    this.currentPage = 0;
    this.loadMusic();
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearch();
  }

  onFilterChange() {
    this.currentPage = 0;
    this.loadMusic();
  }

  onSortChange() {
    this.currentPage = 0;
    this.loadMusic();
  }
  clearFilters() {
    this.searchQuery = '';
    this.selectedType = '';
    this.sortBy = 'createdAt';
    this.currentPage = 0;
    // Clear category filter by navigating without query params
    if (this.selectedCategoryId) {
      // Navigate to music list without category query params
      window.location.href = '/music';
      return;
    }
    this.loadMusic();
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  playMusic(music: Music) {
    this.musicPlayerService.playTrack(music, this.musicList);
  }

  isCurrentTrack(music: Music): boolean {
    const currentTrack = this.musicPlayerService.getCurrentTrack();
    return currentTrack?.id === music.id;
  }
  toggleFavorite(music: Music) {
    const isCurrentlyFavorite = this.favoriteStates[music.id] || false;
    if (isCurrentlyFavorite) {
      this.userMusicService.removeFromFavorites(music.id).subscribe({
        next: () => {
          this.favoriteStates[music.id] = false;
          music.isFavorite = false;
          this.showUserMessage('Removed from favorites!');
        },
        error: (error: any) => {
          console.error('Error removing from favorites:', error);
        },
      });
    } else {
      this.userMusicService.addToFavorites(music.id).subscribe({
        next: () => {
          this.favoriteStates[music.id] = true;
          music.isFavorite = true;
          this.showUserMessage('Added to favorites!');
        },
        error: (error: any) => {
          console.error('Error adding to favorites:', error);
        },
      });
    }
  }

  addToPlaylist(music: Music) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;
    if (!userId) {
      this.showUserMessage('Vui lòng đăng nhập để lưu vào danh sách nghe của bạn!');
      return;
    }
    this.userMusicService.addToMyList(music.id, userId).subscribe({
      next: () => {
        this.myListStates[music.id] = true;
        this.showUserMessage('Thêm bài hát vào danh sách nghe!');
        // Phát sự kiện cập nhật sidebar (nếu có)
        this.sidebarService.notifyMyListChanged(); // <-- thêm dòng này nếu có Subject trong SidebarService
        console.log('Added to my list:', music.title);
      },
      error: (error: any) => {
        console.error('Error adding to my list:', error);
      },
    });
  }

  removeFromPlaylist(music: Music) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;
    this.userMusicService.removeFromMyList(music.id, userId).subscribe({
      next: () => {
        this.myListStates[music.id] = false;
        // Cập nhật sidebar ngay
        this.sidebarService.notifyMyListChanged();
        this.showUserMessage('Đã xóa khỏi danh sách nghe!');
      },
      error: (error: any) => {
        console.error('Error removing from my list:', error);
      },
    });
  }

  shareMusic(music: Music) {
    const shareUrl = `${window.location.origin}/music/${music.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        this.showUserMessage('Link copied!');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.showUserMessage('Link copied!');
      } catch {}
      document.body.removeChild(textarea);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMusic();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMusic();
    }
  }

  getTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      TRENDING: 'badge-trending',
      NEW_MUSIC: 'badge-new',
      TOP_VIEW: 'badge-top',
      VN_LOFI: 'badge-lofi',
      FAVORITE: 'badge-favorite',
    };
    return classes[type] || 'badge-default';
  }

  getTypeDisplayName(type: string): string {
    const names: { [key: string]: string } = {
      TRENDING: 'Trending',
      NEW_MUSIC: 'New',
      TOP_VIEW: 'Top',
      VN_LOFI: 'Lofi',
      FAVORITE: 'Favorite',
    };
    return names[type] || 'Music';
  }
  isFavorite(musicId: number): boolean {
    // Use local state for synchronous access
    return this.favoriteStates[musicId] || false;
  }

  formatPlayCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  showUserMessage(msg: string) {
    this.userMessage = msg;
    setTimeout(() => (this.userMessage = ''), 1300);
  }

  showQueue() {
    this.sidebarService.open();
  }
}
