import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music, MusicType } from '../models/music.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface MusicCreateRequest {
  title: string;
  durationSeconds: number;
  fileUrl: string;
  imageUrl?: string;
  categoryId?: number;
  artistId?: number;
  typeMusic?: MusicType;
  isActive?: boolean;
}

export interface MusicUpdateRequest {
  title: string;
  durationSeconds: number;
  fileUrl: string;
  imageUrl?: string;
  categoryId?: number;
  artistId?: number;
  typeMusic?: MusicType;
  isActive?: boolean;
}

export interface MusicFilters {
  search?: string;
  categoryId?: number;
  artistId?: number;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminMusicService {
  private readonly API_URL = `${environment.apiUrl}/admin/music`;

  constructor(private http: HttpClient) { }
  getAllMusic(params?: PaginationParams, filters?: MusicFilters): Observable<ApiResponse<PageResponse<Music>>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
      if (params.sort) httpParams = httpParams.set('sortBy', params.sort);
      if (params.direction) httpParams = httpParams.set('sortDir', params.direction);
    }

    if (filters) {
      if (filters.search) httpParams = httpParams.set('search', filters.search);
      if (filters.categoryId) httpParams = httpParams.set('categoryId', filters.categoryId.toString());
      if (filters.artistId) httpParams = httpParams.set('artistId', filters.artistId.toString());
      if (filters.isActive !== undefined) httpParams = httpParams.set('isActive', filters.isActive.toString());
    }

    const url = `${this.API_URL}?${httpParams.toString()}`;
    console.log('Calling admin music API:', url);

    return this.http.get<ApiResponse<PageResponse<Music>>>(this.API_URL, { params: httpParams });
  }

  getMusicById(id: number): Observable<ApiResponse<Music>> {
    return this.http.get<ApiResponse<Music>>(`${this.API_URL}/${id}`);
  }

  createMusic(request: MusicCreateRequest): Observable<ApiResponse<Music>> {
    return this.http.post<ApiResponse<Music>>(this.API_URL, request);
  }

  updateMusic(id: number, request: MusicUpdateRequest): Observable<ApiResponse<Music>> {
    return this.http.put<ApiResponse<Music>>(`${this.API_URL}/${id}`, request);
  }

  deleteMusic(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }

  toggleActiveStatus(id: number): Observable<ApiResponse<Music>> {
    return this.http.patch<ApiResponse<Music>>(`${this.API_URL}/${id}/toggle-active`, {});
  }

  bulkDeleteMusic(musicIds: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-delete`, musicIds);
  }

  bulkToggleActive(musicIds: number[], active: boolean): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-toggle-active?active=${active}`, musicIds);
  }
}
