import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminArtistService } from '../../../core/services/admin-artist.service';
import { Artist } from '../../../core/models/music.model';

@Component({
  selector: 'app-admin-artists',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">
          <i class="fas fa-microphone me-2"></i>
          Artists Management
        </h2>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <i class="fas fa-plus me-1"></i>
          Add Artist
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-4">
        <div class="spinner-border" role="status"></div>
        <p class="mt-2">Loading artists...</p>
      </div>

      <!-- Artists List -->
      <div *ngIf="!loading" class="row">
        <div class="col-md-6 col-lg-4 mb-3" *ngFor="let artist of artists">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <img
                  [src]="artist.avatarUrl || 'https://via.placeholder.com/60'"
                  [alt]="artist.name"
                  class="rounded-circle me-3"
                  style="width: 60px; height: 60px; object-fit: cover;"
                />
                <div class="flex-grow-1">
                  <h5 class="card-title mb-1">{{ artist.name }}</h5>
                  <p class="card-text text-muted small mb-1" *ngIf="artist.bio">{{ artist.bio }}</p>
                  <span [class]="'badge ' + (artist.isActive ? 'bg-success' : 'bg-secondary')">
                    {{ artist.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              <div class="mt-3">
                <button class="btn btn-sm btn-outline-primary me-2" (click)="openEditModal(artist)">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-warning me-2" (click)="toggleArtistStatus(artist)">
                  <i class="fas fa-toggle-on"></i> {{ artist.isActive ? 'Deactivate' : 'Activate' }}
                </button>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteArtist(artist)">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No data -->
      <div *ngIf="!loading && artists.length === 0" class="text-center py-5">
        <i class="fas fa-microphone fa-3x text-muted mb-3"></i>
        <h4 class="text-muted">No Artists Found</h4>
        <p class="text-muted">Click "Add Artist" to create your first artist.</p>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'" *ngIf="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-microphone me-2"></i>
              {{ isEditMode ? 'Edit Artist' : 'Add New Artist' }}
            </h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>

          <form [formGroup]="artistForm" (ngSubmit)="onSubmit()">
            <div class="modal-body">
              <div class="mb-3">
                <label for="artistName" class="form-label">Name <span class="text-danger">*</span></label>
                <input
                  id="artistName"
                  type="text"
                  class="form-control"
                  formControlName="name"
                  placeholder="Enter artist name"
                />
                <div *ngIf="artistForm.get('name')?.invalid && artistForm.get('name')?.touched"
                     class="text-danger small mt-1">
                  Artist name is required
                </div>
              </div>

              <div class="mb-3">
                <label for="artistBio" class="form-label">Biography</label>
                <textarea
                  id="artistBio"
                  class="form-control"
                  formControlName="bio"
                  rows="3"
                  placeholder="Enter artist biography (optional)"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="artistAvatar" class="form-label">Avatar URL</label>
                <input
                  id="artistAvatar"
                  type="url"
                  class="form-control"
                  formControlName="avatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div class="mb-3 form-check">
                <input
                  id="artistActive"
                  type="checkbox"
                  class="form-check-input"
                  formControlName="isActive"
                />
                <label for="artistActive" class="form-check-label">
                  Active Artist
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="artistForm.invalid || submitting">
                <span *ngIf="submitting" class="spinner-border spinner-border-sm me-1"></span>
                <i *ngIf="!submitting" class="fas fa-check me-1"></i>
                {{ isEditMode ? 'Update Artist' : 'Create Artist' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade" [class.show]="showModal" *ngIf="showModal"></div>
  `,  styles: [`
    /* Force Font Awesome icons to display correctly */
    .fas,
    .far,
    .fab,
    .fa {
      font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Pro', 'Font Awesome 5 Free', 'Font Awesome 5 Pro' !important;
      font-weight: 900 !important;
    }

    .far {
      font-weight: 400 !important;
    }

    .fab {
      font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands' !important;
      font-weight: 400 !important;
    }

    /* Ensure icons are not affected by text font changes */
    .btn i,
    button i {
      font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Pro', 'Font Awesome 5 Free', 'Font Awesome 5 Pro' !important;
    }

    .modal {
      z-index: 1050;
    }
    .modal-backdrop {
      z-index: 1040;
    }
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class AdminArtistsComponent implements OnInit {
  artists: Artist[] = [];
  loading = false;
  submitting = false;

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
  }

  loadArtists() {
    this.loading = true;

    this.adminArtistService.getAllArtists({ page: 0, size: 100 }, {}).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.artists = response.data.content;
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading artists:', error);
        this.loading = false;
      }
    });
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
}
