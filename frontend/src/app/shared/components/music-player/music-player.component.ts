import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Music } from '../../../core/models/music.model';
import { MusicPlayerService } from '../../../core/services/music-player.service';

import { UserMusicService } from '../../../core/services/user-music.service';
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
        <div class="additional-controls">          <button class="option-btn" (click)="showQueue()" >
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

    <!-- Toast Message -->
    <div *ngIf="message" class="toast" [class.success]="message.type === 'success'" [class.error]="message.type === 'error'">
      <i class="fas" [class.fa-check-circle]="message.type === 'success'" [class.fa-exclamation-circle]="message.type === 'error'"></i>
      {{ message.text }}
    </div>
  `,
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Input() currentTrack: Music | null = null;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 80;  isMuted = false;
  isFavorite = false;
  isShuffled = false;
  isRepeated = false;
  message: { type: 'success' | 'error', text: string } | null = null;
  private audio: HTMLAudioElement | null = null;
  private progressInterval: any;
  private subscriptions: Subscription[] = [];
  private playPromise: Promise<void> | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private musicPlayerService: MusicPlayerService,
    private userMusicService: UserMusicService,
    private sidebarService: SidebarService // Thêm dòng này
  ) {}
  ngOnInit() {
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
      });      // Subscribe to music player service
      this.subscriptions.push(
        this.musicPlayerService.currentTrack$.subscribe(track => {
          console.log('🎵 MusicPlayerComponent received track:', track);
          if (track && track !== this.currentTrack) {
            this.loadTrack(track);
          }
        }),

        this.musicPlayerService.isPlaying$.subscribe(playing => {
          console.log('🎵 MusicPlayerComponent received playing state:', playing);
          const wasPlaying = this.isPlaying;
          this.isPlaying = playing;
            if (this.audio && this.currentTrack) {
            if (playing && this.audio.paused) {
              console.log('🎵 Starting playback from state change...');
              // Add a small delay to ensure audio is ready
              setTimeout(() => {
                if (this.audio && this.audio.readyState >= 3) {
                  this.safePlay();
                } else {
                  console.log('🎵 Audio not ready yet, waiting for canplay...');
                }
              }, 50);
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
  }  private setupAudioListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio!.duration;
      console.log('🎵 Audio metadata loaded, duration:', this.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio!.currentTime;
    });

    this.audio.addEventListener('ended', () => {
      console.log('🎵 Track ended, auto-playing next track');
      this.isPlaying = false;
      // Use onTrackEnded to handle auto-play with proper play count increment
      this.musicPlayerService.onTrackEnded();
    });

    this.audio.addEventListener('play', () => {
      console.log('🎵 Audio element started playing');
      this.isPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      console.log('🎵 Audio element paused');
      this.isPlaying = false;
    });

    // Add better error handling
    this.audio.addEventListener('error', (e) => {
      console.error('🎵 Audio error:', e);
      const error = this.audio!.error;
      if (error) {
        console.error('🎵 Audio error details:', {
          code: error.code,
          message: error.message
        });
        this.showMessage('error', 'Audio playback error. Please try again.');
      }
    });

    // Add stalled/waiting event handlers
    this.audio.addEventListener('waiting', () => {
      console.log('🎵 Audio is waiting for data...');
    });

    this.audio.addEventListener('canplaythrough', () => {
      console.log('🎵 Audio can play through without interruption');
    });
  }loadTrack(track: Music) {
    if (!this.audio || !isPlatformBrowser(this.platformId)) return;

    console.log('🎵 Loading track in player:', track.title, track.fileUrl);
    console.log('🎵 Audio element before load:', this.audio);

    this.currentTrack = track;

    // Reset audio state first
    this.audio.pause();
    this.audio.currentTime = 0;
    this.currentTime = 0;

    // Set new source
    this.audio.src = track.fileUrl;

    console.log('🎵 Audio src set to:', this.audio.src);
    console.log('🎵 Calling audio.load()...');

    this.audio.load();

    // Check if track is favorited
    this.checkFavoriteStatus(track.id);

    console.log('🎵 Audio element after load:', {
      src: this.audio.src,
      readyState: this.audio.readyState,
      paused: this.audio.paused,
      volume: this.audio.volume
    });

    // Improved auto-play handling with better timing
    const handleCanPlay = () => {
      console.log('🎵 Track can play, checking if should start playback...');
      console.log('🎵 Current isPlaying state:', this.isPlaying);

      if (this.isPlaying) {
        console.log('🎵 Starting immediate playback...');
        this.safePlay();
      }
    };

    // Remove any existing canplay listeners to avoid conflicts
    this.audio.removeEventListener('canplay', handleCanPlay);

    // Add the listener
    this.audio.addEventListener('canplay', handleCanPlay, { once: true });

    // Fallback: If audio is already ready, trigger play immediately
    if (this.audio.readyState >= 3) { // HAVE_FUTURE_DATA or higher
      console.log('🎵 Audio already ready, triggering canplay manually');
      setTimeout(() => handleCanPlay(), 100);
    }
  }
  private async safePlay() {
    if (!this.audio) return;

    try {
      // Wait for any previous play promise to resolve
      if (this.playPromise) {
        await this.playPromise;
      }

      // Ensure audio is ready before playing
      if (this.audio.readyState < 3) {
        console.log('🎵 Audio not ready yet, waiting...');
        await new Promise((resolve) => {
          const onCanPlay = () => {
            this.audio!.removeEventListener('canplay', onCanPlay);
            resolve(void 0);
          };
          this.audio!.addEventListener('canplay', onCanPlay, { once: true });
        });
      }

      // Start new play operation
      this.playPromise = this.audio.play();
      await this.playPromise;
      this.playPromise = null;
      console.log('🎵 Audio started playing successfully');
    } catch (error: any) {
      this.playPromise = null;
      console.error('🎵 Error playing audio:', error);

      // Handle common browser audio policy errors
      if (error.name === 'NotAllowedError' || error.message.includes('user interaction')) {
        console.log('🎵 Browser requires user interaction, will play on next user action');
        this.showMessage('error', 'Click play button to start music');
      }
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
  }  togglePlayPause() {
    console.log('🎵 Toggle play/pause, current state:', this.isPlaying);
    console.log('🎵 Current track:', this.currentTrack?.title);
    console.log('🎵 Audio element state:', this.audio ? {
      paused: this.audio.paused,
      readyState: this.audio.readyState,
      src: this.audio.src
    } : 'null');

    if (!this.currentTrack) {
      console.log('🎵 No current track, cannot toggle playback');
      return;
    }

    if (this.isPlaying) {
      this.musicPlayerService.pauseTrack();
    } else {
      // Force immediate playback on user interaction
      this.musicPlayerService.resumeTrack();

      // If audio isn't playing yet, force it
      if (this.audio && this.audio.paused) {
        console.log('🎵 Forcing immediate playback on user click');
        setTimeout(() => this.safePlay(), 100);
      }
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
    if (!this.currentTrack) return;

    if (this.isFavorite) {
      // Remove from favorites
      this.userMusicService.removeFromFavorites(this.currentTrack.id).subscribe({        next: (response) => {
          if (response.success) {
            this.isFavorite = false;
            this.showMessage('success', `Removed "${this.currentTrack?.title}" from favorites!`);
            console.log('✅ Removed from favorites:', this.currentTrack?.title);
          }
        },        error: (error) => {
          console.error('❌ Error removing from favorites:', error);
          this.showMessage('error', 'Failed to remove from favorites. Please try again.');
        }
      });
    } else {
      // Add to favorites
      this.userMusicService.addToFavorites(this.currentTrack.id).subscribe({        next: (response) => {
          if (response.success) {
            this.isFavorite = true;
            this.showMessage('success', `Added "${this.currentTrack?.title}" to favorites!`);
            console.log('✅ Added to favorites:', this.currentTrack?.title);
          }
        },        error: (error) => {
          console.error('❌ Error adding to favorites:', error);
          this.showMessage('error', 'Failed to add to favorites. Please try again.');
        }
      });
    }
  }

  private checkFavoriteStatus(musicId: number) {
    this.userMusicService.isFavorite(musicId).subscribe({
      next: (isFavorite) => {
        this.isFavorite = isFavorite;
        console.log('🎵 Favorite status for track:', musicId, isFavorite);
      },
      error: (error) => {
        console.error('❌ Error checking favorite status:', error);
        this.isFavorite = false;
      }
    });
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
    this.sidebarService.open(); // Mở sidebar (nav bar)
  }
  toggleFullscreen() {
    console.log('Toggle fullscreen');
    // TODO: Implement fullscreen mode
  }

  showMessage(type: 'success' | 'error', text: string) {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
