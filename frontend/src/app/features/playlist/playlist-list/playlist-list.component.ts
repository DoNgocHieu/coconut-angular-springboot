import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserMusicService } from '../../../core/services/user-music.service';
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
            </button>            <button (click)="toggleLike(playlist)" class="action-btn like-btn">
              <i class="fas fa-heart" [class.active]="playlist.isLiked"></i>
            </button>
            <button (click)="showPlaylistMenu(playlist, $event)" class="action-btn menu-btn">
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
          <i class="fas fa-chevron-right"></i>        </button>
      </div>

      <!-- Create/Edit Playlist Modal -->
      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>
              <i class="fas fa-list-music"></i>
              {{ editingPlaylist ? 'Edit Playlist' : 'Create New Playlist' }}
            </h2>
            <button (click)="closeModal()" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <form (ngSubmit)="savePlaylist()" #playlistForm="ngForm" class="modal-body">
            <div class="form-group">
              <label for="playlistName">Playlist Name *</label>
              <input
                id="playlistName"
                type="text"
                [(ngModel)]="playlistFormData.name"
                name="name"
                required
                maxlength="100"
                placeholder="Enter playlist name"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="playlistDescription">Description</label>
              <textarea
                id="playlistDescription"
                [(ngModel)]="playlistFormData.description"
                name="description"
                maxlength="500"
                rows="3"
                placeholder="Describe your playlist (optional)"
                class="form-control"></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  [(ngModel)]="playlistFormData.isPublic"
                  name="isPublic"
                  class="checkbox">
                <span class="checkmark"></span>
                Make this playlist public
              </label>
              <small class="form-hint">Public playlists can be discovered and listened to by other users</small>
            </div>

            <div class="modal-actions">
              <button type="button" (click)="closeModal()" class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" [disabled]="!playlistForm.valid || isSubmitting" class="btn btn-primary">
                <i *ngIf="isSubmitting" class="fas fa-spinner fa-spin"></i>
                <i *ngIf="!isSubmitting" class="fas" [class.fa-plus]="!editingPlaylist" [class.fa-save]="editingPlaylist"></i>
                {{ editingPlaylist ? 'Update Playlist' : 'Create Playlist' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div *ngIf="showDeleteModal" class="modal-overlay" (click)="closeDeleteModal()">
        <div class="modal-content delete-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>
              <i class="fas fa-trash-alt"></i>
              Delete Playlist
            </h2>
            <button (click)="closeDeleteModal()" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body">
            <p>Are you sure you want to delete <strong>"{{ playlistToDelete?.name }}"</strong>?</p>
            <p class="warning-text">This action cannot be undone. All songs in this playlist will be removed.</p>
          </div>

          <div class="modal-actions">
            <button (click)="closeDeleteModal()" class="btn btn-secondary">
              Cancel
            </button>
            <button (click)="confirmDelete()" [disabled]="isDeleting" class="btn btn-danger">
              <i *ngIf="isDeleting" class="fas fa-spinner fa-spin"></i>
              <i *ngIf="!isDeleting" class="fas fa-trash-alt"></i>
              {{ isDeleting ? 'Deleting...' : 'Delete Playlist' }}
            </button>
          </div>
        </div>
      </div>      <!-- Context Menu -->
      <div *ngIf="showContextMenu && contextMenuPlaylist" class="context-menu" [style.left.px]="contextMenuPosition.x" [style.top.px]="contextMenuPosition.y">
        <div class="context-menu-item" (click)="editPlaylist(contextMenuPlaylist)">
          <i class="fas fa-edit"></i>
          Edit Playlist
        </div>
        <div class="context-menu-item" (click)="duplicatePlaylist(contextMenuPlaylist)">
          <i class="fas fa-copy"></i>
          Duplicate
        </div>
        <div class="context-menu-item" (click)="sharePlaylist(contextMenuPlaylist)">
          <i class="fas fa-share"></i>
          Share
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" (click)="showDeleteConfirmation(contextMenuPlaylist)">
          <i class="fas fa-trash-alt"></i>
          Delete
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div *ngIf="message" class="toast" [class.success]="message.type === 'success'" [class.error]="message.type === 'error'">
        <i class="fas" [class.fa-check-circle]="message.type === 'success'" [class.fa-exclamation-circle]="message.type === 'error'"></i>
        {{ message.text }}
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

  // Modal states
  showModal = false;
  showDeleteModal = false;
  showContextMenu = false;
  editingPlaylist: Playlist | null = null;
  playlistToDelete: Playlist | null = null;
  contextMenuPlaylist: Playlist | null = null;
  contextMenuPosition = { x: 0, y: 0 };
  isSubmitting = false;
  isDeleting = false;

  // Form data
  playlistFormData = {
    name: '',
    description: '',
    isPublic: false
  };

  // Messages
  message: { type: 'success' | 'error', text: string } | null = null;
  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private userMusicService: UserMusicService,
    private router: Router
  ) {}  ngOnInit() {
    this.loadPlaylists();
    this.loadPlaylistFavoriteStates();
    // Close context menu on outside click only in browser
    if (typeof document !== 'undefined') {
      document.addEventListener('click', () => {
        this.showContextMenu = false;
      });
    }
  }

  loadPlaylistFavoriteStates() {
    // Load favorite states for all playlists
    this.playlists.forEach(playlist => {
      this.userMusicService.isFavoritePlaylist(playlist.id).subscribe({
        next: (isFavorite) => {
          playlist.isLiked = isFavorite;
        },
        error: (error) => {
          console.warn('Could not load favorite state for playlist:', playlist.id);
          playlist.isLiked = false;
        }
      });
    });
  }loadPlaylists() {
    this.isLoading = true;
    console.log('Loading playlists...');

    this.playlistService.getPlaylists().subscribe({
      next: (response) => {
        console.log('Playlists response:', response);        if (response.success) {
          this.playlists = response.data.content;
          this.totalItems = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
          console.log('Playlists loaded:', this.playlists.length, 'playlists');

          // Load favorite states after playlists are loaded
          this.loadPlaylistFavoriteStates();
        }
        this.isLoading = false;
      },      error: (error) => {
        console.error('Error loading playlists:', error);
        if (error.status === 403) {
          console.log('User not authenticated, showing empty playlists');
          this.playlists = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.currentPage = 0;
        }
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
    this.editingPlaylist = null;
    this.playlistFormData = {
      name: '',
      description: '',
      isPublic: false
    };
    this.showModal = true;
  }

  editPlaylist(playlist: Playlist) {
    this.editingPlaylist = playlist;
    this.playlistFormData = {
      name: playlist.name,
      description: playlist.description || '',
      isPublic: playlist.isPublic
    };
    this.showModal = true;
    this.showContextMenu = false;
  }

  closeModal() {
    this.showModal = false;
    this.editingPlaylist = null;
    this.playlistFormData = {
      name: '',
      description: '',
      isPublic: false
    };
  }

  savePlaylist() {
    if (!this.playlistFormData.name.trim()) return;

    this.isSubmitting = true;    const playlistData = {
      name: this.playlistFormData.name.trim(),
      description: this.playlistFormData.description?.trim() || undefined,
      isPublic: this.playlistFormData.isPublic
    };

    const request = this.editingPlaylist
      ? this.playlistService.updatePlaylist(this.editingPlaylist.id, playlistData)
      : this.playlistService.createPlaylist(playlistData);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('success', this.editingPlaylist ? 'Playlist updated successfully!' : 'Playlist created successfully!');
          this.closeModal();
          this.loadPlaylists();
        } else {
          this.showMessage('error', response.message || 'Failed to save playlist');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error saving playlist:', error);
        this.showMessage('error', 'Failed to save playlist. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  showDeleteConfirmation(playlist: Playlist) {
    this.playlistToDelete = playlist;
    this.showDeleteModal = true;
    this.showContextMenu = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.playlistToDelete = null;
  }

  confirmDelete() {
    if (!this.playlistToDelete) return;

    this.isDeleting = true;
    this.playlistService.deletePlaylist(this.playlistToDelete.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('success', 'Playlist deleted successfully!');
          this.closeDeleteModal();
          this.loadPlaylists();
        } else {
          this.showMessage('error', response.message || 'Failed to delete playlist');
        }
        this.isDeleting = false;
      },
      error: (error) => {
        console.error('Error deleting playlist:', error);
        this.showMessage('error', 'Failed to delete playlist. Please try again.');
        this.isDeleting = false;
      }
    });
  }

  showPlaylistMenu(playlist: Playlist, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    }
    this.contextMenuPlaylist = playlist;
    this.showContextMenu = true;
  }
  toggleLike(playlist: Playlist) {
    const wasLiked = playlist.isLiked;

    if (wasLiked) {
      // Remove from favorites
      this.userMusicService.removeFromFavoritePlaylists(playlist.id).subscribe({
        next: (response) => {
          if (response.success) {
            playlist.isLiked = false;
            this.showMessage('success', `Removed "${playlist.name}" from favorites!`);
          } else {
            this.showMessage('error', response.message || 'Failed to remove from favorites');
          }
        },
        error: (error) => {
          console.error('Error removing playlist from favorites:', error);
          this.showMessage('error', 'Failed to remove from favorites. Please try again.');
        }
      });
    } else {
      // Add to favorites
      this.userMusicService.addToFavoritePlaylists(playlist.id).subscribe({
        next: (response) => {
          if (response.success) {
            playlist.isLiked = true;
            this.showMessage('success', `Added "${playlist.name}" to favorites!`);
          } else {
            this.showMessage('error', response.message || 'Failed to add to favorites');
          }
        },
        error: (error) => {
          console.error('Error adding playlist to favorites:', error);
          this.showMessage('error', 'Failed to add to favorites. Please try again.');
        }
      });
    }
  }

  duplicatePlaylist(playlist: Playlist) {
    const duplicateData = {
      name: `${playlist.name} (Copy)`,
      description: playlist.description,
      isPublic: false // Always create copies as private
    };

    this.playlistService.createPlaylist(duplicateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('success', 'Playlist duplicated successfully!');
          this.loadPlaylists();
        } else {
          this.showMessage('error', response.message || 'Failed to duplicate playlist');
        }
      },
      error: (error) => {
        console.error('Error duplicating playlist:', error);
        this.showMessage('error', 'Failed to duplicate playlist. Please try again.');
      }
    });
    this.showContextMenu = false;
  }

  sharePlaylist(playlist: Playlist) {
    if (navigator.share) {
      navigator.share({
        title: playlist.name,
        text: `Check out this playlist: ${playlist.name}`,
        url: `${window.location.origin}/playlist/${playlist.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/playlist/${playlist.id}`);
      this.showMessage('success', 'Playlist link copied to clipboard!');
    }
    this.showContextMenu = false;
  }

  showMessage(type: 'success' | 'error', text: string) {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  openPlaylist(playlist: Playlist) {
    this.router.navigate(['/playlist', playlist.id]);
  }

  playPlaylist(playlist: Playlist) {
    console.log('Play playlist:', playlist.name);
    // TODO: Start playing playlist
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
