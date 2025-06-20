import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../core/models/playlist.model';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="playlist-list-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="fas fa-list-music"></i>
            My Playlists
          </h1>
          <p>Create and manage your music collections</p>
        </div>

        <div class="header-actions">
          <button (click)="createPlaylist()" class="btn btn-primary">
            <i class="fas fa-plus"></i>
            Create Playlist
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="search-filters">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search playlists..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="search-input">
          <button *ngIf="searchQuery" (click)="clearSearch()" class="clear-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="filter-controls">
          <select [(ngModel)]="filterType" (change)="onFilterChange()" class="filter-select">
            <option value="">All Playlists</option>
            <option value="my">My Playlists</option>
            <option value="public">Public Playlists</option>
            <option value="liked">Liked Playlists</option>
          </select>

          <select [(ngModel)]="sortBy" (change)="onSortChange()" class="filter-select">
            <option value="updatedAt">Recently Updated</option>
            <option value="createdAt">Recently Created</option>
            <option value="name">Name</option>
            <option value="songCount">Song Count</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading playlists...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && playlists.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-list-music"></i>
        </div>
        <h3>No playlists found</h3>
        <p>Start creating your first playlist to organize your favorite music</p>
        <button (click)="createPlaylist()" class="btn btn-primary">
          <i class="fas fa-plus"></i>
          Create Your First Playlist
        </button>
      </div>

      <!-- Playlists Grid -->
      <div *ngIf="!isLoading && playlists.length > 0" class="playlists-grid">
        <div *ngFor="let playlist of playlists" class="playlist-card" (click)="openPlaylist(playlist)">
          <div class="playlist-image">
            <img [src]="playlist.imageUrl || '/assets/default-playlist.png'" [alt]="playlist.name">
            <div class="playlist-overlay">
              <div class="play-button">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="playlist-type" [class.public]="playlist.isPublic" [class.private]="!playlist.isPublic">
              <i class="fas" [class.fa-globe]="playlist.isPublic" [class.fa-lock]="!playlist.isPublic"></i>
            </div>
          </div>

          <div class="playlist-info">
            <h3>{{ playlist.name }}</h3>
            <p class="playlist-description">{{ playlist.description || 'No description' }}</p>
            <div class="playlist-meta">
              <span class="song-count">
                <i class="fas fa-music"></i>
                {{ playlist.songCount }} {{ playlist.songCount === 1 ? 'song' : 'songs' }}
              </span>              <span class="duration">
                <i class="fas fa-clock"></i>
                {{ formatDuration(playlist.totalDurationSeconds || playlist.totalDuration || 0) }}
              </span>
            </div>
            <div class="playlist-creator">
              <span>By {{ playlist.createdBy }}</span>
              <span class="creation-date">{{ getTimeAgo(playlist.createdAt) }}</span>
            </div>
          </div>

          <div class="playlist-actions" (click)="$event.stopPropagation()">
            <button (click)="playPlaylist(playlist)" class="action-btn play-btn">
              <i class="fas fa-play"></i>
            </button>
            <button (click)="toggleLike(playlist)" class="action-btn like-btn">
              <i class="fas fa-heart" [class.active]="playlist.isLiked"></i>
            </button>
            <button (click)="showPlaylistMenu(playlist)" class="action-btn menu-btn">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="!isLoading && playlists.length > 0" class="pagination">
        <button
          (click)="previousPage()"
          [disabled]="currentPage === 0"
          class="page-btn">
          <i class="fas fa-chevron-left"></i>
          Previous
        </button>

        <div class="page-info">
          <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <span class="total-items">{{ totalItems }} playlists total</span>
        </div>

        <button
          (click)="nextPage()"
          [disabled]="currentPage >= totalPages - 1"
          class="page-btn">
          Next
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  isLoading = false;
  searchQuery = '';
  filterType = '';
  sortBy = 'updatedAt';

  // Pagination
  currentPage = 0;
  pageSize = 12;
  totalPages = 0;
  totalItems = 0;

  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlaylists();
  }
  loadPlaylists() {
    this.isLoading = true;

    this.playlistService.getPlaylists().subscribe({
      next: (response) => {
        if (response.success) {
          this.playlists = response.data.content;
          this.totalItems = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading playlists:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 0;
    this.loadPlaylists();
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearch();
  }

  onFilterChange() {
    this.currentPage = 0;
    this.loadPlaylists();
  }

  onSortChange() {
    this.currentPage = 0;
    this.loadPlaylists();
  }

  createPlaylist() {
    console.log('Create new playlist');
    // TODO: Show create playlist modal
  }
  openPlaylist(playlist: Playlist) {
    this.router.navigate(['/playlist', playlist.id]);
  }

  playPlaylist(playlist: Playlist) {
    console.log('Play playlist:', playlist.name);
    // TODO: Start playing playlist
  }

  toggleLike(playlist: Playlist) {
    playlist.isLiked = !playlist.isLiked;
    console.log('Toggle like:', playlist.name, playlist.isLiked);
  }

  showPlaylistMenu(playlist: Playlist) {
    console.log('Show menu for:', playlist.name);
    // TODO: Show context menu
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPlaylists();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPlaylists();
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }
}
