import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Music } from '../models/music.model';
import { UserMusicService } from './user-music.service';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private currentTrackSubject = new BehaviorSubject<Music | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private playlistSubject = new BehaviorSubject<Music[]>([]);
  private currentIndexSubject = new BehaviorSubject<number>(-1);

  public currentTrack$ = this.currentTrackSubject.asObservable();
  public isPlaying$ = this.isPlayingSubject.asObservable();
  public playlist$ = this.playlistSubject.asObservable();
  public currentIndex$ = this.currentIndexSubject.asObservable();

  constructor(
    private userMusicService: UserMusicService,
    private musicService: MusicService
  ) {
    // Listen for music play events from MusicService and update recently played
    this.musicService.musicPlayed$.subscribe(music => {
      const currentUserStr = localStorage.getItem('currentUser');
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          this.userMusicService.addToRecentlyPlayed(music, currentUser.id);
        } catch {}
      }
    }
  );
  }  playTrack(track: Music, playlist: Music[] = []) {
    // Use MusicService to play track (which will handle play count increment)
    this.musicService.playMusic(track, playlist);

    // Update local state for compatibility
    this.currentTrackSubject.next(track);
    this.isPlayingSubject.next(true);

    if (playlist.length > 0) {
      this.playlistSubject.next(playlist);
      const index = playlist.findIndex(t => t.id === track.id);
      this.currentIndexSubject.next(index);
    }

    // Thêm vào history mỗi khi phát nhạc
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        this.userMusicService.addToRecentlyPlayed(track, currentUser.id);
      } catch {}
    }
  }
  pauseTrack() {
    this.musicService.pauseMusic();
    this.isPlayingSubject.next(false);
  }

  resumeTrack() {
    this.musicService.resumeMusic();
    this.isPlayingSubject.next(true);
  }
  stopTrack() {
    this.musicService.stopMusic();
    this.currentTrackSubject.next(null);
    this.isPlayingSubject.next(false);
  }

  nextTrack() {
    // Use MusicService to handle next track (includes play count increment)
    this.musicService.nextTrack();

    // Update local state for compatibility
    const playlist = this.playlistSubject.value;
    const currentIndex = this.currentIndexSubject.value;

    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextTrack = playlist[nextIndex];
      this.currentTrackSubject.next(nextTrack);
      this.currentIndexSubject.next(nextIndex);
      this.isPlayingSubject.next(true);
    }
  }

  previousTrack() {
    // Use MusicService to handle previous track (includes play count increment)
    this.musicService.previousTrack();

    // Update local state for compatibility
    const playlist = this.playlistSubject.value;
    const currentIndex = this.currentIndexSubject.value;

    if (playlist.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevTrack = playlist[prevIndex];
      this.currentTrackSubject.next(prevTrack);
      this.currentIndexSubject.next(prevIndex);
      this.isPlayingSubject.next(true);
    }
  }

  setPlaylist(playlist: Music[]) {
    this.playlistSubject.next(playlist);
  }

  getCurrentTrack(): Music | null {
    return this.currentTrackSubject.value;
  }

  getIsPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  // Method to call when a track ends (for auto-play next)
  onTrackEnded() {
    this.musicService.onTrackEnded();

    // Update local state
    const currentTrack = this.musicService.getCurrentTrack();
    if (currentTrack) {
      this.currentTrackSubject.next(currentTrack);
      this.isPlayingSubject.next(true);

      // Update current index if needed
      const playlist = this.playlistSubject.value;
      const index = playlist.findIndex(track => track.id === currentTrack.id);
      if (index !== -1) {
        this.currentIndexSubject.next(index);
      }
    }
  }

  // Delegate to MusicService for other controls
  setVolume(volume: number) {
    this.musicService.setVolume(volume);
  }

  setCurrentTime(time: number) {
    this.musicService.setCurrentTime(time);
  }

  toggleShuffle() {
    this.musicService.toggleShuffle();
  }

  setRepeatMode(mode: 'off' | 'one' | 'all') {
    this.musicService.setRepeatMode(mode);
  }

  // Pass through utility methods
  formatDuration(seconds: number): string {
    return this.musicService.formatDuration(seconds);
  }
}
