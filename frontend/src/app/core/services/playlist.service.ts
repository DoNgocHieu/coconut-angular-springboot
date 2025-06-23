import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { Music } from '../models/music.model';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  // Get all public playlists
  getPlaylists(page: number = 0, size: number = 20): Observable<ApiResponse<PageableResponse<Playlist>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PageableResponse<Playlist>>>(`${this.apiUrl}/public`, { params });
  }

  // Get playlists by user
  getUserPlaylists(userId: number, page: number = 0, size: number = 20): Observable<ApiResponse<PageableResponse<Playlist>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PageableResponse<Playlist>>>(`${this.apiUrl}/user/${userId}`, { params });
  }

  // Get playlist by ID
  getPlaylistById(id: number): Observable<ApiResponse<Playlist>> {
    return this.http.get<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`);
  }

  // Create new playlist
  createPlaylist(playlist: Partial<Playlist>): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(this.apiUrl, playlist);
  }

  // Create new playlist with image
  createPlaylistWithImage(formData: FormData): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(this.apiUrl, formData);
  }

  // Update playlist
  updatePlaylist(id: number, playlist: Partial<Playlist>): Observable<ApiResponse<Playlist>> {
    return this.http.put<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`, playlist);
  }

  // Update playlist with image
  updatePlaylistWithImage(id: number, formData: FormData): Observable<ApiResponse<Playlist>> {
    return this.http.put<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete playlist
  deletePlaylist(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  // Add music to playlist
  addMusicToPlaylist(playlistId: number, musicId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/${playlistId}/music/${musicId}`, {});
  }

  // Remove music from playlist
  removeMusicFromPlaylist(playlistId: number, musicId: number): Observable<ApiResponse<void>> {
    const token = localStorage.getItem('accessToken');
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/${playlistId}/music/${musicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // Get music for a specific playlist
  getPlaylistMusic(playlistId: number): Observable<ApiResponse<Music[]>> {
    return this.http.get<ApiResponse<Music[]>>(`${this.apiUrl}/${playlistId}/music`);
  }

  // Admin method to get all playlists (public and private)
  getAllPlaylistsForAdmin(page: number = 0, size: number = 20): Observable<ApiResponse<PageableResponse<Playlist>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PageableResponse<Playlist>>>(this.apiUrl, { params });
  }


}
