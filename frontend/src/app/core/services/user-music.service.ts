import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Music } from '../models/music.model';
import { Playlist } from '../models/playlist.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

export interface RecentlyPlayed {
  id: number;
  music: Music;
  playedAt: string;
  userId: number;
}

export interface FavoriteMusic {
  id: number;
  music: Music;
  addedAt: string;
  userId: number;
}

export interface FavoritePlaylist {
  id: number;
  playlist: Playlist;
  addedAt: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserMusicService {
  private readonly API_URL = `${environment.apiUrl}/user-admin`;
  // Local storage for favorites and recently played (until backend is ready)
  private favoritesSubject = new BehaviorSubject<number[]>(this.getFavoritesFromStorage());
  private recentlyPlayedSubject = new BehaviorSubject<Music[]>(this.getRecentlyPlayedFromStorage());

  // Observable streams for components to subscribe to
  public favorites$ = this.favoritesSubject.asObservable();
  public recentlyPlayed$ = this.recentlyPlayedSubject.asObservable();
    // Subject to notify when favorites list needs to be refreshed
  private favoritesRefreshSubject = new BehaviorSubject<boolean>(false);
  public favoritesRefresh$ = this.favoritesRefreshSubject.asObservable();

  // Method to manually trigger favorites refresh
  public triggerFavoritesRefresh(): void {
    this.favoritesRefreshSubject.next(true);
  }

  constructor(private http: HttpClient) {}

  // ===== FAVORITES =====
  getFavorites(params?: PaginationParams): Observable<ApiResponse<PageResponse<FavoriteMusic>>> {
    const page = params?.page || 0;
    const size = params?.size || 20;

    return this.http.get<ApiResponse<PageResponse<FavoriteMusic>>>(
      `${this.API_URL}/simple-favorites?page=${page}&size=${size}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    ).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for getFavorites');
        return this.getFavoritesFromStorage_Fallback();
      })
    );
  }
  // ===== FAVORITE PLAYLISTS =====
  getFavoritePlaylists(params?: PaginationParams): Observable<ApiResponse<PageResponse<FavoritePlaylist>>> {
    const page = params?.page || 0;
    const size = params?.size || 20;

    return this.http.get<ApiResponse<PageResponse<FavoritePlaylist>>>(
      `${this.API_URL}/simple-favorite-playlists?page=${page}&size=${size}`
    ).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for getFavoritePlaylists');
        return this.getFavoritePlaylistsFromStorage_Fallback();
      })
    );
  }

  addToFavoritePlaylists(playlistId: number): Observable<ApiResponse<FavoritePlaylist>> {
    return this.http.post<ApiResponse<FavoritePlaylist>>(`${this.API_URL}/simple-favorite-playlists`, { playlistId }).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for addToFavoritePlaylists');
        return this.addToFavoritePlaylistsStorage_Fallback(playlistId);
      })
    );
  }

  removeFromFavoritePlaylists(playlistId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/simple-favorite-playlists/${playlistId}`).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for removeFromFavoritePlaylists');
        return this.removeFromFavoritePlaylistsStorage_Fallback(playlistId);
      })
    );
  }
  isFavoritePlaylist(playlistId: number): Observable<boolean> {
    return this.http.get<{ isFavorite: boolean }>(`${this.API_URL}/simple-favorite-playlists/check/${playlistId}`)
      .pipe(
        map((response: any) => response.isFavorite),
        catchError(() => {
          // Fallback to localStorage
          const favoritePlaylistIds = this.getFavoritePlaylistsFromStorage();
          return of(favoritePlaylistIds.includes(playlistId));
        })
      );
  }  addToFavorites(musicId: number): Observable<ApiResponse<FavoriteMusic>> {
    return this.http.post<ApiResponse<FavoriteMusic>>(`${this.API_URL}/simple-favorites`, { musicId }).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for addToFavorites');
        return this.addToFavoritesStorage_Fallback(musicId);
      })
    ).pipe(
      map(response => {
        // Trigger refresh of favorites list
        this.favoritesRefreshSubject.next(true);
        return response;
      })
    );
  }
  removeFromFavorites(musicId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/simple-favorites/${musicId}`).pipe(
      catchError(error => {
        console.warn('API not available, using localStorage fallback for removeFromFavorites');
        return this.removeFromFavoritesStorage_Fallback(musicId);
      })
    ).pipe(
      map(response => {
        // Trigger refresh of favorites list
        this.favoritesRefreshSubject.next(true);
        return response;
      })
    );
  }

  isFavorite(musicId: number): Observable<boolean> {
    return this.http.get<{ isFavorite: boolean }>(`${this.API_URL}/simple-favorites/check/${musicId}`)
      .pipe(
        map((response: any) => response.isFavorite),
        catchError(() => {
          // Fallback to localStorage
          const favorites = this.getFavoritesFromStorage();
          return of(favorites.includes(musicId));
        })
      );
  }// ===== RECENTLY PLAYED =====
 getRecentlyPlayed(params?: PaginationParams & { userId?: number }): Observable<ApiResponse<PageResponse<RecentlyPlayed>>> {
  const page = params?.page || 0;
  const size = params?.size || 20;
  let url = `${environment.apiUrl}/user/recently-played?page=${page}&size=${size}`;
  if (params?.userId) {
    url += `&userId=${params.userId}`;
  }
  return this.http.get<ApiResponse<PageResponse<RecentlyPlayed>>>(url);
}

  addToRecentlyPlayed(music: Music, userId: number): void {
    // Call API to add to recently played, truyền cả userId
    this.http.post(`${environment.apiUrl}/user/recently-played`, { musicId: music.id, userId }).subscribe({
      next: () => {
        console.log('✅ Added to recently played via API:', music.title);
      },
      error: (error) => {
        console.warn('⚠️  API not available for recently played, using fallback storage');
        // Fallback to localStorage
        const recentlyPlayed = this.getRecentlyPlayedFromStorage();

        // Remove if already exists to avoid duplicates
        const existingIndex = recentlyPlayed.findIndex(item => item.id === music.id);
        if (existingIndex > -1) {
          recentlyPlayed.splice(existingIndex, 1);
        }

        // Add to beginning
        recentlyPlayed.unshift(music);

        // Keep only last 10 items (as per requirements)
        if (recentlyPlayed.length > 10) {
          recentlyPlayed.splice(10);
        }

        this.saveRecentlyPlayedToStorage(recentlyPlayed);
        this.recentlyPlayedSubject.next(recentlyPlayed);
      }
    });
  }

  // ===== PLAY MUSIC =====
  playMusic(musicId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/play`, { musicId });
  }

  playMultiple(musicIds: number[]): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/play/batch`, { musicIds });
  }
  clearRecentlyPlayed(userId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${environment.apiUrl}/user/recently-played?userId=${userId}`
    );
  }

  // ===== STORAGE HELPERS =====
  private getFavoritesFromStorage(): number[] {
    try {
      const stored = localStorage.getItem('coconut_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveFavoritesToStorage(favorites: number[]): void {
    try {
      localStorage.setItem('coconut_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  }

  private getRecentlyPlayedFromStorage(): Music[] {
    try {
      const stored = localStorage.getItem('coconut_recently_played');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  private saveRecentlyPlayedToStorage(recentlyPlayed: Music[]): void {
    try {
      localStorage.setItem('coconut_recently_played', JSON.stringify(recentlyPlayed));
    } catch (error) {
      console.error('Error saving recently played to storage:', error);
    }
  }

  private getFavoritePlaylistsFromStorage(): number[] {
    try {
      const stored = localStorage.getItem('coconut_favorite_playlists');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveFavoritePlaylistsToStorage(favoritePlaylistIds: number[]): void {
    try {
      localStorage.setItem('coconut_favorite_playlists', JSON.stringify(favoritePlaylistIds));
    } catch (error) {
      console.error('Error saving favorite playlists to storage:', error);
    }
  }

  // ===== FUTURE BACKEND INTEGRATION =====
  // These methods will be used when backend APIs are available

  private getFavoritesFromAPI(params?: PaginationParams): Observable<ApiResponse<PageResponse<FavoriteMusic>>> {
    return this.http.get<ApiResponse<PageResponse<FavoriteMusic>>>(`${this.API_URL}/favorites`, { params: params as any });
  }

  private addToFavoritesAPI(musicId: number): Observable<ApiResponse<FavoriteMusic>> {
    return this.http.post<ApiResponse<FavoriteMusic>>(`${this.API_URL}/favorites`, { musicId });
  }

  private removeFromFavoritesAPI(musicId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/favorites/${musicId}`);
  }

  private getRecentlyPlayedFromAPI(params?: PaginationParams): Observable<ApiResponse<PageResponse<RecentlyPlayed>>> {
    return this.http.get<ApiResponse<PageResponse<RecentlyPlayed>>>(`${this.API_URL}/recently-played`, { params: params as any });
  }

  private addToRecentlyPlayedAPI(musicId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.API_URL}/recently-played`, { musicId });
  }

  // ===== FALLBACK METHODS FOR DEVELOPMENT =====
  private getFavoritesFromStorage_Fallback(): Observable<ApiResponse<PageResponse<FavoriteMusic>>> {
    return new Observable(observer => {
      const favorites = this.getFavoritesFromStorage();
      const mockResponse: ApiResponse<PageResponse<FavoriteMusic>> = {
        success: true,
        message: 'Favorites loaded from localStorage',
        timestamp: new Date().toISOString(),
        data: {
          content: favorites.map((musicId, index) => ({
            id: index + 1,
            music: this.getMockMusicById(musicId),
            addedAt: new Date(Date.now() - index * 60000).toISOString(),
            userId: 1
          })),
          totalElements: favorites.length,
          totalPages: 1,
          number: 0,
          size: 20,
          first: true,
          last: true,
          numberOfElements: favorites.length,
          empty: favorites.length === 0,
          pageable: {
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            pageSize: 20,
            pageNumber: 0,
            paged: true,
            unpaged: false
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }
  private addToFavoritesStorage_Fallback(musicId: number): Observable<ApiResponse<FavoriteMusic>> {
    return new Observable(observer => {
      // Add to localStorage
      const favorites = this.getFavoritesFromStorage();
      if (!favorites.includes(musicId)) {
        favorites.push(musicId);
        this.saveFavoritesToStorage(favorites);
        this.favoritesSubject.next(favorites);
        // Trigger refresh of favorites list
        this.favoritesRefreshSubject.next(true);
      }

      const mockResponse: ApiResponse<FavoriteMusic> = {
        success: true,
        message: 'Added to favorites (localStorage)',
        timestamp: new Date().toISOString(),
        data: {
          id: Date.now(),
          music: this.getMockMusicById(musicId),
          addedAt: new Date().toISOString(),
          userId: 1
        }
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }
  private removeFromFavoritesStorage_Fallback(musicId: number): Observable<ApiResponse<void>> {
    return new Observable(observer => {
      // Remove from localStorage
      const favorites = this.getFavoritesFromStorage();
      const index = favorites.indexOf(musicId);
      if (index > -1) {
        favorites.splice(index, 1);
        this.saveFavoritesToStorage(favorites);
        this.favoritesSubject.next(favorites);
        // Trigger refresh of favorites list
        this.favoritesRefreshSubject.next(true);
      }

      const mockResponse: ApiResponse<void> = {
        success: true,
        message: 'Removed from favorites (localStorage)',
        timestamp: new Date().toISOString()
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }
  private getRecentlyPlayedStorage_Fallback(): Observable<ApiResponse<PageResponse<RecentlyPlayed>>> {
    return new Observable(observer => {
      const recentlyPlayed = this.getRecentlyPlayedFromStorage();
      const mockResponse: ApiResponse<PageResponse<RecentlyPlayed>> = {
        success: true,
        message: 'Recently played loaded from localStorage',
        timestamp: new Date().toISOString(),
        data: {
          content: recentlyPlayed.map((music, index) => ({
            id: index + 1,
            music: music,
            playedAt: new Date(Date.now() - index * 60000).toISOString(),
            userId: 1
          })),
          totalElements: recentlyPlayed.length,
          totalPages: 1,
          number: 0,
          size: 20,
          first: true,
          last: true,
          numberOfElements: recentlyPlayed.length,
          empty: recentlyPlayed.length === 0,
          pageable: {
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            pageSize: 20,
            pageNumber: 0,
            paged: true,
            unpaged: false
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }

  // ===== FAVORITE PLAYLISTS FALLBACK METHODS =====
  private getFavoritePlaylistsFromStorage_Fallback(): Observable<ApiResponse<PageResponse<FavoritePlaylist>>> {
    return new Observable(observer => {
      const favoritePlaylistIds = this.getFavoritePlaylistsFromStorage();
      const mockResponse: ApiResponse<PageResponse<FavoritePlaylist>> = {
        success: true,
        message: 'Favorite playlists loaded from localStorage',
        timestamp: new Date().toISOString(),
        data: {
          content: favoritePlaylistIds.map((playlistId, index) => ({
            id: index + 1,
            playlist: this.getMockPlaylistById(playlistId),
            addedAt: new Date(Date.now() - index * 60000).toISOString(),
            userId: 1
          })),
          totalElements: favoritePlaylistIds.length,
          totalPages: 1,
          number: 0,
          size: 20,
          first: true,
          last: true,
          numberOfElements: favoritePlaylistIds.length,
          empty: favoritePlaylistIds.length === 0,
          pageable: {
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            pageSize: 20,
            pageNumber: 0,
            paged: true,
            unpaged: false
          },
          sort: { empty: true, sorted: false, unsorted: true }
        }
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }

  private addToFavoritePlaylistsStorage_Fallback(playlistId: number): Observable<ApiResponse<FavoritePlaylist>> {
    return new Observable(observer => {
      // Add to localStorage
      const favoritePlaylistIds = this.getFavoritePlaylistsFromStorage();
      if (!favoritePlaylistIds.includes(playlistId)) {
        favoritePlaylistIds.push(playlistId);
        this.saveFavoritePlaylistsToStorage(favoritePlaylistIds);
      }

      const mockResponse: ApiResponse<FavoritePlaylist> = {
        success: true,
        message: 'Added to favorite playlists (localStorage)',
        timestamp: new Date().toISOString(),
        data: {
          id: Date.now(),
          playlist: this.getMockPlaylistById(playlistId),
          addedAt: new Date().toISOString(),
          userId: 1
        }
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }

  private removeFromFavoritePlaylistsStorage_Fallback(playlistId: number): Observable<ApiResponse<void>> {
    return new Observable(observer => {
      // Remove from localStorage
      const favoritePlaylistIds = this.getFavoritePlaylistsFromStorage();
      const index = favoritePlaylistIds.indexOf(playlistId);
      if (index > -1) {
        favoritePlaylistIds.splice(index, 1);
        this.saveFavoritePlaylistsToStorage(favoritePlaylistIds);
      }

      const mockResponse: ApiResponse<void> = {
        success: true,
        message: 'Removed from favorite playlists (localStorage)',
        timestamp: new Date().toISOString()
      };
      observer.next(mockResponse);
      observer.complete();
    });
  }
  private getMockMusicById(musicId: number): Music {
    // Mock music object - in real app this would come from cache or another API call
    return {
      id: musicId,
      title: `Mock Song ${musicId}`,
      durationSeconds: 180,
      fileUrl: '',
      imageUrl: 'https://via.placeholder.com/300x300?text=Music',
      typeMusic: 'TRENDING' as any,
      playCount: 1000,
      likeCount: 50,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      artist: { id: 1, name: 'Mock Artist', isActive: true, createdAt: '', updatedAt: '' },
      category: { id: 1, name: 'Mock Category', isActive: true, createdAt: '', updatedAt: '' }
    };
  }

  private getMockPlaylistById(playlistId: number): Playlist {
    // Mock playlist object - in real app this would come from cache or another API call
    return {
      id: playlistId,
      name: `Mock Playlist ${playlistId}`,
      description: `Description for playlist ${playlistId}`,
      userId: 1,
      isPublic: true,
      imageUrl: 'https://via.placeholder.com/300x300?text=Playlist',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      songCount: 5,
      totalDurationSeconds: 900,
      createdBy: 'Mock User',
      isLiked: false
    };
  }
}
