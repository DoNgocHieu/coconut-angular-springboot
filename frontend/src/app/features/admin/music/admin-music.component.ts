import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMusicService, MusicCreateRequest, MusicUpdateRequest, MusicFilters } from '../../../core/services/admin-music.service';
import { AdminArtistService } from '../../../core/services/admin-artist.service';
import { MusicService } from '../../../core/services/music.service';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth.service';
import { FirebaseStorageService } from '../../../core/services/firebase-storage.service';
import { Music, MusicType, Category } from '../../../core/models/music.model';
import { Artist } from '../../../core/models/music.model';
import { PageResponse, PaginationParams } from '../../../core/models/api.model';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-admin-music',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  encapsulation: ViewEncapsulation.None,
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
    }    .modal-overlay .modal {
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
    .modal-overlay .modal .modal-body .form-group .file-upload {
      border: 2px dashed rgba(255, 255, 255, 0.3) !important;
      border-radius: 8px !important;
      padding: 2rem !important;
      text-align: center !important;
      transition: all 0.2s ease !important;
      cursor: pointer !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload:hover {
      border-color: #1db954 !important;
      background: rgba(29, 185, 84, 0.05) !important;
    }    .modal-overlay .modal .modal-body .form-group .file-upload input[type="file"] {
      display: none !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area {
      border: 2px dashed rgba(255, 255, 255, 0.3) !important;
      border-radius: 8px !important;
      padding: 2rem !important;
      text-align: center !important;
      transition: all 0.2s ease !important;
      cursor: pointer !important;
      background: rgba(40, 40, 40, 0.5) !important;
    }    .modal-overlay .modal .modal-body .form-group .file-upload-area:hover {
      border-color: #1db954 !important;
      background: rgba(29, 185, 84, 0.05) !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area.dragover {
      border-color: #1db954 !important;
      background: rgba(29, 185, 84, 0.1) !important;
      transform: scale(1.02) !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area .file-input {
      display: none !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area .upload-icon {
      font-size: 2rem !important;
      color: #6a6a6a !important;
      margin-bottom: 1rem !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area .upload-text {
      color: #b3b3b3 !important;
      margin-bottom: 0.5rem !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area .browse-link {
      color: #1db954 !important;
      font-weight: 500 !important;
    }
    .modal-overlay .modal .modal-body .form-group .file-upload-area .upload-hint {
      font-size: 0.75rem !important;
      color: #6a6a6a !important;
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
    <div class="admin-music">
      <div class="music-header">
        <h1>Music Management</h1>        <button class="admin-btn btn-primary" (click)="showCreateForm()">
          <i class="fas fa-plus"></i> Add New Music
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-row">
          <div class="filter-group">
            <label>Search:</label>
            <input type="text" [(ngModel)]="filters.search" (keyup.enter)="loadMusic()" placeholder="Search by title...">
          </div>
          <div class="filter-group">
            <label>Category:</label>
            <select [(ngModel)]="filters.categoryId" (change)="loadMusic()">
              <option value="">All Categories</option>
              <option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status:</label>
            <select [(ngModel)]="filters.isActive" (change)="loadMusic()">
              <option value="">All</option>
              <option [value]="true">Active</option>
              <option [value]="false">Inactive</option>
            </select>
          </div>          <div class="filter-actions">
            <button class="btn btn-secondary" (click)="clearFilters()">Clear</button>
            <button class="btn btn-primary" (click)="loadMusic()">Search</button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->      <div class="bulk-actions" *ngIf="selectedMusic.length > 0">
        <span>{{selectedMusic.length}} item(s) selected</span>
        <button class="btn btn-secondary" (click)="bulkToggleActive(true)">Activate</button>
        <button class="btn btn-secondary" (click)="bulkToggleActive(false)">Deactivate</button>
        <button class="btn btn-danger" (click)="bulkDelete()">Delete</button>
        <button class="btn btn-secondary" (click)="clearSelection()">Clear</button>
      </div>

      <!-- Music Table -->
      <div class="music-table-container">
        <table class="music-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll($event)">
              </th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Play Count</th>
              <th>Like Count</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let music of musicList" [class.selected]="isSelected(music.id)">
              <td>
                <input type="checkbox" [checked]="isSelected(music.id)" (change)="toggleSelection(music.id, $event)">
              </td>              <td>
                <img [src]="music.imageUrl || 'https://via.placeholder.com/50x50/e0e0e0/666666?text=♪'" [alt]="music.title" class="music-cover">
              </td>
              <td>
                <div class="music-title">{{music.title}}</div>
                <div class="music-artist" *ngIf="music.artist">{{music.artist.name}}</div>
              </td>
              <td>{{music.category?.name || 'No Category'}}</td>
              <td>{{formatDuration(music.durationSeconds)}}</td>
              <td>
                <span class="type-badge" [class]="'type-' + music.typeMusic.toLowerCase()">
                  {{formatMusicType(music.typeMusic)}}
                </span>
              </td>
              <td>{{music.playCount | number}}</td>
              <td>{{music.likeCount | number}}</td>
              <td>
                <span class="status-badge" [class.active]="music.isActive" [class.inactive]="!music.isActive">
                  {{music.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td>{{music.createdAt | date:'short'}}</td>              <td class="action-buttons">
                <button class="btn btn-success" (click)="editMusic(music)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" (click)="deleteMusic(music)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>        <div class="empty-state" *ngIf="musicList.length === 0 && !loading">
          <div class="empty-icon">
            <i class="fas fa-music"></i>
          </div>
          <div class="empty-title">No music found</div>
          <div class="empty-description">
            <p>Current user: {{authService.getCurrentUser()?.username}} (Admin: {{authService.isAdmin()}})</p>
            <p>Token: {{authService.getToken() ? 'Present' : 'Missing'}}</p>
          </div>
          <button class="btn btn-secondary" (click)="loadMusic()">Retry</button>
        </div>
      </div>      <!-- Pagination -->
      <div class="pagination-container" *ngIf="pageInfo.totalElements > 0">
        <div class="pagination-info">
          Showing {{(pageInfo.number * pageInfo.size) + 1}} to {{Math.min((pageInfo.number + 1) * pageInfo.size, pageInfo.totalElements)}} of {{pageInfo.totalElements}} results
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" [disabled]="pageInfo.first" (click)="goToPage(0)">
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button class="pagination-btn" [disabled]="pageInfo.first" (click)="goToPage(pageInfo.number - 1)">
            <i class="fas fa-angle-left"></i>
          </button>

          <span class="page-numbers">
            <button *ngFor="let page of getPageNumbers()"
                    class="pagination-btn"
                    [class.active]="page === pageInfo.number"
                    (click)="goToPage(page)">
              {{page + 1}}
            </button>
          </span>

          <button class="pagination-btn" [disabled]="pageInfo.last" (click)="goToPage(pageInfo.number + 1)">
            <i class="fas fa-angle-right"></i>
          </button>
          <button class="pagination-btn" [disabled]="pageInfo.last" (click)="goToPage(pageInfo.totalPages - 1)">
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div class="loading-overlay" *ngIf="loading">
        <div class="spinner"></div>
      </div>
    </div>    <!-- Create/Edit Modal -->
    <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{isEditMode ? 'Edit Music' : 'Add New Music'}}</h3>
          <button class="btn-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form [formGroup]="musicForm" (ngSubmit)="onSubmit()"><div class="modal-body">
            <div class="form-group">
              <label for="title">Title *</label>
              <input type="text" id="title" formControlName="title" placeholder="Enter music title">
              <div class="error" *ngIf="musicForm.get('title')?.touched && musicForm.get('title')?.errors?.['required']">
                Title is required
              </div>
            </div>            <!-- Music File Upload -->
            <div class="form-group">
              <label>Music File (MP3) *</label>
              <div
                class="file-upload-area"
                [class.dragover]="isDragOver"
                (click)="triggerMusicFileInput()"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onMusicFileDrop($event)">
                <input
                  type="file"
                  accept="audio/mp3,audio/mpeg"
                  (change)="onMusicFileSelected($event)"
                  class="file-input"
                  id="musicFile"
                  #musicFileInput>
                <div class="upload-icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text" *ngIf="!selectedMusicFile">
                  <span class="browse-link">Choose MP3 file</span> or drag here
                </div>
                <div class="upload-text" *ngIf="selectedMusicFile">
                  {{selectedMusicFile.name}}
                </div>
                <div class="upload-hint">Supported formats: MP3</div>

                <div *ngIf="uploadingMusic" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="musicFileProgress"></div>
                  </div>
                  <div class="progress-text">{{musicFileProgress}}%</div>
                </div>

                <div *ngIf="selectedMusicFile" class="file-preview">
                  <div class="preview-header">
                    <div class="file-info">
                      <i class="file-icon fas fa-music"></i>
                      <div class="file-details">
                        <div class="file-name">{{selectedMusicFile.name}}</div>
                        <div class="file-size">{{formatFileSize(selectedMusicFile.size)}}</div>
                      </div>
                    </div>
                    <button type="button" class="remove-file-btn" (click)="removeMusicFile()">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="error" *ngIf="!selectedMusicFile && !musicForm.get('fileUrl')?.value">
                Music file is required
              </div>
            </div>            <!-- Image File Upload -->
            <div class="form-group">
              <label>Cover Image</label>
              <div
                class="file-upload-area image-upload"
                [class.dragover]="isImageDragOver"
                (click)="triggerImageFileInput()"
                (dragover)="onImageDragOver($event)"
                (dragleave)="onImageDragLeave($event)"
                (drop)="onImageFileDrop($event)">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  (change)="onImageFileSelected($event)"
                  class="file-input"
                  id="imageFile"
                  #imageFileInput>
                <div class="upload-icon">
                  <i class="fas fa-image"></i>
                </div>
                <div class="upload-text" *ngIf="!selectedImageFile">
                  <span class="browse-link">Choose image</span> or drag here
                </div>
                <div class="upload-text" *ngIf="selectedImageFile">
                  {{selectedImageFile.name}}
                </div>
                <div class="upload-hint">Supported formats: JPG, PNG, WEBP, GIF</div>

                <div *ngIf="uploadingImage" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="imageFileProgress"></div>
                  </div>
                  <div class="progress-text">{{imageFileProgress}}%</div>
                </div>

                <div *ngIf="selectedImageFile" class="file-preview">
                  <div class="preview-header">
                    <div class="file-info">
                      <i class="file-icon fas fa-image"></i>
                      <div class="file-details">
                        <div class="file-name">{{selectedImageFile.name}}</div>
                        <div class="file-size">{{formatFileSize(selectedImageFile.size)}}</div>
                      </div>
                    </div>
                    <button type="button" class="remove-file-btn" (click)="removeImageFile()">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>

                  <!-- Image Preview -->
                  <div class="image-preview">
                    <img [src]="getImagePreview()" alt="Preview">
                  </div>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="durationSeconds">Duration (seconds) *</label>
                <input type="number" id="durationSeconds" formControlName="durationSeconds" min="1" placeholder="Duration in seconds">
                <div class="error" *ngIf="musicForm.get('durationSeconds')?.touched && musicForm.get('durationSeconds')?.errors?.['required']">
                  Duration is required
                </div>
              </div>              <div class="form-group">
                <label for="categoryId">Category</label>
                <select id="categoryId" formControlName="categoryId">
                  <option value="">Select Category</option>
                  <option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="artistId">Artist</label>
                <select id="artistId" formControlName="artistId">
                  <option value="">Select Artist</option>
                  <option *ngFor="let artist of artists" [value]="artist.id">{{artist.name}}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="typeMusic">Music Type</label>
                <select id="typeMusic" formControlName="typeMusic">
                  <option *ngFor="let type of musicTypes" [value]="type.value">{{type.label}}</option>
                </select>
              </div>              <div class="form-group">
                <div class="checkbox-container">
                  <input type="checkbox" formControlName="isActive" id="isActive">
                  <label for="isActive">Active</label>
                </div>
              </div>
            </div>
          </div>          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="musicForm.invalid || submitting">
              {{submitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}}
            </button>
          </div>
        </form>
      </div>
    </div>    <!-- View Modal -->
    <div class="modal-overlay" *ngIf="showViewModal" (click)="closeViewModal()">
      <div class="modal modal-large" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Music Details</h3>
          <button class="btn-close" (click)="closeViewModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" *ngIf="selectedMusicItem">
          <div class="music-details">            <div class="music-image">
              <img [src]="selectedMusicItem.imageUrl || 'https://via.placeholder.com/200x200/e0e0e0/666666?text=♪'" [alt]="selectedMusicItem.title">
            </div>
            <div class="music-info">
              <h2>{{selectedMusicItem.title}}</h2>
              <p class="artist" *ngIf="selectedMusicItem.artist">Artist: {{selectedMusicItem.artist.name}}</p>
              <p class="category" *ngIf="selectedMusicItem.category">Category: {{selectedMusicItem.category.name}}</p>
              <p class="duration">Duration: {{formatDuration(selectedMusicItem.durationSeconds)}}</p>
              <p class="type">Type: {{formatMusicType(selectedMusicItem.typeMusic)}}</p>
              <p class="stats">Play Count: {{selectedMusicItem.playCount | number}}</p>
              <p class="stats">Like Count: {{selectedMusicItem.likeCount | number}}</p>
              <p class="status">Status:
                <span class="status-badge" [class.active]="selectedMusicItem.isActive" [class.inactive]="!selectedMusicItem.isActive">
                  {{selectedMusicItem.isActive ? 'Active' : 'Inactive'}}
                </span>
              </p>
              <p class="dates">Created: {{selectedMusicItem.createdAt | date:'medium'}}</p>
              <p class="dates">Updated: {{selectedMusicItem.updatedAt | date:'medium'}}</p>
            </div>
          </div>
          <div class="audio-player" *ngIf="selectedMusicItem.fileUrl">
            <audio controls style="width: 100%;">
              <source [src]="selectedMusicItem.fileUrl" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>      </div>
    </div>
  `
})
export class AdminMusicComponent implements OnInit {
  musicList: Music[] = [];
  categories: Category[] = [];
  artists: Artist[] = [];
  selectedMusic: number[] = [];
  musicForm!: FormGroup;
  showModal = false;
  showViewModal = false;
  isEditMode = false;  selectedMusicItem: Music | null = null;
  loading = false;
  submitting = false;
  // File upload properties
  selectedMusicFile: File | null = null;
  selectedImageFile: File | null = null;
  musicFileProgress = 0;
  imageFileProgress = 0;
  uploadingMusic = false;
  uploadingImage = false;

  // Drag & Drop properties
  isDragOver = false;
  isImageDragOver = false;
  // Pagination
  pageInfo: PageResponse<Music> = {
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
    sort: 'createdAt',
    direction: 'desc'
  };

  filters: MusicFilters = {};

  musicTypes = [
    { value: MusicType.NEW_MUSIC, label: 'New Music' },
    { value: MusicType.TRENDING, label: 'Trending' },
    { value: MusicType.TOP_VIEW, label: 'Top View' },
    { value: MusicType.VN_LOFI, label: 'VN Lofi' },
    { value: MusicType.FAVORITE, label: 'Favorite' }
  ];

  Math = Math;  constructor(
    private adminMusicService: AdminMusicService,
    private adminArtistService: AdminArtistService,
    private musicService: MusicService,
    private categoryService: CategoryService,
    public authService: AuthService,
    private fb: FormBuilder,
    private firebaseStorage: FirebaseStorageService
  ) {
    this.initForm();
  }ngOnInit() {
    console.log('AdminMusicComponent initialized');

    // Check current user status
    this.authService.currentUser$.subscribe((user: User | null) => {
      console.log('Current user:', user);
      console.log('Is admin:', user?.isAdmin);
      console.log('Auth token:', this.authService.getToken());
    });    this.testRegularMusicService();
    this.loadMusic();
    this.loadCategories();
    this.loadArtists();
  }

  testRegularMusicService() {
    console.log('Testing regular music service...');
    this.musicService.getAllMusic().subscribe({
      next: (response) => {
        console.log('Regular music service response:', response);
      },
      error: (error) => {
        console.error('Regular music service error:', error);
      }
    });
  }  initForm() {
    this.musicForm = this.fb.group({
      title: ['', Validators.required],
      fileUrl: [''], // Will be populated after upload
      imageUrl: [''], // Will be populated after upload
      durationSeconds: ['', [Validators.required, Validators.min(1)]],
      categoryId: [''],
      artistId: [''],
      typeMusic: [MusicType.NEW_MUSIC],
      isActive: [true]
    });
  }
  loadMusic() {
    this.loading = true;
    console.log('Loading music with params:', this.paginationParams, 'filters:', this.filters);

    this.adminMusicService.getAllMusic(this.paginationParams, this.filters).subscribe({
      next: (response) => {
        console.log('Music API response:', response);
        if (response.success && response.data) {
          this.musicList = response.data.content;
          this.pageInfo = response.data;
          console.log('Music list:', this.musicList);
          console.log('Page info:', this.pageInfo);
        } else {
          console.log('API response not successful or no data:', response);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading music:', error);
        console.error('Error details:', error.status, error.message);
        this.loading = false;
      }
    });
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
  loadArtists() {
    this.adminArtistService.getAllArtists({ page: 0, size: 1000 }, { isActive: true }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.artists = response.data.content;
        }
      },
      error: (error: any) => {
        console.error('Error loading artists:', error);
      }
    });
  }

  clearFilters() {
    this.filters = {};
    this.paginationParams.page = 0;
    this.loadMusic();
  }

  showCreateForm() {
    this.isEditMode = false;
    this.musicForm.reset({
      typeMusic: MusicType.NEW_MUSIC,
      isActive: true
    });
    this.showModal = true;
  }

  editMusic(music: Music) {
    this.isEditMode = true;
    this.selectedMusicItem = music;    this.musicForm.patchValue({
      title: music.title,
      fileUrl: music.fileUrl,
      imageUrl: music.imageUrl,
      durationSeconds: music.durationSeconds,
      categoryId: music.category?.id || '',
      artistId: music.artist?.id || '',
      typeMusic: music.typeMusic,
      isActive: music.isActive
    });
    this.showModal = true;
  }

  viewMusic(music: Music) {
    this.selectedMusicItem = music;
    this.showViewModal = true;
  }
  async onSubmit() {
    if (this.musicForm.valid) {
      // Check if music file is provided (either uploaded or existing URL)
      if (!this.selectedMusicFile && !this.musicForm.get('fileUrl')?.value) {
        alert('Please provide a music file');
        return;
      }

      this.submitting = true;

      try {
        // Upload files if any are selected
        await this.uploadFiles();        const formValue = this.musicForm.value;
        const request = {
          ...formValue,
          categoryId: formValue.categoryId || null,
          artistId: formValue.artistId || null
        };

        const operation = this.isEditMode
          ? this.adminMusicService.updateMusic(this.selectedMusicItem!.id, request)
          : this.adminMusicService.createMusic(request);

        operation.subscribe({
          next: (response) => {
            if (response.success) {
              this.closeModal();
              this.loadMusic();
            }
            this.submitting = false;
          },
          error: (error) => {
            console.error('Error saving music:', error);
            this.submitting = false;
          }
        });
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files. Please try again.');
        this.submitting = false;
      }
    }
  }

  deleteMusic(music: Music) {
    if (confirm(`Are you sure you want to delete "${music.title}"?`)) {
      this.adminMusicService.deleteMusic(music.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadMusic();
          }
        },
        error: (error) => {
          console.error('Error deleting music:', error);
        }
      });
    }
  }

  toggleStatus(music: Music) {
    this.adminMusicService.toggleActiveStatus(music.id).subscribe({
      next: (response) => {
        if (response.success) {
          music.isActive = !music.isActive;
        }
      },
      error: (error) => {
        console.error('Error toggling status:', error);
      }
    });
  }

  // Selection methods
  toggleSelection(musicId: number, event: any) {
    if (event.target.checked) {
      this.selectedMusic.push(musicId);
    } else {
      this.selectedMusic = this.selectedMusic.filter(id => id !== musicId);
    }
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedMusic = this.musicList.map(music => music.id);
    } else {
      this.selectedMusic = [];
    }
  }

  isSelected(musicId: number): boolean {
    return this.selectedMusic.includes(musicId);
  }

  isAllSelected(): boolean {
    return this.musicList.length > 0 && this.selectedMusic.length === this.musicList.length;
  }

  clearSelection() {
    this.selectedMusic = [];
  }

  // Bulk operations
  bulkDelete() {
    if (confirm(`Are you sure you want to delete ${this.selectedMusic.length} music item(s)?`)) {
      this.adminMusicService.bulkDeleteMusic(this.selectedMusic).subscribe({
        next: (response) => {
          if (response.success) {
            this.clearSelection();
            this.loadMusic();
          }
        },
        error: (error) => {
          console.error('Error in bulk delete:', error);
        }
      });
    }
  }

  bulkToggleActive(active: boolean) {
    this.adminMusicService.bulkToggleActive(this.selectedMusic, active).subscribe({
      next: (response) => {
        if (response.success) {
          this.clearSelection();
          this.loadMusic();
        }
      },
      error: (error) => {
        console.error('Error in bulk toggle:', error);
      }
    });
  }

  // Pagination methods
  goToPage(page: number) {
    this.paginationParams.page = page;
    this.loadMusic();
  }

  getPageNumbers(): number[] {
    const totalPages = this.pageInfo.totalPages;
    const currentPage = this.pageInfo.number;
    const maxVisible = 5;

    let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Utility methods
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatMusicType(type: MusicType): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }
  closeModal() {
    this.showModal = false;
    this.selectedMusicItem = null;
    this.musicForm.reset();
    this.resetFileUploads();
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedMusicItem = null;
  }

  // File Upload Methods
  onMusicFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.firebaseStorage.validateMusicFile(file)) {
      this.selectedMusicFile = file;
    } else {
      alert('Please select a valid MP3 file (max 50MB)');
      event.target.value = '';
    }
  }

  onImageFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.firebaseStorage.validateImageFile(file)) {
      this.selectedImageFile = file;
    } else {
      alert('Please select a valid image file (JPEG, PNG, WebP, GIF, max 5MB)');
      event.target.value = '';
    }
  }

  removeMusicFile() {
    this.selectedMusicFile = null;
    this.musicFileProgress = 0;
    const fileInput = document.getElementById('musicFile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
  removeImageFile() {
    this.selectedImageFile = null;
    this.imageFileProgress = 0;
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  triggerMusicFileInput() {
    const fileInput = document.getElementById('musicFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  triggerImageFileInput() {
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Drag & Drop methods for music files
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onMusicFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.firebaseStorage.validateMusicFile(file)) {
        this.selectedMusicFile = file;
      } else {
        alert('Please select a valid MP3 file (max 50MB)');
      }
    }
  }

  // Drag & Drop methods for image files
  onImageDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isImageDragOver = true;
  }

  onImageDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isImageDragOver = false;
  }

  onImageFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isImageDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.firebaseStorage.validateImageFile(file)) {
        this.selectedImageFile = file;
      } else {
        alert('Please select a valid image file (JPEG, PNG, WebP, GIF, max 5MB)');
      }
    }
  }

  getImagePreview(): string {
    if (this.selectedImageFile) {
      return URL.createObjectURL(this.selectedImageFile);
    }
    return '';
  }

  formatFileSize(bytes: number): string {
    return this.firebaseStorage.formatFileSize(bytes);
  }

  resetFileUploads() {
    this.selectedMusicFile = null;
    this.selectedImageFile = null;
    this.musicFileProgress = 0;
    this.imageFileProgress = 0;
    this.uploadingMusic = false;
    this.uploadingImage = false;
  }

  async uploadFiles(): Promise<void> {
    const uploads: Promise<void>[] = [];

    // Upload music file if selected
    if (this.selectedMusicFile) {
      this.uploadingMusic = true;
      const musicUpload = this.firebaseStorage.uploadMusicFile(this.selectedMusicFile)
        .toPromise()
        .then(url => {
          this.musicForm.patchValue({ fileUrl: url });
          this.uploadingMusic = false;
          this.musicFileProgress = 100;
        })
        .catch(error => {
          console.error('Error uploading music file:', error);
          this.uploadingMusic = false;
          throw error;
        });
      uploads.push(musicUpload);
    }

    // Upload image file if selected
    if (this.selectedImageFile) {
      this.uploadingImage = true;
      const imageUpload = this.firebaseStorage.uploadImageFile(this.selectedImageFile)
        .toPromise()
        .then(url => {
          this.musicForm.patchValue({ imageUrl: url });
          this.uploadingImage = false;
          this.imageFileProgress = 100;
        })
        .catch(error => {
          console.error('Error uploading image file:', error);
          this.uploadingImage = false;
          throw error;
        });
      uploads.push(imageUpload);
    }

    await Promise.all(uploads);
  }
}
