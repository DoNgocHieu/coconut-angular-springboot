import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../core/models/playlist.model';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-playlists.component.html',
  styleUrls: ['./admin-playlists.component.scss']
})
export class AdminPlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  loading = false;
  error: string | null = null;

  // Pagination
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 20;

  // Filters
  filters = {
    search: '',
    owner: '',
    isPublic: ''
  };

  // Selection
  selectedPlaylists: number[] = [];

  // Modals
  showModal = false;
  showDeleteModal = false;
  isEditMode = false;
  submitting = false;
  deleting = false;
  // Current items for editing/deleting
  currentPlaylist: Playlist | null = null;
  playlistToDelete: Playlist | null = null;

  // Reactive form
  playlistForm!: FormGroup;

  constructor(
    private playlistService: PlaylistService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm(): void {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [''],
      isPublic: [true]
    });
  }
  ngOnInit(): void {
    this.loadPlaylists();
  }
  loadPlaylists(): void {
    this.loading = true;
    this.error = null;

    // Use the admin-specific endpoint which returns ALL playlists for admin
    this.playlistService.getAllPlaylistsForAdmin(this.currentPage, this.pageSize).subscribe({
      next: (response: ApiResponse<PageableResponse<Playlist>>) => {
        if (response.success) {
          this.playlists = response.data.content;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
        } else {
          this.error = response.message || 'Failed to load playlists';
        }
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load playlists';
        this.loading = false;
        console.error('Error loading playlists:', error);
      }
    });
  }

  // Filter methods
  onSearchChange(): void {
    // Implement search functionality
    this.currentPage = 0;
    this.loadPlaylists();
  }

  onFilterChange(): void {
    // Implement filter functionality
    this.currentPage = 0;
    this.loadPlaylists();
  }

  resetFilters(): void {
    this.filters = {
      search: '',
      owner: '',
      isPublic: ''
    };
    this.currentPage = 0;
    this.loadPlaylists();
  }

  hasActiveFilters(): boolean {
    return !!(this.filters.search || this.filters.owner || this.filters.isPublic);
  }

  getNoDataMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No playlists match your current filters. Try adjusting your search criteria.';
    }
    return 'No playlists have been created yet. Create your first playlist to get started.';
  }

  // Selection methods
  isSelected(playlistId: number): boolean {
    return this.selectedPlaylists.includes(playlistId);
  }

  isAllSelected(): boolean {
    return this.playlists.length > 0 && this.selectedPlaylists.length === this.playlists.length;
  }

  isPartiallySelected(): boolean {
    return this.selectedPlaylists.length > 0 && this.selectedPlaylists.length < this.playlists.length;
  }

  toggleSelection(playlistId: number, event: any): void {
    if (event.target.checked) {
      if (!this.selectedPlaylists.includes(playlistId)) {
        this.selectedPlaylists.push(playlistId);
      }
    } else {
      const index = this.selectedPlaylists.indexOf(playlistId);
      if (index > -1) {
        this.selectedPlaylists.splice(index, 1);
      }
    }
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedPlaylists = this.playlists.map(p => p.id);
    } else {
      this.selectedPlaylists = [];
    }
  }

  bulkDelete(): void {
    this.showDeleteModal = true;
  }

  // Modal methods
  openCreateModal(): void {
    this.isEditMode = false;
    this.showModal = true;
    this.currentPlaylist = null;
    this.playlistForm.reset({
      name: '',
      description: '',
      isPublic: true
    });
  }

  openEditModal(playlist: Playlist): void {
    this.isEditMode = true;
    this.showModal = true;
    this.currentPlaylist = playlist;
    this.playlistForm.patchValue({
      name: playlist.name,
      description: playlist.description || '',
      isPublic: playlist.isPublic
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.submitting = false;
    this.currentPlaylist = null;
  }

  deletePlaylist(playlist: Playlist): void {
    this.playlistToDelete = playlist;
    this.selectedPlaylists = [];
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleting = false;
    this.playlistToDelete = null;
  }

  // CRUD operations
  onSubmit(): void {
    if (this.isEditMode && this.currentPlaylist) {
      this.updatePlaylist();
    } else {
      this.createPlaylist();
    }
  }
  createPlaylist(): void {
    if (this.playlistForm.invalid) {
      return;
    }

    this.submitting = true;
    this.playlistService.createPlaylist(this.playlistForm.value).subscribe({
      next: (response: ApiResponse<Playlist>) => {
        if (response.success) {
          this.loadPlaylists(); // Reload to get updated data
          this.closeModal();
        } else {
          this.error = response.message || 'Failed to create playlist';
        }
        this.submitting = false;
      },
      error: (error: any) => {
        this.error = 'Failed to create playlist';
        this.submitting = false;
        console.error('Error creating playlist:', error);
      }
    });
  }

  updatePlaylist(): void {
    if (!this.currentPlaylist || this.playlistForm.invalid) {
      return;
    }

    this.submitting = true;
    this.playlistService.updatePlaylist(this.currentPlaylist.id, this.playlistForm.value).subscribe({
      next: (response: ApiResponse<Playlist>) => {
        if (response.success) {
          this.loadPlaylists(); // Reload to get updated data
          this.closeModal();
        } else {
          this.error = response.message || 'Failed to update playlist';
        }
        this.submitting = false;
      },
      error: (error: any) => {
        this.error = 'Failed to update playlist';
        this.submitting = false;
        console.error('Error updating playlist:', error);
      }
    });
  }

  confirmDelete(): void {
    if (this.playlistToDelete) {
      this.deleteSinglePlaylist();
    } else if (this.selectedPlaylists.length > 0) {
      this.deleteMultiplePlaylists();
    }
  }

  deleteSinglePlaylist(): void {
    if (!this.playlistToDelete) return;

    this.deleting = true;
    this.playlistService.deletePlaylist(this.playlistToDelete.id).subscribe({
      next: (response: ApiResponse<void>) => {
        if (response.success) {
          this.loadPlaylists(); // Reload to get updated data
          this.closeDeleteModal();
        } else {
          this.error = response.message || 'Failed to delete playlist';
        }
        this.deleting = false;
      },
      error: (error: any) => {
        this.error = 'Failed to delete playlist';
        this.deleting = false;
        console.error('Error deleting playlist:', error);
      }
    });
  }

  deleteMultiplePlaylists(): void {
    // Note: Backend doesn't support bulk delete, so we'll delete one by one
    // This is not ideal but works for now
    this.deleting = true;
    let deletedCount = 0;
    const totalToDelete = this.selectedPlaylists.length;

    this.selectedPlaylists.forEach(playlistId => {
      this.playlistService.deletePlaylist(playlistId).subscribe({
        next: (response: ApiResponse<void>) => {
          deletedCount++;
          if (deletedCount === totalToDelete) {
            this.loadPlaylists();
            this.closeDeleteModal();
            this.selectedPlaylists = [];
            this.deleting = false;
          }
        },
        error: (error: any) => {
          deletedCount++;
          if (deletedCount === totalToDelete) {
            this.loadPlaylists();
            this.closeDeleteModal();
            this.selectedPlaylists = [];
            this.deleting = false;
          }
          console.error('Error deleting playlist:', error);
        }
      });
    });
  }

  // Pagination
  changePage(page: number): void {
    this.currentPage = page;
    this.loadPlaylists();
  }

  getStartRecord(): number {
    return this.currentPage * this.pageSize + 1;
  }

  getEndRecord(): number {
    const end = (this.currentPage + 1) * this.pageSize;
    return Math.min(end, this.totalElements);
  }

  // Utility methods
  viewPlaylist(playlist: Playlist): void {
    // Navigate to playlist detail view
    console.log('View playlist:', playlist);
  }

  getPlaylistThumbnail(playlist: Playlist): string {
    return playlist.imageUrl || '/assets/default-playlist.png';
  }

  onImageError(event: any): void {
    event.target.src = '/assets/default-playlist.png';
  }

  trackByPlaylistId(index: number, playlist: Playlist): number {
    return playlist.id;
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}
