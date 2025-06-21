import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/music.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface CategoryCreateRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CategoryUpdateRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  private readonly API_URL = `${environment.apiUrl}/admin/categories`;

  constructor(private http: HttpClient) { }

  getAllCategories(params?: PaginationParams, filters?: CategoryFilters): Observable<ApiResponse<PageResponse<Category>>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
      if (params.sort) httpParams = httpParams.set('sortBy', params.sort);
      if (params.direction) httpParams = httpParams.set('sortDir', params.direction);
    }

    if (filters) {
      if (filters.search) httpParams = httpParams.set('search', filters.search);
      if (filters.isActive !== undefined) httpParams = httpParams.set('isActive', filters.isActive.toString());
    }    const url = `${this.API_URL}?${httpParams.toString()}`;
    console.log('Calling admin categories API:', url);
    console.log('Full API URL:', this.API_URL);
    console.log('HTTP params:', httpParams.toString());

    return this.http.get<ApiResponse<PageResponse<Category>>>(this.API_URL, { params: httpParams });
  }

  getCategoryById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.API_URL}/${id}`);
  }

  createCategory(request: CategoryCreateRequest): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.API_URL, request);
  }

  updateCategory(id: number, request: CategoryUpdateRequest): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.API_URL}/${id}`, request);
  }

  deleteCategory(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }

  toggleActiveStatus(id: number): Observable<ApiResponse<Category>> {
    return this.http.patch<ApiResponse<Category>>(`${this.API_URL}/${id}/toggle-active`, {});
  }

  bulkDeleteCategories(categoryIds: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-delete`, categoryIds);
  }

  bulkToggleActive(categoryIds: number[], active: boolean): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-toggle-active?active=${active}`, categoryIds);
  }
}
