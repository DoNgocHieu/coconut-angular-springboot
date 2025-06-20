import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CategoryService, Category } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="category-list-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1>
            <i class="fas fa-list"></i>
            Music Categories
          </h1>
          <p>Browse music by different categories and genres</p>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading categories...</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && categories.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-folder-open"></i>
        </div>
        <h3>No categories found</h3>
        <p>Categories will appear here once they are available</p>
      </div>      <!-- Categories Grid -->
      <div *ngIf="!isLoading && categories.length > 0" class="categories-grid">
        <div *ngFor="let category of categories; let i = index"
             class="category-card"
             [class]="getCategoryCardClass(category.name, i)"
             (click)="viewCategoryMusic(category)">
          <div class="category-gradient"></div>
          <div class="category-icon">
            <i [class]="getCategoryIcon(category.name)"></i>
          </div>
          <div class="category-content">
            <h3>{{ category.name }}</h3>
            <p class="song-count">
              <i class="fas fa-headphones"></i>
              {{ category.songCount || 0 }} bài hát
            </p>
            <p class="category-description" *ngIf="category.description">
              {{ category.description }}
            </p>
          </div>
          <div class="category-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: (Category & { songCount?: number })[] = [];
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data.map(category => ({
            ...category,
            songCount: Math.floor(Math.random() * 100) + 1 // Temporary until we get real counts
          }));
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loadMockData();
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  loadMockData() {
    // Mock data for development
    this.categories = [
      { id: 1, name: 'Pop', description: 'Popular music', imageUrl: '', songCount: 45, isActive: true, createdAt: '', updatedAt: '' },
      { id: 2, name: 'Rock', description: 'Rock music', imageUrl: '', songCount: 32, isActive: true, createdAt: '', updatedAt: '' },
      { id: 3, name: 'Jazz', description: 'Jazz music', imageUrl: '', songCount: 28, isActive: true, createdAt: '', updatedAt: '' },
      { id: 4, name: 'Classical', description: 'Classical music', imageUrl: '', songCount: 19, isActive: true, createdAt: '', updatedAt: '' },
      { id: 5, name: 'Hip Hop', description: 'Hip hop music', imageUrl: '', songCount: 67, isActive: true, createdAt: '', updatedAt: '' },
      { id: 6, name: 'Electronic', description: 'Electronic music', imageUrl: '', songCount: 54, isActive: true, createdAt: '', updatedAt: '' }
    ];
  }

  viewCategoryMusic(category: Category) {
    // Navigate to music list with category filter using query params
    this.router.navigate(['/music'], {
      queryParams: {
        categoryId: category.id,
        categoryName: category.name
      }
    });
  }

  getCategoryCardClass(categoryName: string, index: number): string {
    const categoryClasses: { [key: string]: string } = {
      'Pop': 'category-pop',
      'Rock': 'category-rock',
      'Jazz': 'category-jazz',
      'Classical': 'category-classical',
      'Hip Hop': 'category-hiphop',
      'Electronic': 'category-electronic',
      'EDM': 'category-edm',
      'Chill': 'category-chill',
      'Trending': 'category-trending',
      'VN Lofi': 'category-lofi'
    };

    // Fallback to color based on index
    const fallbackClasses = [
      'category-primary', 'category-secondary', 'category-success',
      'category-warning', 'category-info', 'category-purple',
      'category-pink', 'category-orange'
    ];

    return categoryClasses[categoryName] || fallbackClasses[index % fallbackClasses.length];
  }

  getCategoryIcon(categoryName: string): string {
    const categoryIcons: { [key: string]: string } = {
      'Pop': 'fas fa-star',
      'Rock': 'fas fa-guitar',
      'Jazz': 'fas fa-music',
      'Classical': 'fas fa-violin',
      'Hip Hop': 'fas fa-microphone',
      'Electronic': 'fas fa-wave-square',
      'EDM': 'fas fa-volume-up',
      'Chill': 'fas fa-leaf',
      'Trending': 'fas fa-fire',
      'VN Lofi': 'fas fa-coffee'
    };

    return categoryIcons[categoryName] || 'fas fa-music';
  }
}
