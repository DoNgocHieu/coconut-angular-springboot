import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminArtistService } from '../../../core/services/admin-artist.service';
import { Artist } from '../../../core/models/music.model';

@Component({
  selector: 'app-admin-artists',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  encapsulation: ViewEncapsulation.None,template: `
    <div class="admin-artists">
      <!-- Header -->
      <div class="artists-header">        <h1>Artist Management</h1>
        <button class="admin-btn" (click)="openCreateModal()">
          <i class="fas fa-user-plus"></i>
          Create Artist
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-row">          <div class="filter-group">
            <label>Search</label>
            <div class="search-input-container">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Search artists..."
                (input)="onSearchChange()"
              />
              <i *ngIf="searching" class="fas fa-spinner fa-spin search-spinner"></i>
            </div>
          </div>

          <div class="filter-group">
            <label>Status</label>
            <select [(ngModel)]="statusFilter" (change)="onFilterChange()">
              <option [ngValue]="undefined">All Status</option>
              <option [ngValue]="true">Active</option>
              <option [ngValue]="false">Inactive</option>
            </select>
          </div>          <div class="filter-group">
            <button class="filter-btn" (click)="clearFilters()">
              <i class="fas fa-xmark"></i>
              Clear
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading artists...</p>
      </div>

      <!-- Artists Table -->
      <div *ngIf="!loading" class="table-section">
        <div class="table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    [checked]="isAllSelected()"
                    (change)="toggleSelectAll()"
                  />
                </th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Bio</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let artist of artists" [class.selected]="selectedArtists.has(artist.id)">
                <td>
                  <input
                    type="checkbox"
                    [checked]="selectedArtists.has(artist.id)"
                    (change)="toggleSelect(artist.id)"
                  />
                </td>
                <td>
                  <div class="artist-avatar">
                    <img
                      [src]="artist.avatarUrl || 'https://via.placeholder.com/40'"
                      [alt]="artist.name"
                    />
                  </div>
                </td>
                <td>
                  <div class="artist-name">{{ artist.name }}</div>
                </td>
                <td>
                  <div class="artist-bio">{{ artist.bio || 'No biography' }}</div>
                </td>
                <td>
                  <span [class]="'status-badge ' + (artist.isActive ? 'active' : 'inactive')">
                    {{ artist.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn edit" (click)="openEditModal(artist)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn toggle" (click)="toggleArtistStatus(artist)">
                      <i class="fas fa-toggle-{{ artist.isActive ? 'on' : 'off' }}"></i>
                    </button>
                    <button class="action-btn delete" (click)="deleteArtist(artist)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>        <!-- No data -->
        <div *ngIf="artists.length === 0" class="empty-state">
          <i class="fas fa-microphone"></i>
          <h3 *ngIf="!hasActiveFilters()">No Artists Found</h3>
          <h3 *ngIf="hasActiveFilters()">No Results Found</h3>
          <p *ngIf="!hasActiveFilters()">Create your first artist to get started</p>
          <p *ngIf="hasActiveFilters()">Try adjusting your search filters</p>
          <button *ngIf="hasActiveFilters()" class="admin-btn btn-secondary" (click)="clearFilters()">
            <i class="fas fa-times"></i>
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div *ngIf="selectedArtists.size > 0" class="bulk-actions">
        <div class="bulk-info">
          {{ selectedArtists.size }} artist(s) selected
        </div>
        <div class="bulk-buttons">
          <button class="bulk-btn activate" (click)="bulkToggleStatus(true)">
            <i class="fas fa-check"></i>
            Activate Selected
          </button>
          <button class="bulk-btn deactivate" (click)="bulkToggleStatus(false)">
            <i class="fas fa-pause"></i>
            Deactivate Selected
          </button>
          <button class="bulk-btn delete" (click)="bulkDelete()">
            <i class="fas fa-trash"></i>
            Delete Selected
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">        <div class="modal-header">
          <h3>
            <i class="fas fa-music"></i>
            {{ isEditMode ? 'Edit Artist' : 'Create New Artist' }}
          </h3>
          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form [formGroup]="artistForm" (ngSubmit)="onSubmit()">
          <div class="modal-body">
            <div class="form-group">
              <label for="artistName">Artist Name *</label>
              <input
                id="artistName"
                type="text"
                formControlName="name"
                placeholder="Enter artist name"
                [class.error]="artistForm.get('name')?.invalid && artistForm.get('name')?.touched"
              />
              <div *ngIf="artistForm.get('name')?.invalid && artistForm.get('name')?.touched"
                   class="error-message">
                Artist name is required
              </div>
            </div>

            <div class="form-group">
              <label for="artistBio">Biography</label>
              <textarea
                id="artistBio"
                formControlName="bio"
                rows="4"
                placeholder="Enter artist biography (optional)"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="artistAvatar">Avatar URL</label>
              <input
                id="artistAvatar"
                type="url"
                formControlName="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  formControlName="isActive"
                />
                <span class="checkmark"></span>
                Active Artist
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="cancel-btn" (click)="closeModal()">
              Cancel
            </button>
            <button
              type="submit"
              class="submit-btn"
              [disabled]="artistForm.invalid || submitting"            >              <span *ngIf="submitting" class="spinner-sm"></span>
              <i *ngIf="!submitting" class="fas fa-save"></i>
              {{ isEditMode ? 'Update Artist' : 'Create Artist' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,  styles: [`
    @import '../../../../styles/admin-theme.scss';    /* Force Font Awesome icons to display correctly with maximum specificity */
    .admin-artists .fas,
    .admin-artists .far,
    .admin-artists .fab,
    .admin-artists .fa,
    .modal-overlay .fas,
    .modal-overlay .far,
    .modal-overlay .fab,
    .modal-overlay .fa,
    .fas,
    .far,
    .fab,
    .fa {
      font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Pro', 'Font Awesome 5 Free', 'Font Awesome 5 Pro' !important;
      font-weight: 900 !important;
      font-style: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }

    .admin-artists .far,
    .modal-overlay .far,
    .far {
      font-weight: 400 !important;
    }

    .admin-artists .fab,
    .modal-overlay .fab,
    .fab {
      font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands' !important;
      font-weight: 400 !important;
    }    /* Ensure icons are not affected by text font changes - Maximum specificity */
    .admin-artists .admin-btn i,
    .admin-artists .filter-btn i,
    .admin-artists .action-btn i,
    .admin-artists .btn i,
    .admin-artists button i,
    .admin-artists .close-btn i,
    .admin-artists .submit-btn i,
    .admin-artists .cancel-btn i,
    .admin-artists .modal-header i,
    .admin-artists .modal-footer i,
    .modal-overlay .admin-btn i,
    .modal-overlay .filter-btn i,
    .modal-overlay .action-btn i,
    .modal-overlay .btn i,
    .modal-overlay button i,
    .modal-overlay .close-btn i,
    .modal-overlay .submit-btn i,
    .modal-overlay .cancel-btn i,
    .modal-overlay .modal-header i,
    .modal-overlay .modal-footer i,
    .admin-btn i,
    .filter-btn i,
    .action-btn i,
    .btn i,
    button i,
    .close-btn i,
    .submit-btn i,
    .cancel-btn i,
    .modal-header i,
    .modal-footer i {
      font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Pro', 'Font Awesome 5 Free', 'Font Awesome 5 Pro' !important;
      font-weight: 900 !important;
      font-style: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }

    .admin-artists {
      padding: 2rem;
      background: var(--admin-bg-primary);
      min-height: 100vh;
      color: var(--admin-text-primary);
    }

    .artists-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h1 {
        color: var(--admin-text-primary);
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .admin-btn {
        background: var(--admin-gradient-primary);
        color: var(--admin-text-primary);
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--admin-border-radius);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: var(--admin-accent-primary-hover);
          transform: translateY(-2px);
          box-shadow: var(--admin-shadow-medium);
        }
      }
    }

    .filters-section {
      background: var(--admin-gradient-card);
      border: 1px solid var(--admin-border-subtle);
      border-radius: var(--admin-border-radius-lg);
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: var(--admin-shadow-small);

      .filters-row {
        display: flex;
        gap: 1.5rem;
        align-items: end;
        flex-wrap: wrap;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;        label {
          color: var(--admin-text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .search-input-container {
          position: relative;
          width: 200px;

          input {
            width: 100%;
            padding-right: 2.5rem; /* Make room for spinner */
          }

          .search-spinner {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--admin-accent-primary);
          }
        }

        input, select {
          background: var(--admin-bg-tertiary);
          border: 1px solid var(--admin-border-subtle);
          color: var(--admin-text-primary);
          padding: 0.75rem;
          border-radius: var(--admin-border-radius);
          font-size: 0.9rem;
          width: 200px;

          &:focus {
            outline: none;
            border-color: var(--admin-accent-primary);
            box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
          }
        }

        .filter-btn {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-secondary);
          border: 1px solid var(--admin-border-subtle);
          padding: 0.75rem 1rem;
          border-radius: var(--admin-border-radius);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;

          &:hover {
            background: var(--admin-surface-hover);
            color: var(--admin-text-primary);
          }
        }
      }
    }

    .loading-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--admin-text-secondary);

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--admin-bg-tertiary);
        border-top: 4px solid var(--admin-accent-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }

    .table-section {
      background: var(--admin-gradient-card);
      border: 1px solid var(--admin-border-subtle);
      border-radius: var(--admin-border-radius-lg);
      overflow: hidden;
      box-shadow: var(--admin-shadow-medium);

      .table-container {
        overflow-x: auto;
      }

      .admin-table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--admin-border-subtle);
        }

        th {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        tr {
          transition: background-color 0.2s ease;

          &:hover {
            background: var(--admin-surface-hover);
          }

          &.selected {
            background: rgba(29, 185, 84, 0.1);
          }
        }

        .artist-avatar img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--admin-border-subtle);
        }

        .artist-name {
          font-weight: 500;
          color: var(--admin-text-primary);
        }

        .artist-bio {
          color: var(--admin-text-secondary);
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;

          &.active {
            background: var(--admin-success);
            color: var(--admin-text-primary);
          }

          &.inactive {
            background: var(--admin-text-muted);
            color: var(--admin-text-primary);
          }
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;

          .action-btn {
            background: transparent;
            border: 1px solid var(--admin-border-subtle);
            color: var(--admin-text-secondary);
            width: 32px;
            height: 32px;
            border-radius: var(--admin-border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              background: var(--admin-surface-hover);
              color: var(--admin-text-primary);
            }

            &.edit:hover {
              background: var(--admin-accent-primary);
              border-color: var(--admin-accent-primary);
            }

            &.toggle:hover {
              background: var(--admin-warning);
              border-color: var(--admin-warning);
            }

            &.delete:hover {
              background: var(--admin-error);
              border-color: var(--admin-error);
            }
          }
        }

        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: var(--admin-accent-primary);
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--admin-text-secondary);

      i {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      h3 {
        margin-bottom: 0.5rem;
        color: var(--admin-text-primary);
      }
    }

    .bulk-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--admin-gradient-card);
      border: 1px solid var(--admin-border-subtle);
      border-radius: var(--admin-border-radius-lg);
      padding: 1rem 1.5rem;
      margin-top: 1rem;
      box-shadow: var(--admin-shadow-small);

      .bulk-info {
        color: var(--admin-text-secondary);
        font-weight: 500;
      }

      .bulk-buttons {
        display: flex;
        gap: 0.75rem;

        .bulk-btn {
          padding: 0.5rem 1rem;
          border-radius: var(--admin-border-radius);
          border: none;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;

          &.activate {
            background: var(--admin-success);
            color: var(--admin-text-primary);

            &:hover {
              background: #169c46;
            }
          }

          &.deactivate {
            background: var(--admin-warning);
            color: var(--admin-text-primary);

            &:hover {
              background: #e6940d;
            }
          }

          &.delete {
            background: var(--admin-error);
            color: var(--admin-text-primary);

            &:hover {
              background: #c81e2e;
            }
          }
        }
      }
    }

    // Modal Styles
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.3s ease;
    }

    .modal {
      background: var(--admin-gradient-card);
      border: 1px solid var(--admin-border-strong);
      border-radius: var(--admin-border-radius-xl);
      box-shadow: var(--admin-shadow-large);
      width: 100%;
      max-width: 600px;
      min-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;

      .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--admin-border-subtle);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          margin: 0;
          color: var(--admin-text-primary);
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          i {
            color: var(--admin-accent-primary);
          }
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--admin-text-muted);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;

          &:hover {
            background: var(--admin-surface-hover);
            color: var(--admin-text-primary);
          }
        }
      }

      .modal-body {
        padding: 1.5rem;

        .form-group {
          margin-bottom: 1.5rem;

          label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--admin-text-secondary);
            font-weight: 500;
            font-size: 0.9rem;
          }

          input, textarea, select {
            width: 100%;
            background: var(--admin-bg-tertiary);
            border: 1px solid var(--admin-border-subtle);
            color: var(--admin-text-primary);
            padding: 0.75rem;
            border-radius: var(--admin-border-radius);
            font-size: 0.9rem;
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              border-color: var(--admin-accent-primary);
              box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
            }

            &.error {
              border-color: var(--admin-error);
            }

            &::placeholder {
              color: var(--admin-text-muted);
            }
          }

          textarea {
            resize: vertical;
            min-height: 100px;
          }

          .error-message {
            color: var(--admin-error);
            font-size: 0.8rem;
            margin-top: 0.25rem;
          }

          &.checkbox-group {
            .checkbox-label {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              cursor: pointer;
              color: var(--admin-text-primary);

              input[type="checkbox"] {
                width: auto;
                margin: 0;
                accent-color: var(--admin-accent-primary);
              }
            }
          }
        }
      }

      .modal-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--admin-border-subtle);
        display: flex;
        justify-content: flex-end;
        gap: 1rem;

        .cancel-btn {
          background: var(--admin-bg-tertiary);
          color: var(--admin-text-secondary);
          border: 1px solid var(--admin-border-subtle);
          padding: 0.75rem 1.5rem;
          border-radius: var(--admin-border-radius);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            background: var(--admin-surface-hover);
            color: var(--admin-text-primary);
          }
        }

        .submit-btn {
          background: var(--admin-gradient-primary);
          color: var(--admin-text-primary);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--admin-border-radius);
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;

          &:hover:not(:disabled) {
            background: var(--admin-accent-primary-hover);
            transform: translateY(-1px);
            box-shadow: var(--admin-shadow-small);
          }

          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .spinner-sm {
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid var(--admin-text-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 768px) {
      .admin-artists {
        padding: 1rem;
      }

      .artists-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;

        h1 {
          font-size: 1.5rem;
        }
      }

      .filters-section .filters-row {
        flex-direction: column;
        align-items: stretch;

        .filter-group input,
        .filter-group select {
          width: 100%;
        }
      }

      .modal {
        margin: 1rem;
        min-width: auto;
      }

      .bulk-actions {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;

        .bulk-buttons {
          justify-content: center;
        }
      }

      .admin-table {
        font-size: 0.8rem;

        th, td {
          padding: 0.5rem;
        }

        .artist-bio {
          max-width: 120px;
        }
      }
    }
  `]
})
export class AdminArtistsComponent implements OnInit, OnDestroy {  artists: Artist[] = [];
  loading = false;
  submitting = false;
  searching = false;
  // Search and filters
  searchTerm = '';
  statusFilter: boolean | undefined = undefined;
  private searchTimeout: any;

  // Selection
  selectedArtists = new Set<number>();

  // Modal
  showModal = false;
  isEditMode = false;
  currentArtist: Artist | null = null;
  artistForm: FormGroup;

  constructor(
    private adminArtistService: AdminArtistService,
    private fb: FormBuilder
  ) {
    this.artistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      bio: [''],
      avatarUrl: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.loadArtists();
  }  loadArtists() {
    this.loading = true;
    this.searching = false;

    // Build filters object
    const filters: any = {};
    if (this.searchTerm && this.searchTerm.trim()) {
      filters.search = this.searchTerm.trim();
    }
    if (this.statusFilter !== undefined) {
      filters.isActive = this.statusFilter;
    }

    this.adminArtistService.getAllArtists({ page: 0, size: 100 }, filters).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.artists = response.data.content;
        }
        this.loading = false;
        this.searching = false;
      },
      error: (error: any) => {
        console.error('Error loading artists:', error);
        this.loading = false;
        this.searching = false;
      }
    });
  }  // Search and filter methods
  onSearchChange() {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Show searching indicator if there's a search term
    if (this.searchTerm && this.searchTerm.trim()) {
      this.searching = true;
    }

    // Set new timeout for debounced search
    this.searchTimeout = setTimeout(() => {
      this.loadArtists();
    }, 300); // Wait 300ms after user stops typing
  }

  onFilterChange() {
    this.loadArtists();
  }
  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = undefined;

    // Clear search timeout if exists
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.loadArtists();
  }

  hasActiveFilters(): boolean {
    return !!(this.searchTerm && this.searchTerm.trim()) || this.statusFilter !== undefined;
  }

  // Selection methods
  toggleSelect(artistId: number) {
    if (this.selectedArtists.has(artistId)) {
      this.selectedArtists.delete(artistId);
    } else {
      this.selectedArtists.add(artistId);
    }
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedArtists.clear();
    } else {
      this.artists.forEach(artist => this.selectedArtists.add(artist.id));
    }
  }

  isAllSelected(): boolean {
    return this.artists.length > 0 && this.selectedArtists.size === this.artists.length;
  }

  // Bulk operations
  bulkToggleStatus(isActive: boolean) {
    const artistIds = Array.from(this.selectedArtists);
    // Implementation for bulk toggle
    console.log('Bulk toggle status', { artistIds, isActive });
  }

  bulkDelete() {
    if (confirm(`Are you sure you want to delete ${this.selectedArtists.size} selected artists?`)) {
      const artistIds = Array.from(this.selectedArtists);
      // Implementation for bulk delete
      console.log('Bulk delete', artistIds);
    }
  }

  // Modal methods
  openCreateModal() {
    this.isEditMode = false;
    this.currentArtist = null;
    this.artistForm.reset({ isActive: true });
    this.showModal = true;
  }

  openEditModal(artist: Artist) {
    this.isEditMode = true;
    this.currentArtist = artist;
    this.artistForm.patchValue({
      name: artist.name,
      bio: artist.bio || '',
      avatarUrl: artist.avatarUrl || '',
      isActive: artist.isActive
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.currentArtist = null;
    this.artistForm.reset();
  }

  onSubmit() {
    if (this.artistForm.valid) {
      this.submitting = true;
      const formData = this.artistForm.value;

      const operation = this.isEditMode
        ? this.adminArtistService.updateArtist(this.currentArtist!.id, formData)
        : this.adminArtistService.createArtist(formData);

      operation.subscribe({
        next: (response: any) => {
          if (response.success) {
            this.closeModal();
            this.loadArtists();
          }
          this.submitting = false;
        },
        error: (error: any) => {
          console.error('Error saving artist:', error);
          this.submitting = false;
        }
      });
    }
  }

  // Artist action methods
  toggleArtistStatus(artist: Artist) {
    this.adminArtistService.toggleActiveStatus(artist.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          artist.isActive = !artist.isActive;
        }
      },
      error: (error: any) => {
        console.error('Error toggling artist status:', error);
      }
    });
  }

  deleteArtist(artist: Artist) {
    if (confirm(`Are you sure you want to delete "${artist.name}"?`)) {
      this.adminArtistService.deleteArtist(artist.id).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadArtists();
          }
        },
        error: (error: any) => {
          console.error('Error deleting artist:', error);
        }
      });
    }
  }

  ngOnDestroy() {
    // Clear search timeout if exists
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
}
