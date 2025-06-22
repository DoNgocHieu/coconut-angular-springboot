import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Music, Category, Artist, MusicType } from '../models/music.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly API_URL = `${environment.apiUrl}/music`;
  // Current playing state
  private currentTrackSubject = new BehaviorSubject<Music | null>(null);
  private playlistSubject = new BehaviorSubject<Music[]>([]);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(1);
  private shuffleSubject = new BehaviorSubject<boolean>(false);
  private repeatSubject = new BehaviorSubject<'off' | 'one' | 'all'>('off');

  // Event emitter for when music starts playing (for recently played tracking)
  private musicPlayedSubject = new Subject<Music>();

  // Public observables
  public currentTrack$ = this.currentTrackSubject.asObservable();
  public playlist$ = this.playlistSubject.asObservable();
  public isPlaying$ = this.isPlayingSubject.asObservable();
  public currentTime$ = this.currentTimeSubject.asObservable();
  public volume$ = this.volumeSubject.asObservable();
  public shuffle$ = this.shuffleSubject.asObservable();
  public repeat$ = this.repeatSubject.asObservable();
  public musicPlayed$ = this.musicPlayedSubject.asObservable();
  constructor(private http: HttpClient) { }

  // API Methods
  getAllMusic(params?: PaginationParams): Observable<ApiResponse<PageResponse<Music>>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
      if (params.sort) httpParams = httpParams.set('sort', params.sort);
      if (params.direction) httpParams = httpParams.set('direction', params.direction);
    }
    return this.http.get<ApiResponse<PageResponse<Music>>>(this.API_URL, { params: httpParams });
  }

  getMusicById(id: number): Observable<ApiResponse<Music>> {
    return this.http.get<ApiResponse<Music>>(`${this.API_URL}/${id}`);
  }

  searchMusic(keyword: string, params?: PaginationParams): Observable<ApiResponse<PageResponse<Music>>> {
    let httpParams = new HttpParams().set('keyword', keyword);
    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    }
    return this.http.get<ApiResponse<PageResponse<Music>>>(`${this.API_URL}/search`, { params: httpParams });
  }

  getMusicByType(type: MusicType, params?: PaginationParams): Observable<ApiResponse<PageResponse<Music>>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    }
    return this.http.get<ApiResponse<PageResponse<Music>>>(`${this.API_URL}/type/${type}`, { params: httpParams });
  }

  getMusicByCategory(categoryId: number, params?: PaginationParams): Observable<ApiResponse<PageResponse<Music>>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
      if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    }
    return this.http.get<ApiResponse<PageResponse<Music>>>(`${this.API_URL}/category/${categoryId}`, { params: httpParams });
  }
  incrementPlayCount(musicId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/${musicId}/play`, {});
  }
  // Player Control Methods
  playMusic(music: Music, playlist?: Music[]): void {
    this.currentTrackSubject.next(music);
    this.isPlayingSubject.next(true);

    if (playlist) {
      this.playlistSubject.next(playlist);
    }

    // Increment play count
    this.incrementPlayCount(music.id).subscribe({
      next: () => {
        console.log('✅ Play count incremented for:', music.title);
      },
      error: (error) => {
        console.warn('⚠️  Failed to increment play count:', error);
      }
    });

    // Emit event that music is being played (for recently played tracking)
    this.musicPlayedSubject.next(music);
  }

  pauseMusic(): void {
    this.isPlayingSubject.next(false);
  }

  resumeMusic(): void {
    this.isPlayingSubject.next(true);
  }

  stopMusic(): void {
    this.isPlayingSubject.next(false);
    this.currentTimeSubject.next(0);
  }

  nextTrack(): void {
    const currentTrack = this.currentTrackSubject.value;
    const playlist = this.playlistSubject.value;

    if (!currentTrack || !playlist.length) return;

    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    if (currentIndex < playlist.length - 1) {
      this.playMusic(playlist[currentIndex + 1], playlist);
    } else if (this.repeatSubject.value === 'all') {
      this.playMusic(playlist[0], playlist);
    }
  }

  previousTrack(): void {
    const currentTrack = this.currentTrackSubject.value;
    const playlist = this.playlistSubject.value;

    if (!currentTrack || !playlist.length) return;

    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    if (currentIndex > 0) {
      this.playMusic(playlist[currentIndex - 1], playlist);
    } else if (this.repeatSubject.value === 'all') {
      this.playMusic(playlist[playlist.length - 1], playlist);
    }
  }

  setCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
  }

  setVolume(volume: number): void {
    this.volumeSubject.next(volume);
  }

  toggleShuffle(): void {
    this.shuffleSubject.next(!this.shuffleSubject.value);
  }

  setRepeatMode(mode: 'off' | 'one' | 'all'): void {
    this.repeatSubject.next(mode);
  }

  // Auto-play when track ends
  onTrackEnded(): void {
    const repeatMode = this.repeatSubject.value;

    if (repeatMode === 'one') {
      // Repeat current track
      const currentTrack = this.currentTrackSubject.value;
      if (currentTrack) {
        this.playMusic(currentTrack);
      }
    } else {
      // Move to next track
      this.nextTrack();
    }
  }

  // Method to be called when user manually seeks to end or track duration is reached
  completeCurrentTrack(): void {
    this.onTrackEnded();
  }

  // Utility Methods
  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getCurrentTrack(): Music | null {
    return this.currentTrackSubject.value;
  }

  isCurrentTrack(music: Music): boolean {
    const current = this.currentTrackSubject.value;
    return current ? current.id === music.id : false;
  }
}
