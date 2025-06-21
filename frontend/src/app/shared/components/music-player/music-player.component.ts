import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Music } from '../../../core/models/music.model';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `    <div class="music-player" [class.hidden]="!currentTrack">
      <div class="player-content">
        <!-- Track Info -->
        <div class="track-info">
          <div class="track-image">
            <img [src]="currentTrack?.imageUrl || '/assets/default-music.png'" [alt]="currentTrack?.title">
          </div>
          <div class="track-details">
            <h4>{{ currentTrack?.title || 'No track selected' }}</h4>
            <p>{{ currentTrack?.artist?.name || 'Unknown Artist' }}</p>
          </div>
          <button class="favorite-btn" (click)="toggleFavorite()" [class.active]="isFavorite">
            <i class="fas fa-heart"></i>
          </button>
        </div>

        <!-- Player Controls -->
        <div class="player-controls">
          <div class="control-buttons">
            <button class="control-btn shuffle" (click)="toggleShuffle()" [class.active]="isShuffled">
              <i class="fas fa-random"></i>
            </button>
            <button class="control-btn" (click)="previousTrack()">
              <i class="fas fa-step-backward"></i>
            </button>
            <button class="control-btn play-pause" (click)="togglePlayPause()">
              <i class="fas" [class.fa-play]="!isPlaying" [class.fa-pause]="isPlaying"></i>
            </button>
            <button class="control-btn" (click)="nextTrack()">
              <i class="fas fa-step-forward"></i>
            </button>
            <button class="control-btn repeat" (click)="toggleRepeat()" [class.active]="isRepeated">
              <i class="fas fa-redo"></i>
            </button>
          </div>

          <div class="progress-bar">
            <span class="time current">{{ formatTime(currentTime) }}</span>
            <div class="progress-container">
              <input
                type="range"
                min="0"
                [max]="duration"
                [value]="currentTime"
                (input)="seek($event)"
                class="progress-range"
              >
            </div>
            <span class="time total">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Additional Controls -->
        <div class="additional-controls">
          <button
  class="option-btn"
  [class.queue-active]="sidebarOpen"
  (click)="showQueue()"
>
  <i class="fas fa-list"></i>
</button>
          <div class="volume-control">
            <button class="option-btn" (click)="toggleMute()">
              <i class="fas" [class.fa-volume-up]="!isMuted && volume > 50"
                            [class.fa-volume-down]="!isMuted && volume <= 50 && volume > 0"
                            [class.fa-volume-mute]="isMuted || volume === 0"></i>
            </button>
            <div class="volume-slider">
              <input
                type="range"
                min="0"
                max="100"
                [value]="volume"
                (input)="setVolume($event)"
                class="volume-range"
              >
            </div>
          </div>          <button class="option-btn" (click)="toggleFullscreen()">
            <i class="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Input() currentTrack: Music | null = null;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 80;
  isMuted = false;
  isFavorite = false;
  isShuffled = false;
  isRepeated = false;
  private audio: HTMLAudioElement | null = null;
  private progressInterval: any;
  private subscriptions: Subscription[] = [];
  private playPromise: Promise<void> | null = null;
  sidebarOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private musicPlayerService: MusicPlayerService,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.open$.subscribe(open => {
      this.sidebarOpen = open;
    });
  }  ngOnInit() {
    console.log('🎵 MusicPlayerComponent ngOnInit, platform browser:', isPlatformBrowser(this.platformId));
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      console.log('🎵 Audio element created:', this.audio);
      this.setupAudioListeners();

      // Test audio element
      console.log('🎵 Audio element properties:', {
        volume: this.audio.volume,
        muted: this.audio.muted,
        paused: this.audio.paused,
        src: this.audio.src
      });

      // Subscribe to music player service
      this.subscriptions.push(
        this.musicPlayerService.currentTrack$.subscribe(track => {
          console.log('🎵 MusicPlayerComponent received track:', track);
          if (track && track !== this.currentTrack) {
            this.loadTrack(track);
          }
        }),        this.musicPlayerService.isPlaying$.subscribe(playing => {
          console.log('🎵 MusicPlayerComponent received playing state:', playing);
          this.isPlaying = playing;
          if (this.audio && this.currentTrack) {
            if (playing && this.audio.paused) {
              console.log('🎵 Starting playback...');
              this.safePlay();
            } else if (!playing && !this.audio.paused) {
              console.log('🎵 Pausing playback...');
              this.safePause();
            }
          }
        })
      );
    }
  }  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.playPromise = null;
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
  private setupAudioListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio!.duration;
      console.log('🎵 Audio metadata loaded, duration:', this.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio!.currentTime;
    });

    this.audio.addEventListener('ended', () => {
      console.log('🎵 Track ended, moving to next');
      this.isPlaying = false;
      this.musicPlayerService.pauseTrack();
      this.nextTrack();
    });

    this.audio.addEventListener('play', () => {
      console.log('🎵 Audio element started playing');
      this.isPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      console.log('🎵 Audio element paused');
      this.isPlaying = false;
    });

    this.audio.addEventListener('error', (e) => {
      console.error('🎵 Audio error:', e);
    });
  }  loadTrack(track: Music) {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    console.log('🎵 Loading track in player:', track.title, track.fileUrl);
    console.log('🎵 Audio element before load:', this.audio);

    this.currentTrack = track;
    this.audio.src = track.fileUrl;

    console.log('🎵 Audio src set to:', this.audio.src);
    console.log('🎵 Calling audio.load()...');

    this.audio.load();
    this.currentTime = 0;
    this.isFavorite = track.isFavorite || false;

    console.log('🎵 Audio element after load:', {
      src: this.audio.src,
      readyState: this.audio.readyState,
      paused: this.audio.paused,
      volume: this.audio.volume
    });// Auto play when track is loaded
    this.audio.addEventListener('canplay', () => {
      console.log('🎵 Track can play, starting playback...');
      if (this.isPlaying) {
        this.safePlay();
      }
    }, { once: true });
  }

  private async safePlay() {
    if (!this.audio) return;

    try {
      // Wait for any previous play promise to resolve
      if (this.playPromise) {
        await this.playPromise;
      }

      // Start new play operation
      this.playPromise = this.audio.play();
      await this.playPromise;
      this.playPromise = null;
      console.log('🎵 Audio started playing successfully');
    } catch (error) {
      this.playPromise = null;
      console.error('🎵 Error playing audio:', error);
    }
  }

  private async safePause() {
    if (!this.audio) return;

    try {
      // Wait for any play promise to resolve first
      if (this.playPromise) {
        await this.playPromise;
        this.playPromise = null;
      }

      // Now safe to pause
      this.audio.pause();
      console.log('🎵 Audio paused successfully');
    } catch (error) {
      console.error('🎵 Error pausing audio:', error);
    }
  }
  togglePlayPause() {
    console.log('🎵 Toggle play/pause, current state:', this.isPlaying);
    if (this.isPlaying) {
      this.musicPlayerService.pauseTrack();
    } else {
      this.musicPlayerService.resumeTrack();
    }
  }

  seek(event: any) {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    const seekTime = parseFloat(event.target.value);
    this.audio.currentTime = seekTime;
    this.currentTime = seekTime;
  }

  setVolume(event: any) {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    const volume = parseInt(event.target.value);
    this.volume = volume;
    this.audio.volume = volume / 100;
    this.isMuted = volume === 0;
  }

  toggleMute() {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.currentTrack) {
      this.currentTrack.isFavorite = this.isFavorite;
    }
    // TODO: Update favorite status via API
    console.log('Toggle favorite:', this.currentTrack?.title, this.isFavorite);
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    console.log('Shuffle:', this.isShuffled);
  }

  toggleRepeat() {
    this.isRepeated = !this.isRepeated;
    console.log('Repeat:', this.isRepeated);
  }
  previousTrack() {
    console.log('Previous track');
    this.musicPlayerService.previousTrack();
  }

  nextTrack() {
    console.log('Next track');
    this.musicPlayerService.nextTrack();
  }

  showQueue() {
    this.sidebarService.toggle();
  }

  toggleFullscreen() {
    console.log('Toggle fullscreen');
    // TODO: Implement fullscreen mode
  }  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
