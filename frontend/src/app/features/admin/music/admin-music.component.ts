import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMusicService, MusicCreateRequest, MusicUpdateRequest, MusicFilters } from '../../../core/services/admin-music.service';
import { MusicService } from '../../../core/services/music.service';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth.service';
import { Music, MusicType, Category } from '../../../core/models/music.model';
import { PageResponse, PaginationParams } from '../../../core/models/api.model';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-admin-music',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="admin-music">      <div class="music-header">
        <h1>Music Management</h1>
        <button class="admin-btn btn-primary" (click)="showCreateForm()">
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
            <button class="admin-btn btn-secondary" (click)="clearFilters()">Clear</button>
            <button class="admin-btn btn-primary" (click)="loadMusic()">Search</button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->      <div class="bulk-actions" *ngIf="selectedMusic.length > 0">
        <span>{{selectedMusic.length}} item(s) selected</span>
        <button class="admin-btn btn-secondary" (click)="bulkToggleActive(true)">Activate</button>
        <button class="admin-btn btn-secondary" (click)="bulkToggleActive(false)">Deactivate</button>
        <button class="admin-btn btn-danger" (click)="bulkDelete()">Delete</button>
        <button class="admin-btn btn-secondary" (click)="clearSelection()">Clear</button>
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
                <img [src]="music.imageUrl || 'https://via.placeholder.com/50x50/e0e0e0/666666?text=♪'" [alt]="music.title" class="music-thumb">
              </td>
              <td>
                <div class="music-title">
                  <span class="title">{{music.title}}</span>
                  <small class="artist" *ngIf="music.artist">{{music.artist.name}}</small>
                </div>
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
              <td>{{music.createdAt | date:'short'}}</td>              <td class="actions">
                <button class="btn-icon" (click)="viewMusic(music)" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" (click)="editMusic(music)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" (click)="toggleStatus(music)" title="Toggle Status">
                  <i class="fas" [class.fa-toggle-on]="music.isActive" [class.fa-toggle-off]="!music.isActive"></i>
                </button>
                <button class="btn-icon danger" (click)="deleteMusic(music)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>        <div class="no-data" *ngIf="musicList.length === 0 && !loading">
          <i class="fas fa-music"></i>
          <p>No music found</p>
          <p><small>Current user: {{authService.getCurrentUser()?.username}} (Admin: {{authService.isAdmin()}})</small></p>
          <p><small>Token: {{authService.getToken() ? 'Present' : 'Missing'}}</small></p>
          <button class="admin-btn btn-secondary" (click)="loadMusic()">Retry</button>
        </div>
      </div>      <!-- Pagination -->
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
          <h3>{{isEditMode ? 'Edit Music' : 'Add New Music'}}</h3>
          <button class="btn-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form [formGroup]="musicForm" (ngSubmit)="onSubmit()">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title *</label>
              <input type="text" id="title" formControlName="title" placeholder="Enter music title">
              <div class="error" *ngIf="musicForm.get('title')?.touched && musicForm.get('title')?.errors?.['required']">
                Title is required
              </div>
            </div>

            <div class="form-group">
              <label for="fileUrl">File URL *</label>
              <input type="url" id="fileUrl" formControlName="fileUrl" placeholder="Enter music file URL">
              <div class="error" *ngIf="musicForm.get('fileUrl')?.touched && musicForm.get('fileUrl')?.errors?.['required']">
                File URL is required
              </div>
            </div>

            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input type="url" id="imageUrl" formControlName="imageUrl" placeholder="Enter image URL">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="durationSeconds">Duration (seconds) *</label>
                <input type="number" id="durationSeconds" formControlName="durationSeconds" min="1" placeholder="Duration in seconds">
                <div class="error" *ngIf="musicForm.get('durationSeconds')?.touched && musicForm.get('durationSeconds')?.errors?.['required']">
                  Duration is required
                </div>
              </div>

              <div class="form-group">
                <label for="categoryId">Category</label>
                <select id="categoryId" formControlName="categoryId">
                  <option value="">Select Category</option>
                  <option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="typeMusic">Music Type</label>
                <select id="typeMusic" formControlName="typeMusic">
                  <option *ngFor="let type of musicTypes" [value]="type.value">{{type.label}}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="isActive">
                  <span>Active</span>
                </label>
              </div>
            </div>
          </div>          <div class="modal-footer">
            <button type="button" class="admin-btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="admin-btn btn-primary" [disabled]="musicForm.invalid || submitting">
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
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-music.component.scss']
})
export class AdminMusicComponent implements OnInit {
  musicList: Music[] = [];
  categories: Category[] = [];
  selectedMusic: number[] = [];
  musicForm!: FormGroup;
  showModal = false;
  showViewModal = false;
  isEditMode = false;
  selectedMusicItem: Music | null = null;
  loading = false;
  submitting = false;
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
    private musicService: MusicService,
    private categoryService: CategoryService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }  ngOnInit() {
    console.log('AdminMusicComponent initialized');

    // Check current user status
    this.authService.currentUser$.subscribe((user: User | null) => {
      console.log('Current user:', user);
      console.log('Is admin:', user?.isAdmin);
      console.log('Auth token:', this.authService.getToken());
    });

    this.testRegularMusicService();
    this.loadMusic();
    this.loadCategories();
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
  }

  initForm() {
    this.musicForm = this.fb.group({
      title: ['', Validators.required],
      fileUrl: ['', Validators.required],
      imageUrl: [''],
      durationSeconds: ['', [Validators.required, Validators.min(1)]],
      categoryId: [''],
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
    this.selectedMusicItem = music;
    this.musicForm.patchValue({
      title: music.title,
      fileUrl: music.fileUrl,
      imageUrl: music.imageUrl,
      durationSeconds: music.durationSeconds,
      categoryId: music.category?.id || '',
      typeMusic: music.typeMusic,
      isActive: music.isActive
    });
    this.showModal = true;
  }

  viewMusic(music: Music) {
    this.selectedMusicItem = music;
    this.showViewModal = true;
  }

  onSubmit() {
    if (this.musicForm.valid) {
      this.submitting = true;
      const formValue = this.musicForm.value;

      const request = {
        ...formValue,
        categoryId: formValue.categoryId || null
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
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedMusicItem = null;
  }
}
