import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface UserCreateRequest {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export interface UserUpdateRequest {
  username?: string;
  email?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export interface UserFilters {
  search?: string;
  isVerified?: boolean | undefined;
  isAdmin?: boolean | undefined;
}

export interface UserStats {
  user: User;
  totalPlaylists: number;
  totalFavorites: number;
  totalHistory: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private readonly API_URL = `${environment.apiUrl}/admin/users`;
  constructor(private http: HttpClient) { }

  getUsers(params?: PaginationParams, filters?: UserFilters): Observable<ApiResponse<PageResponse<User>>> {
    return this.getAllUsers(params, filters);
  }

  createUser(request: UserCreateRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.API_URL, request);
  }
  getAllUsers(params?: PaginationParams, filters?: UserFilters): Observable<ApiResponse<PageResponse<User>>> {
    console.log('getAllUsers called with params:', params);
    console.log('getAllUsers called with filters:', filters);

    let httpParams = new HttpParams();    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
      if (params.sort) {
        // Parse sort string like "createdAt,desc" into sortBy and sortDir
        const sortParts = params.sort.split(',');
        httpParams = httpParams.set('sortBy', sortParts[0]);
        if (sortParts.length > 1) {
          httpParams = httpParams.set('sortDir', sortParts[1]);
        }
      }
      if (params.direction) httpParams = httpParams.set('sortDir', params.direction);
    }

    if (filters) {
      if (filters.search) httpParams = httpParams.set('search', filters.search);
      if (filters.isVerified !== undefined) httpParams = httpParams.set('isVerified', filters.isVerified.toString());
      if (filters.isAdmin !== undefined) httpParams = httpParams.set('isAdmin', filters.isAdmin.toString());
    }

    console.log('Making request to:', `${this.API_URL}`);
    console.log('With params:', httpParams.toString());

    return this.http.get<ApiResponse<PageResponse<User>>>(this.API_URL, { params: httpParams });
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/${id}`);
  }

  updateUser(id: number, request: UserUpdateRequest): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/${id}`, request);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }

  toggleAdminStatus(id: number): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.API_URL}/${id}/toggle-admin`, {});
  }

  toggleVerifiedStatus(id: number): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.API_URL}/${id}/toggle-verified`, {});
  }

  getUserStats(id: number): Observable<ApiResponse<UserStats>> {
    return this.http.get<ApiResponse<UserStats>>(`${this.API_URL}/${id}/stats`);
  }

  bulkDeleteUsers(userIds: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-delete`, userIds);
  }

  bulkToggleVerified(userIds: number[], verified: boolean): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-toggle-verified?verified=${verified}`, userIds);
  }
}
