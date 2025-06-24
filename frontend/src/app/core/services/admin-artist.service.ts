import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/music.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface ArtistCreateRequest {
  name: string;
  bio?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface ArtistUpdateRequest {
  name: string;
  bio?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface ArtistFilters {
  search?: string;
  isActive?: boolean;
}

export interface ArtistStats {
  artist: Artist;
  totalMusic: number;
  activeMusicCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminArtistService {
  private readonly API_URL = `${environment.apiUrl}/admin/artists`;

  constructor(private http: HttpClient) { }

  getAllArtists(params?: PaginationParams, filters?: ArtistFilters): Observable<ApiResponse<PageResponse<Artist>>> {
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
    }

    const url = `${this.API_URL}?${httpParams.toString()}`;
    console.log('Calling admin artists API:', url);

    return this.http.get<ApiResponse<PageResponse<Artist>>>(this.API_URL, { params: httpParams });
  }

  getArtistById(id: number): Observable<ApiResponse<Artist>> {
    return this.http.get<ApiResponse<Artist>>(`${this.API_URL}/${id}`);
  }

  createArtist(request: ArtistCreateRequest): Observable<ApiResponse<Artist>> {
    return this.http.post<ApiResponse<Artist>>(this.API_URL, request);
  }

  updateArtist(id: number, request: ArtistUpdateRequest): Observable<ApiResponse<Artist>> {
    return this.http.put<ApiResponse<Artist>>(`${this.API_URL}/${id}`, request);
  }

  deleteArtist(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`);
  }

  toggleActiveStatus(id: number): Observable<ApiResponse<Artist>> {
    return this.http.patch<ApiResponse<Artist>>(`${this.API_URL}/${id}/toggle-active`, {});
  }

  getArtistStats(id: number): Observable<ApiResponse<ArtistStats>> {
    return this.http.get<ApiResponse<ArtistStats>>(`${this.API_URL}/${id}/stats`);
  }

  bulkDeleteArtists(artistIds: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-delete`, artistIds);
  }

  bulkToggleActive(artistIds: number[], active: boolean): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/bulk-toggle-active?active=${active}`, artistIds);
  }

  // Convenience method to get active artists for dropdowns
  getActiveArtists(): Observable<ApiResponse<PageResponse<Artist>>> {
    return this.getAllArtists(
      { page: 0, size: 1000, sort: 'name', direction: 'asc' },
      { isActive: true }
    );
  }
}
