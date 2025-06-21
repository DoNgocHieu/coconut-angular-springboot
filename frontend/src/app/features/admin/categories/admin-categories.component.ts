import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryService, CategoryCreateRequest, CategoryUpdateRequest, CategoryFilters } from '../../../core/services/admin-category.service';
import { AuthService } from '../../../core/services/auth.service';
import { Category } from '../../../core/models/music.model';
import { PageResponse, PaginationParams } from '../../../core/models/api.model';
import { User } from '../../../core/models/auth.model';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,template: `
    <div class="admin-categories">      <div class="categories-header">
        <h1>Categories Management</h1>
        <button class="admin-btn btn-primary" (click)="showCreateForm()">
          <i class="fas fa-plus"></i> Add New Category
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-row">
          <div class="filter-group">
            <label>Search:</label>
            <input type="text" [(ngModel)]="filters.search" (keyup.enter)="loadCategories()" placeholder="Search by name...">
          </div>
          <div class="filter-group">
            <label>Status:</label>
            <select [(ngModel)]="filters.isActive" (change)="loadCategories()">
              <option value="">All</option>
              <option [value]="true">Active</option>
              <option [value]="false">Inactive</option>
            </select>
          </div>          <div class="filter-actions">
            <button class="admin-btn btn-secondary" (click)="clearFilters()">Clear</button>
            <button class="admin-btn btn-primary" (click)="loadCategories()">Search</button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->      <div class="bulk-actions" *ngIf="selectedCategories.length > 0">
        <span>{{selectedCategories.length}} item(s) selected</span>
        <button class="admin-btn btn-secondary" (click)="bulkToggleActive(true)">Activate</button>
        <button class="admin-btn btn-secondary" (click)="bulkToggleActive(false)">Deactivate</button>
        <button class="admin-btn btn-danger" (click)="bulkDelete()">Delete</button>
        <button class="admin-btn btn-secondary" (click)="clearSelection()">Clear</button>
      </div>

      <!-- Categories Table -->
      <div class="categories-table-container">
        <table class="categories-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll($event)">
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categoriesList" [class.selected]="isSelected(category.id)">
              <td>
                <input type="checkbox" [checked]="isSelected(category.id)" (change)="toggleSelection(category.id, $event)">
              </td>
              <td>
                <img [src]="category.imageUrl || 'https://via.placeholder.com/50x50/e0e0e0/666666?text=📁'" [alt]="category.name" class="category-thumb">
              </td>
              <td>
                <div class="category-name">
                  <span class="name">{{category.name}}</span>
                </div>
              </td>
              <td>{{category.description || 'No description'}}</td>
              <td>
                <span class="status-badge" [class.active]="category.isActive" [class.inactive]="!category.isActive">
                  {{category.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td>{{category.createdAt | date:'short'}}</td>              <td class="actions">
                <button class="btn-icon" (click)="viewCategory(category)" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" (click)="editCategory(category)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" (click)="toggleStatus(category)" title="Toggle Status">
                  <i class="fas" [class.fa-toggle-on]="category.isActive" [class.fa-toggle-off]="!category.isActive"></i>
                </button>
                <button class="btn-icon danger" (click)="deleteCategory(category)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-data" *ngIf="categoriesList.length === 0 && !loading">
          <i class="fas fa-folder"></i>
          <p>No categories found</p>
          <p><small>Current user: {{authService.getCurrentUser()?.username}} (Admin: {{authService.isAdmin()}})</small></p>
          <p><small>Token: {{authService.getToken() ? 'Present' : 'Missing'}}</small></p>
          <button class="admin-btn btn-secondary" (click)="loadCategories()">Retry</button>
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
          <h3>{{isEditMode ? 'Edit Category' : 'Add New Category'}}</h3>
          <button class="btn-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" id="name" formControlName="name" placeholder="Enter category name">
              <div class="error" *ngIf="categoryForm.get('name')?.touched && categoryForm.get('name')?.errors?.['required']">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" formControlName="description" placeholder="Enter category description" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input type="url" id="imageUrl" formControlName="imageUrl" placeholder="Enter image URL">
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="isActive">
                <span>Active</span>
              </label>
            </div>
          </div>          <div class="modal-footer">
            <button type="button" class="admin-btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="admin-btn btn-primary" [disabled]="categoryForm.invalid || submitting">
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
          <h3>Category Details</h3>
          <button class="btn-close" (click)="closeViewModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" *ngIf="selectedCategoryItem">
          <div class="category-details">
            <div class="category-image">
              <img [src]="selectedCategoryItem.imageUrl || 'https://via.placeholder.com/200x200/e0e0e0/666666?text=📁'" [alt]="selectedCategoryItem.name">
            </div>
            <div class="category-info">
              <h2>{{selectedCategoryItem.name}}</h2>
              <p class="description">{{selectedCategoryItem.description || 'No description available'}}</p>
              <p class="status">Status:
                <span class="status-badge" [class.active]="selectedCategoryItem.isActive" [class.inactive]="!selectedCategoryItem.isActive">
                  {{selectedCategoryItem.isActive ? 'Active' : 'Inactive'}}
                </span>
              </p>
              <p class="dates">Created: {{selectedCategoryItem.createdAt | date:'medium'}}</p>
              <p class="dates">Updated: {{selectedCategoryItem.updatedAt | date:'medium'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  categoriesList: Category[] = [];
  selectedCategories: number[] = [];
  categoryForm!: FormGroup;
  showModal = false;
  showViewModal = false;
  isEditMode = false;
  selectedCategoryItem: Category | null = null;
  loading = false;
  submitting = false;

  // Pagination
  pageInfo: PageResponse<Category> = {
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
    sort: 'name',
    direction: 'asc'
  };

  filters: CategoryFilters = {};

  Math = Math;

  constructor(
    private adminCategoryService: AdminCategoryService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }  ngOnInit() {
    console.log('AdminCategoriesComponent initialized');

    // Check current user status
    this.authService.currentUser$.subscribe((user: User | null) => {
      console.log('Current user:', user);
      console.log('Is admin:', user?.isAdmin);
      console.log('Auth token:', this.authService.getToken());
    });

    this.loadCategories();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      isActive: [true]
    });
  }
  loadCategories() {
    this.loading = true;
    console.log('Loading categories with params:', this.paginationParams, 'filters:', this.filters);

    this.adminCategoryService.getAllCategories(this.paginationParams, this.filters).subscribe({
      next: (response) => {
        console.log('Categories API response:', response);
        if (response.success && response.data) {
          this.categoriesList = response.data.content;
          this.pageInfo = response.data;
          console.log('Categories list:', this.categoriesList);
          console.log('Page info:', this.pageInfo);
        } else {
          console.log('API response not successful or no data:', response);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        console.error('Error details:', error.status, error.message);
        console.error('Error full:', JSON.stringify(error, null, 2));
        this.loading = false;
      }
    });
  }

  clearFilters() {
    this.filters = {};
    this.paginationParams.page = 0;
    this.loadCategories();
  }

  showCreateForm() {
    this.isEditMode = false;
    this.categoryForm.reset({
      isActive: true
    });
    this.showModal = true;
  }

  editCategory(category: Category) {
    this.isEditMode = true;
    this.selectedCategoryItem = category;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      isActive: category.isActive
    });
    this.showModal = true;
  }

  viewCategory(category: Category) {
    this.selectedCategoryItem = category;
    this.showViewModal = true;
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.submitting = true;
      const formValue = this.categoryForm.value;

      const operation = this.isEditMode
        ? this.adminCategoryService.updateCategory(this.selectedCategoryItem!.id, formValue)
        : this.adminCategoryService.createCategory(formValue);

      operation.subscribe({
        next: (response) => {
          if (response.success) {
            this.closeModal();
            this.loadCategories();
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error saving category:', error);
          this.submitting = false;
        }
      });
    }
  }

  deleteCategory(category: Category) {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      this.adminCategoryService.deleteCategory(category.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadCategories();
          }
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  toggleStatus(category: Category) {
    this.adminCategoryService.toggleActiveStatus(category.id).subscribe({
      next: (response) => {
        if (response.success) {
          category.isActive = !category.isActive;
        }
      },
      error: (error) => {
        console.error('Error toggling status:', error);
      }
    });
  }

  // Selection methods
  toggleSelection(categoryId: number, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedCategories = this.categoriesList.map(category => category.id);
    } else {
      this.selectedCategories = [];
    }
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  isAllSelected(): boolean {
    return this.categoriesList.length > 0 && this.selectedCategories.length === this.categoriesList.length;
  }

  clearSelection() {
    this.selectedCategories = [];
  }

  // Bulk operations
  bulkDelete() {
    if (confirm(`Are you sure you want to delete ${this.selectedCategories.length} category(ies)?`)) {
      this.adminCategoryService.bulkDeleteCategories(this.selectedCategories).subscribe({
        next: (response) => {
          if (response.success) {
            this.clearSelection();
            this.loadCategories();
          }
        },
        error: (error) => {
          console.error('Error in bulk delete:', error);
        }
      });
    }
  }

  bulkToggleActive(active: boolean) {
    this.adminCategoryService.bulkToggleActive(this.selectedCategories, active).subscribe({
      next: (response) => {
        if (response.success) {
          this.clearSelection();
          this.loadCategories();
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
    this.loadCategories();
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

  closeModal() {
    this.showModal = false;
    this.selectedCategoryItem = null;
    this.categoryForm.reset();
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedCategoryItem = null;
  }
}
