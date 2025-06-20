import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Music } from '../models/music.model';
import { UserMusicService } from './user-music.service';

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

  constructor(private userMusicService: UserMusicService) {}
  playTrack(track: Music, playlist: Music[] = []) {
    this.currentTrackSubject.next(track);
    this.isPlayingSubject.next(true);

    // Add to recently played
    this.userMusicService.addToRecentlyPlayed(track);

    if (playlist.length > 0) {
      this.playlistSubject.next(playlist);
      const index = playlist.findIndex(t => t.id === track.id);
      this.currentIndexSubject.next(index);
    }
  }

  pauseTrack() {
    this.isPlayingSubject.next(false);
  }

  resumeTrack() {
    this.isPlayingSubject.next(true);
  }

  stopTrack() {
    this.currentTrackSubject.next(null);
    this.isPlayingSubject.next(false);
  }

  nextTrack() {
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
}
