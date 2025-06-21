import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUserService, UserCreateRequest, UserUpdateRequest, UserFilters } from '../../../core/services/admin-user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.model';
import { PageResponse, PaginationParams } from '../../../core/models/api.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  template: `
    <div class="admin-users">
      <div class="header">
        <h1>Users Management</h1>
        <button class="admin-btn btn-primary" (click)="showCreateForm()">
          <i class="fas fa-plus"></i> Add New User
        </button>
      </div>      <!-- Filters -->
      <div class="filters-section">
        <div class="filters-form">
          <div class="filter-group">
            <label>Search:</label>
            <input type="text" [(ngModel)]="filters.search" (keyup.enter)="loadUsers()" placeholder="Search by username or email...">
          </div>
          <div class="filter-group">
            <label>Role:</label>
            <select [(ngModel)]="filters.isAdmin" (change)="loadUsers()">
              <option value="">All Roles</option>
              <option [value]="true">Admin</option>
              <option [value]="false">User</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status:</label>
            <select [(ngModel)]="filters.isVerified" (change)="loadUsers()">
              <option value="">All</option>
              <option [value]="true">Verified</option>
              <option [value]="false">Unverified</option>
            </select>
          </div>
          <div class="filter-actions">            <button class="admin-btn btn-secondary" (click)="clearFilters()">Clear</button>
            <button class="admin-btn btn-primary" (click)="loadUsers()">Search</button>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="bulk-actions" *ngIf="selectedUsers.length > 0">
        <span>{{selectedUsers.length}} item(s) selected</span>        <button class="admin-btn btn-secondary" (click)="bulkToggleVerified(true)">Verify</button>
        <button class="admin-btn btn-secondary" (click)="bulkToggleVerified(false)">Unverify</button>
        <button class="admin-btn btn-secondary" (click)="bulkToggleAdmin(true)">Make Admin</button>
        <button class="admin-btn btn-secondary" (click)="bulkToggleAdmin(false)">Remove Admin</button>
        <button class="admin-btn btn-danger" (click)="bulkDelete()">Delete</button>
        <button class="admin-btn btn-link" (click)="clearSelection()">Clear</button>
      </div>

      <!-- Users Table -->
      <div class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll($event)">
              </th>              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of usersList" [class.selected]="isSelected(user.id)">
              <td>
                <input type="checkbox" [checked]="isSelected(user.id)" (change)="toggleSelection(user.id, $event)">
              </td>
              <td>
                <div class="user-info">
                  <span class="username">{{user.username}}</span>
                </div>
              </td>              <td class="user-email">{{user.email}}</td>
              <td class="user-role">
                <span class="role-badge" [class.admin]="user.isAdmin" [class.user]="!user.isAdmin">
                  {{user.isAdmin ? 'Admin' : 'User'}}
                </span>
              </td>
              <td>
                <span class="status-badge" [class.verified]="user.isVerified" [class.unverified]="!user.isVerified">
                  {{user.isVerified ? 'Verified' : 'Unverified'}}
                </span>
              </td>
              <td>{{user.createdAt | date:'short'}}</td>              <td class="actions">
                <button class="btn-icon" (click)="viewUser(user)" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" (click)="editUser(user)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" (click)="toggleRole(user)" title="Toggle Role">
                  <i class="fas" [class.fa-user-shield]="!user.isAdmin" [class.fa-user]="user.isAdmin"></i>
                </button>
                <button class="btn-icon" (click)="toggleStatus(user)" title="Toggle Status">
                  <i class="fas" [class.fa-check-circle]="!user.isVerified" [class.fa-times-circle]="user.isVerified"></i>
                </button>
                <button class="btn-icon danger" (click)="deleteUser(user)" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>        <div class="empty-state" *ngIf="usersList.length === 0 && !loading">
          <i class="fas fa-users"></i>
          <h3>No users found</h3>
          <p>Current user: {{authService.getCurrentUser()?.username}} (Admin: {{authService.isAdmin()}})</p>
          <p>Token: {{authService.getToken() ? 'Present' : 'Missing'}}</p>
          <button class="admin-btn btn-secondary" (click)="loadUsers()">Retry</button>
        </div>
      </div>

      <!-- Loading -->
      <div class="loading-spinner" *ngIf="loading">
        <div class="spinner"></div>
      </div>

      <!-- Pagination -->
      <div class="pagination" *ngIf="pageInfo.totalElements > 0">
        <div class="pagination-info">
          Showing {{(pageInfo.number * pageInfo.size) + 1}} to {{Math.min((pageInfo.number + 1) * pageInfo.size, pageInfo.totalElements)}} of {{pageInfo.totalElements}} results
        </div>
        <div class="pagination-controls">          <button class="page-btn" [disabled]="pageInfo.first" (click)="goToPage(0)">
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
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">        <div class="modal-header">
          <h3>{{isEditMode ? 'Edit User' : 'Add New User'}}</h3>          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <div class="modal-body">
            <div class="form-group">
              <label for="username">Username *</label>
              <input type="text" id="username" formControlName="username" placeholder="Enter username">
              <div class="error" *ngIf="userForm.get('username')?.touched && userForm.get('username')?.errors?.['required']">
                Username is required
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" formControlName="email" placeholder="Enter email">
              <div class="error" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.errors?.['required']">
                Email is required
              </div>
              <div class="error" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.errors?.['email']">
                Invalid email format
              </div>
            </div>

            <div class="form-group" *ngIf="!isEditMode">
              <label for="password">Password *</label>
              <input type="password" id="password" formControlName="password" placeholder="Enter password">
              <div class="error" *ngIf="userForm.get('password')?.touched && userForm.get('password')?.errors?.['required']">
                Password is required
              </div>
            </div>            <div class="form-group">
              <label>Admin Role</label>
              <div class="checkbox-container">
                <input type="checkbox" formControlName="isAdmin" id="isAdmin">
                <label for="isAdmin">Grant admin privileges</label>
              </div>
            </div>

            <div class="form-group">
              <label>Email Verified</label>
              <div class="checkbox-container">
                <input type="checkbox" formControlName="isVerified" id="isVerified">
                <label for="isVerified">Mark email as verified</label>
              </div>
            </div>
          </div>          <div class="modal-footer">            <button type="button" class="admin-btn btn-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="admin-btn btn-primary" [disabled]="userForm.invalid || submitting">
              <i class="fas fa-save"></i>
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
          <h3>User Details</h3>          <button class="close-btn" (click)="closeViewModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" *ngIf="selectedUserItem">
          <div class="user-details">
            <div class="user-info">
              <h2>{{selectedUserItem.username}}</h2>
              <p class="email">{{selectedUserItem.email}}</p>
              <p class="role">Role:
                <span class="role-badge" [class.admin]="selectedUserItem.isAdmin" [class.user]="!selectedUserItem.isAdmin">
                  {{selectedUserItem.isAdmin ? 'Admin' : 'User'}}
                </span>
              </p>
              <p class="status">Status:
                <span class="status-badge" [class.verified]="selectedUserItem.isVerified" [class.unverified]="!selectedUserItem.isVerified">
                  {{selectedUserItem.isVerified ? 'Verified' : 'Unverified'}}
                </span>
              </p>              <p class="dates">Created: {{selectedUserItem.createdAt | date:'medium'}}</p>
              <p class="dates">Updated: {{selectedUserItem.updatedAt | date:'medium'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  usersList: User[] = [];
  selectedUsers: number[] = [];
  userForm!: FormGroup;
  showModal = false;
  showViewModal = false;
  isEditMode = false;
  selectedUserItem: User | null = null;
  loading = false;
  submitting = false;

  // Pagination
  pageInfo: PageResponse<User> = {
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

  pagination: PaginationParams = {
    page: 0,
    size: 10,
    sort: 'createdAt,desc'
  };
  // Filters
  filters: UserFilters = {
    search: '',
    isAdmin: undefined,
    isVerified: undefined
  };

  Math = Math; // For template usage

  constructor(
    private adminUserService: AdminUserService,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }
  ngOnInit(): void {
    console.log('AdminUsersComponent initialized');
    console.log('Current user:', this.authService.getCurrentUser());
    console.log('Is admin:', this.authService.isAdmin());
    console.log('Token:', this.authService.getToken());
    this.loadUsers();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      isAdmin: [false],
      isVerified: [true]
    });
  }
  loadUsers(): void {
    console.log('loadUsers called with pagination:', this.pagination);
    console.log('loadUsers called with filters:', this.filters);
    this.loading = true;
    this.adminUserService.getUsers(this.pagination, this.filters).subscribe({
      next: (response) => {
        console.log('Users loaded successfully:', response);
        if (response.success && response.data) {
          this.pageInfo = response.data;
          this.usersList = response.data.content;
          console.log('Users list updated:', this.usersList);
        } else {
          console.log('Response not successful or no data:', response);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        console.error('Error details:', error.error);
        this.loading = false;
      }
    });
  }

  // Selection methods
  isSelected(userId: number): boolean {
    return this.selectedUsers.includes(userId);
  }

  toggleSelection(userId: number, event: any): void {
    if (event.target.checked) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }
  }

  isAllSelected(): boolean {
    return this.usersList.length > 0 && this.selectedUsers.length === this.usersList.length;
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedUsers = this.usersList.map(user => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  clearSelection(): void {
    this.selectedUsers = [];
  }
  // CRUD Operations
  showCreateForm(): void {
    console.log('showCreateForm called');
    this.isEditMode = false;
    this.selectedUserItem = null;
    this.initForm();
    this.userForm.get('password')?.setValidators([Validators.required]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
    console.log('Modal should be visible now:', this.showModal);
  }

  editUser(user: User): void {
    this.isEditMode = true;
    this.selectedUserItem = user;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  viewUser(user: User): void {
    this.selectedUserItem = user;
    this.showViewModal = true;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.submitting = true;

      if (this.isEditMode && this.selectedUserItem) {
        const updateRequest: UserUpdateRequest = {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          isAdmin: this.userForm.value.isAdmin,
          isVerified: this.userForm.value.isVerified
        };

        this.adminUserService.updateUser(this.selectedUserItem.id, updateRequest).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadUsers();
              this.closeModal();
            }
            this.submitting = false;
          },
          error: (error) => {
            console.error('Error updating user:', error);
            this.submitting = false;
          }
        });
      } else {
        const createRequest: UserCreateRequest = {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          isAdmin: this.userForm.value.isAdmin,
          isVerified: this.userForm.value.isVerified
        };

        this.adminUserService.createUser(createRequest).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadUsers();
              this.closeModal();
            }
            this.submitting = false;
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.submitting = false;
          }
        });
      }
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.adminUserService.deleteUser(user.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadUsers();
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  toggleRole(user: User): void {
    const updateRequest: UserUpdateRequest = {
      username: user.username,
      email: user.email,
      isAdmin: !user.isAdmin,
      isVerified: user.isVerified
    };

    this.adminUserService.updateUser(user.id, updateRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadUsers();
        }
      },
      error: (error) => {
        console.error('Error updating user role:', error);
      }
    });
  }

  toggleStatus(user: User): void {
    const updateRequest: UserUpdateRequest = {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: !user.isVerified
    };

    this.adminUserService.updateUser(user.id, updateRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadUsers();
        }
      },
      error: (error) => {
        console.error('Error updating user status:', error);
      }
    });
  }

  // Bulk operations
  bulkToggleVerified(verified: boolean): void {
    // Implementation for bulk verify/unverify
    console.log('Bulk toggle verified:', verified, this.selectedUsers);
  }

  bulkToggleAdmin(admin: boolean): void {
    // Implementation for bulk admin toggle
    console.log('Bulk toggle admin:', admin, this.selectedUsers);
  }

  bulkDelete(): void {
    if (confirm(`Are you sure you want to delete ${this.selectedUsers.length} users?`)) {
      // Implementation for bulk delete
      console.log('Bulk delete:', this.selectedUsers);
    }
  }

  // Modal methods
  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.selectedUserItem = null;
    this.submitting = false;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedUserItem = null;
  }
  // Filter methods
  clearFilters(): void {
    this.filters = {
      search: '',
      isAdmin: undefined,
      isVerified: undefined
    };
    this.pagination.page = 0;
    this.loadUsers();
  }

  // Pagination methods
  goToPage(page: number): void {
    this.pagination.page = page;
    this.loadUsers();
  }

  getPageNumbers(): number[] {
    const totalPages = this.pageInfo.totalPages;
    const currentPage = this.pageInfo.number;
    const pages: number[] = [];

    for (let i = Math.max(0, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      pages.push(i);
    }

    return pages;
  }
}
