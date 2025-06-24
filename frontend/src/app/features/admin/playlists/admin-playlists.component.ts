import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPlaylistService, PlaylistFilters } from '../../../core/services/admin-playlist.service';
import { Playlist } from '../../../core/models/playlist.model';
import { PageResponse, PaginationParams } from '../../../core/models/api.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
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
    .modal-overlay .modal .modal-body .form-group .checkbox-container {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
      padding: 0.75rem !important;
      background: #282828 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 8px !important;
      cursor: pointer !important;
    }
    .modal-overlay .modal .modal-body .form-group .checkbox-container input[type="checkbox"] {
      width: 1.25rem !important;
      height: 1.25rem !important;
      accent-color: #1db954 !important;
      cursor: pointer !important;
      margin: 0 !important;
    }
    .modal-overlay .modal .modal-body .form-group .checkbox-container label {
      color: #ffffff !important;
      cursor: pointer !important;
      margin: 0 !important;
      font-weight: 500 !important;
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
    <div class="admin-playlists">
      <div class="playlists-header">
        <h1>Playlists Management</h1>
        <button class="admin-btn" (click)="showCreateForm()">
          <i class="fas fa-plus"></i> Add New Playlist
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-row">
          <div class="filter-group">
            <label>Search</label>
            <input type="text" [(ngModel)]="filters.search" (keyup.enter)="loadPlaylists()" placeholder="Search by name...">
          </div>
          <div class="filter-group">
            <label>Privacy</label>
            <select [(ngModel)]="filters.isPublic" (change)="loadPlaylists()">
              <option value="">All</option>
              <option [value]="true">Public</option>
              <option [value]="false">Private</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="admin-btn btn-secondary" (click)="clearFilters()">
              <i class="fas fa-refresh"></i>
              Reset
            </button>
            <button class="admin-btn" (click)="loadPlaylists()">Search</button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="bulk-actions" *ngIf="selectedPlaylists.length > 0">
        <span>{{selectedPlaylists.length}} playlist(s) selected</span>
        <div>
          <button class="admin-btn btn-secondary" (click)="bulkTogglePublic(true)">Make Public</button>
          <button class="admin-btn btn-secondary" (click)="bulkTogglePublic(false)">Make Private</button>
          <button class="admin-btn btn-danger" (click)="bulkDelete()">Delete</button>
        </div>
      </div>

      <!-- Playlists Table -->
      <div class="playlists-table-container">
        <table class="playlists-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll($event)">
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Privacy</th>
              <th>Songs</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let playlist of playlistsList" [class.selected]="isSelected(playlist.id)">
              <td>
                <input type="checkbox" [checked]="isSelected(playlist.id)" (change)="toggleSelection(playlist.id, $event)">
              </td>
              <td>
                <img [src]="getPlaylistImageUrl(playlist)" [alt]="playlist.name" class="playlist-thumb">
              </td>
              <td>
                <div class="playlist-name">
                  <span class="name">{{playlist.name}}</span>
                </div>
              </td>
              <td>{{playlist.description || 'No description'}}</td>
              <td>
                <span class="privacy-badge" [class.public]="playlist.isPublic" [class.private]="!playlist.isPublic">
                  {{playlist.isPublic ? 'Public' : 'Private'}}
                </span>
              </td>
              <td>{{playlist.songCount || 0}} songs</td>
              <td>{{playlist.createdAt | date:'short'}}</td>
              <td class="actions">
                <button class="btn-icon" (click)="viewPlaylist(playlist)" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" (click)="editPlaylist(playlist)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" (click)="togglePrivacy(playlist)" title="Toggle Privacy">
                  <i class="fas" [class.fa-lock]="!playlist.isPublic" [class.fa-unlock]="playlist.isPublic"></i>
                </button>
                <button class="btn-icon danger" (click)="deletePlaylist(playlist)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-data" *ngIf="playlistsList.length === 0 && !loading">
          <i class="fas fa-list"></i>
          <p>No playlists found</p>
          <button class="admin-btn btn-secondary" (click)="loadPlaylists()">Retry</button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination" *ngIf="pageInfo.totalElements > 0">
        <div class="pagination-info">
          Showing {{(pageInfo.number * pageInfo.size) + 1}} to {{Math.min((pageInfo.number + 1) * pageInfo.size, pageInfo.totalElements)}} of {{pageInfo.totalElements}} results
        </div>
        <div class="pagination-controls">
          <button class="page-btn" [disabled]="pageInfo.first" (click)="goToPage(0)">
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button class="page-btn" [disabled]="pageInfo.first" (click)="goToPage(pageInfo.number - 1)">
            <i class="fas fa-angle-left"></i>
          </button>

          <span class="page-numbers">
            <button *ngFor="let page of getPageNumbers()"
                    class="page-btn"
                    [class.active]="page === pageInfo.number"
                    (click)="goToPage(page)">
              {{page + 1}}
            </button>
          </span>

          <button class="page-btn" [disabled]="pageInfo.last" (click)="goToPage(pageInfo.number + 1)">
            <i class="fas fa-angle-right"></i>
          </button>
          <button class="page-btn" [disabled]="pageInfo.last" (click)="goToPage(pageInfo.totalPages - 1)">
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div class="loading-overlay" *ngIf="loading">
        <div class="spinner"></div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{isEditMode ? 'Edit Playlist' : 'Add New Playlist'}}</h3>
          <button class="btn-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form [formGroup]="playlistForm" (ngSubmit)="onSubmit()">
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" id="name" formControlName="name" placeholder="Enter playlist name" class="admin-input">
              <div class="error" *ngIf="playlistForm.get('name')?.touched && playlistForm.get('name')?.errors?.['required']">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" formControlName="description" placeholder="Enter playlist description" rows="3" class="admin-input"></textarea>
            </div>

            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input type="url" id="imageUrl" formControlName="imageUrl" placeholder="Enter image URL" class="admin-input">
            </div>

            <div class="form-group">
              <div class="checkbox-container">
                <input type="checkbox" id="isPublic" formControlName="isPublic">
                <label for="isPublic">Public</label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="admin-btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="admin-btn btn-primary" [disabled]="playlistForm.invalid || submitting">
              {{submitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div class="modal-overlay" *ngIf="showViewModal" (click)="closeViewModal()">
      <div class="modal modal-large" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Playlist Details</h3>
          <button class="btn-close" (click)="closeViewModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" *ngIf="selectedPlaylistItem">
          <div class="playlist-details">
            <div class="playlist-image">
              <img [src]="getPlaylistImageUrl(selectedPlaylistItem)" [alt]="selectedPlaylistItem.name">
            </div>
            <div class="playlist-info">
              <h2>{{selectedPlaylistItem.name}}</h2>
              <p class="description">{{selectedPlaylistItem.description || 'No description available'}}</p>
              <p class="privacy">Privacy:
                <span class="privacy-badge" [class.public]="selectedPlaylistItem.isPublic" [class.private]="!selectedPlaylistItem.isPublic">
                  {{selectedPlaylistItem.isPublic ? 'Public' : 'Private'}}
                </span>
              </p>
              <p class="songs">Songs: {{selectedPlaylistItem.songCount || 0}}</p>
              <p class="dates">Created: {{selectedPlaylistItem.createdAt | date:'medium'}}</p>
              <p class="dates">Updated: {{selectedPlaylistItem.updatedAt | date:'medium'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminPlaylistsComponent implements OnInit {
  playlistsList: Playlist[] = [];
  selectedPlaylists: number[] = [];
  playlistForm!: FormGroup;
  showModal = false;
  showViewModal = false;
  isEditMode = false;  selectedPlaylistItem: Playlist | null = null;
  loading = false;
  submitting = false;

  // Pagination
  pageInfo: PageResponse<Playlist> = {
    content: [],
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      pageSize: 10,
      pageNumber: 0,
      paged: true,
      unpaged: false
    },
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 10,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    numberOfElements: 0,
    empty: true
  };

  paginationParams: PaginationParams = {
    page: 0,
    size: 10,
    sort: 'updatedAt',
    direction: 'desc'
  };

  filters: PlaylistFilters = {};
  Math = Math;
  constructor(
    private adminPlaylistService: AdminPlaylistService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadPlaylists();
  }

  initForm() {
    this.playlistForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      isPublic: [true]
    });
  }
  loadPlaylists() {
    this.loading = true;
    console.log('Loading playlists with params:', this.paginationParams, 'filters:', this.filters);

    this.adminPlaylistService.getAllPlaylists(this.paginationParams, this.filters).subscribe({
      next: (response) => {
        console.log('Playlists API response:', response);
        if (response.success && response.data) {
          this.playlistsList = response.data.content;
          this.pageInfo = response.data;
          console.log('Playlists list:', this.playlistsList);
          console.log('Page info:', this.pageInfo);
        } else {
          console.log('API response not successful or no data:', response);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading playlists:', error);
        console.error('Error details:', error.status, error.message);
        this.loading = false;
      }
    });
  }
  clearFilters() {
    this.filters = {};
    this.paginationParams.page = 0;
    this.loadPlaylists();
  }

  showCreateForm() {
    this.isEditMode = false;
    this.playlistForm.reset({
      isPublic: true
    });
    this.showModal = true;
  }

  editPlaylist(playlist: Playlist) {
    this.isEditMode = true;
    this.selectedPlaylistItem = playlist;
    this.playlistForm.patchValue({
      name: playlist.name,
      description: playlist.description,
      imageUrl: playlist.imageUrl,
      isPublic: playlist.isPublic
    });
    this.showModal = true;
  }

  viewPlaylist(playlist: Playlist) {
    this.selectedPlaylistItem = playlist;
    this.showViewModal = true;
  }
  onSubmit() {
    if (this.playlistForm.valid) {
      this.submitting = true;
      const formValue = this.playlistForm.value;

      // For admin, we need to set a userId. For now, use 1 as default
      const request = {
        name: formValue.name,
        description: formValue.description,
        imageUrl: formValue.imageUrl,
        isPublic: formValue.isPublic,
        userId: 1 // TODO: Get current user ID or admin user ID
      };

      const operation = this.isEditMode
        ? this.adminPlaylistService.updatePlaylist(this.selectedPlaylistItem!.id, request)
        : this.adminPlaylistService.createPlaylist(request);

      operation.subscribe({
        next: (response) => {
          if (response.success) {
            this.closeModal();
            this.loadPlaylists();
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error saving playlist:', error);
          this.submitting = false;
        }
      });
    }
  }
  deletePlaylist(playlist: Playlist) {
    if (confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      this.adminPlaylistService.deletePlaylist(playlist.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadPlaylists();
          }
        },
        error: (error) => {
          console.error('Error deleting playlist:', error);
        }
      });
    }
  }
  togglePrivacy(playlist: Playlist) {
    this.adminPlaylistService.togglePlaylistPrivacy(playlist.id).subscribe({
      next: (response) => {
        if (response.success) {
          playlist.isPublic = !playlist.isPublic;
        }
      },
      error: (error) => {
        console.error('Error toggling playlist privacy:', error);
      }
    });
  }

  // Selection methods
  toggleSelection(playlistId: number, event: any) {
    if (event.target.checked) {
      this.selectedPlaylists.push(playlistId);
    } else {
      this.selectedPlaylists = this.selectedPlaylists.filter(id => id !== playlistId);
    }
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedPlaylists = this.playlistsList.map(p => p.id);
    } else {
      this.selectedPlaylists = [];
    }
  }

  isSelected(playlistId: number): boolean {
    return this.selectedPlaylists.includes(playlistId);
  }

  isAllSelected(): boolean {
    return this.playlistsList.length > 0 && this.selectedPlaylists.length === this.playlistsList.length;
  }

  // Bulk operations
  bulkDelete() {
    if (confirm(`Are you sure you want to delete ${this.selectedPlaylists.length} playlist(s)?`)) {
      console.log('Bulk delete playlists:', this.selectedPlaylists);
      this.selectedPlaylists = [];
      this.loadPlaylists();
    }
  }

  bulkTogglePublic(isPublic: boolean) {
    console.log('Bulk toggle public:', this.selectedPlaylists, isPublic);
    this.selectedPlaylists = [];
    this.loadPlaylists();
  }
  // Pagination methods
  goToPage(page: number) {
    this.paginationParams.page = page;
    this.loadPlaylists();
  }

  getPageNumbers(): number[] {
    const pages = [];
    const start = Math.max(0, this.pageInfo.number - 2);
    const end = Math.min(this.pageInfo.totalPages - 1, this.pageInfo.number + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }    return pages;
  }

  getPlaylistImageUrl(playlist: Playlist): string {
    if (!playlist.imageUrl) return 'https://via.placeholder.com/50x50/e0e0e0/666666?text=🎵';
    if (playlist.imageUrl.startsWith('http')) return playlist.imageUrl;
    if (playlist.imageUrl.startsWith('/uploads')) return environment.backendUrl + playlist.imageUrl;
    return playlist.imageUrl;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPlaylistItem = null;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedPlaylistItem = null;
  }
}
