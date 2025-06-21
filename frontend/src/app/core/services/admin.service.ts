import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  totalMusic: number;
  totalUsers: number;
  totalCategories: number;
  totalPlaylists: number;
  totalArtists: number;
  activeMusic: number;
  verifiedUsers: number;
  adminUsers: number;
  newMusicThisWeek: number;
  newUsersThisWeek: number;
}

export interface CategoryMusicStats {
  categories: Array<{
    categoryName: string;
    musicCount: number;
  }>;
}

export interface UserTrends {
  dailyRegistrations: Array<{
    date: string;
    count: number;
  }>;
  totalNewUsers: number;
}

export interface SystemHealth {
  database: string;
  memory: {
    max: string;
    total: string;
    used: string;
    free: string;
    usagePercentage: number;
  };
  status: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  // Dashboard APIs
  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.API_URL}/dashboard/stats`);
  }

  getMusicStatsByCategory(): Observable<ApiResponse<CategoryMusicStats>> {
    return this.http.get<ApiResponse<CategoryMusicStats>>(`${this.API_URL}/dashboard/music-by-category`);
  }

  getTopPlayedMusic(limit: number = 10): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/dashboard/top-played?limit=${limit}`);
  }

  getUserRegistrationTrends(): Observable<ApiResponse<UserTrends>> {
    return this.http.get<ApiResponse<UserTrends>>(`${this.API_URL}/dashboard/user-trends`);
  }

  getSystemHealth(): Observable<ApiResponse<SystemHealth>> {
    return this.http.get<ApiResponse<SystemHealth>>(`${this.API_URL}/system/health`);
  }
}
