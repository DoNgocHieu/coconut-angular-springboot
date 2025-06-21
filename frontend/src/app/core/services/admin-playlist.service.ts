import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface PlaylistCreateRequest {
  name: string;
  description?: string;
  isPublic: boolean;
  userId: number;
}

export interface PlaylistUpdateRequest {
  name: string;
  description?: string;
  isPublic: boolean;
}

export interface PlaylistFilters {
  search?: string;
  isPublic?: boolean;
  userId?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPlaylistService {
  private apiUrl = `${environment.apiUrl}/admin/playlists`;

  constructor(private http: HttpClient) {}
  // Get all playlists with admin privileges
  getAllPlaylists(params: PaginationParams, filters?: PlaylistFilters): Observable<ApiResponse<PageResponse<Playlist>>> {
    let httpParams = new HttpParams()
      .set('page', (params.page || 0).toString())
      .set('size', (params.size || 20).toString());

    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params.direction) {
      httpParams = httpParams.set('direction', params.direction);
    }

    if (filters?.search) {
      httpParams = httpParams.set('search', filters.search);
    }

    return this.http.get<ApiResponse<PageResponse<Playlist>>>(this.apiUrl, { params: httpParams });
  }

  // Get playlist by ID
  getPlaylistById(id: number): Observable<ApiResponse<Playlist>> {
    return this.http.get<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`);
  }

  // Create new playlist
  createPlaylist(request: PlaylistCreateRequest): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(this.apiUrl, request);
  }

  // Update playlist
  updatePlaylist(id: number, request: PlaylistUpdateRequest): Observable<ApiResponse<Playlist>> {
    return this.http.put<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`, request);
  }

  // Delete playlist
  deletePlaylist(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // Get playlist music
  getPlaylistMusic(id: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${id}/music`);
  }

  // Add music to playlist
  addMusicToPlaylist(playlistId: number, musicId: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/${playlistId}/music/${musicId}`, {});
  }

  // Remove music from playlist
  removeMusicFromPlaylist(playlistId: number, musicId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${playlistId}/music/${musicId}`);
  }

  // Toggle playlist privacy
  togglePlaylistPrivacy(id: number): Observable<ApiResponse<Playlist>> {
    return this.http.patch<ApiResponse<Playlist>>(`${this.apiUrl}/${id}/privacy`, {});
  }

  // Bulk delete playlists
  deletePlaylists(ids: number[]): Observable<ApiResponse<any>> {
    // For now, delete one by one. Can be optimized with a bulk endpoint later
    return new Observable(observer => {
      const deletePromises = ids.map(id => this.deletePlaylist(id).toPromise());
      Promise.all(deletePromises)
        .then(() => observer.next({ success: true, message: 'Playlists deleted successfully', data: null, timestamp: new Date().toISOString() }))
        .catch(error => observer.error(error));
    });
  }
}
