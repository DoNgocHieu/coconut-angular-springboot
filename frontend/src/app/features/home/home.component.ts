import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicService } from '../../core/services/music.service';
import { MusicPlayerService } from '../../core/services/music-player.service';
import { UserMusicService } from '../../core/services/user-music.service';
import { AuthService } from '../../core/services/auth.service';
import { Music, MusicType } from '../../core/models/music.model';
import { Banner } from '../../core/models/playlist.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Welcome to Coconut Music</h1>
          <p>Discover, listen, and enjoy millions of songs from around the world</p>          <div class="hero-actions">
            <button class="btn btn-primary" (click)="startListening()">
              <i class="fas fa-play"></i>
              Start Listening
            </button>
            <a routerLink="/auth/register" class="btn btn-outline">
              <i class="fas fa-user-plus"></i>
              Join Now
            </a>
            <button class="btn btn-secondary" (click)="testLogin()">
              <i class="fas fa-user"></i>
              Test Login
            </button>
          </div>
        </div>        <div class="hero-animation">
          <div class="music-note"><i class="fas fa-music"></i></div>
          <div class="music-note"><i class="fas fa-musical-note"></i></div>
          <div class="music-note"><i class="fas fa-headphones"></i></div>
        </div>
      </section>

      <!-- Featured Music Sections -->
      <section class="featured-sections">
        <!-- Trending Music -->
        <div class="music-section">
          <div class="section-header">            <h2><i class="fas fa-fire"></i> Trending Now</h2>
            <a routerLink="/music" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
          </div>          <div class="music-grid">
            <div *ngFor="let music of trendingMusic" class="music-card hover-lift">
              <div class="music-image" (click)="playMusic(music)">
                <img [src]="music.imageUrl || '/assets/default-music.png'" [alt]="music.title">
                <div class="play-overlay">
                  <div class="play-button"><i class="fas fa-play"></i></div>
                </div>
              </div>
              <div class="music-info">
                <h4>{{ music.title }}</h4>
                <p>{{ music.artist?.name || 'Unknown Artist' }}</p>
                <div class="music-stats">
                  <span><i class="fas fa-headphones"></i> {{ formatPlayCount(music.playCount) }}</span>
                  <span><i class="fas fa-heart"></i> {{ music.likeCount }}</span>
                </div>
                <div class="music-actions">
                  <button (click)="$event.stopPropagation(); toggleFavorite(music)"
                          class="action-btn"
                          [class.favorite]="isFavorite(music.id)"
                          [title]="isFavorite(music.id) ? 'Remove from favorites' : 'Add to favorites'">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button (click)="$event.stopPropagation(); playMusic(music)"
                          class="action-btn play-btn"
                          title="Play now">
                    <i class="fas fa-play"></i>
                  </button>
                </div>
              </div>
            </div>          </div>
        </div>

        <!-- New Releases -->
        <div class="music-section">
          <div class="section-header">
            <h2><i class="fas fa-star"></i> New Releases</h2>
            <a routerLink="/music" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="music-grid">
            <div *ngFor="let music of newMusic" class="music-card hover-lift">
              <div class="music-image" (click)="playMusic(music)">
                <img [src]="music.imageUrl || '/assets/default-music.png'" [alt]="music.title">
                <div class="play-overlay">
                  <div class="play-button"><i class="fas fa-play"></i></div>
                </div>
              </div>
              <div class="music-info">
                <h4>{{ music.title }}</h4>
                <p>{{ music.artist?.name || 'Unknown Artist' }}</p>
                <div class="music-stats">
                  <span><i class="fas fa-headphones"></i> {{ formatPlayCount(music.playCount) }}</span>
                  <span><i class="fas fa-heart"></i> {{ music.likeCount }}</span>
                  <span><i class="fas fa-clock"></i> {{ getTimeAgo(music.createdAt) }}</span>
                </div>
                <div class="music-actions">
                  <button (click)="$event.stopPropagation(); toggleFavorite(music)"
                          class="action-btn"
                          [class.favorite]="isFavorite(music.id)"
                          [title]="isFavorite(music.id) ? 'Remove from favorites' : 'Add to favorites'">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button (click)="$event.stopPropagation(); playMusic(music)"
                          class="action-btn play-btn"
                          title="Play now">
                    <i class="fas fa-play"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Charts -->        <div class="music-section">
          <div class="section-header">
            <h2><i class="fas fa-chart-line"></i> Top Charts</h2>
            <a routerLink="/music" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="music-list">
            <div *ngFor="let music of topMusic; let i = index" class="music-item">
              <div class="rank">{{ i + 1 }}</div>
              <div class="music-image-small">
                <img [src]="music.imageUrl || '/assets/default-music.png'" [alt]="music.title">
              </div>
              <div class="music-details" (click)="playMusic(music)">
                <h4>{{ music.title }}</h4>
                <p>{{ music.artist?.name || 'Unknown Artist' }}</p>
              </div>
              <div class="music-actions">
                <span class="play-count"><i class="fas fa-headphones"></i> {{ formatPlayCount(music.playCount) }}</span>
                <button (click)="$event.stopPropagation(); toggleFavorite(music)"
                        class="action-btn-small"
                        [class.favorite]="isFavorite(music.id)"
                        [title]="isFavorite(music.id) ? 'Remove from favorites' : 'Add to favorites'">
                  <i class="fas fa-heart"></i>
                </button>
                <button (click)="$event.stopPropagation(); playMusic(music)"
                        class="action-btn-small play-btn-small"
                        title="Play now">
                  <i class="fas fa-play"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section">
        <div class="section-header">
          <h2><i class="fas fa-music"></i> Browse by Genre</h2>
          <a routerLink="/categories" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="categories-grid">
          <div *ngFor="let category of mockCategories" class="category-card hover-lift">
            <div class="category-icon"><i [class]="category.iconClass"></i></div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.count }} songs</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trendingMusic: Music[] = [];
  newMusic: Music[] = [];
  topMusic: Music[] = [];
  favoriteStates: { [key: number]: boolean } = {}; // Track favorite states

  mockCategories = [
    { name: 'Pop', iconClass: 'fas fa-microphone', count: 1250 },
    { name: 'Rock', iconClass: 'fas fa-guitar', count: 890 },
    { name: 'Jazz', iconClass: 'fas fa-drum', count: 450 },
    { name: 'Electronic', iconClass: 'fas fa-sliders-h', count: 720 },
    { name: 'Classical', iconClass: 'fas fa-music', count: 320 },
    { name: 'Hip Hop', iconClass: 'fas fa-microphone-alt', count: 650 }
  ];constructor(
    private musicService: MusicService,
    private musicPlayerService: MusicPlayerService,
    private userMusicService: UserMusicService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loadFeaturedMusic();
    this.loadFavoriteStates();
  }

  loadFavoriteStates() {
    // Load favorite states for all music
    const allMusic = [...this.trendingMusic, ...this.newMusic, ...this.topMusic];
    allMusic.forEach(music => {
      this.userMusicService.isFavorite(music.id).subscribe(isFav => {
        this.favoriteStates[music.id] = isFav;
      });
    });
  }
  loadFeaturedMusic() {
    console.log('Loading featured music...');

    // Load trending music
    this.musicService.getMusicByType(MusicType.TRENDING, { page: 0, size: 6 }).subscribe({
      next: (response) => {
        console.log('Trending music response:', response);
        if (response.success && response.data) {
          this.trendingMusic = response.data.content;
          console.log('Trending music loaded:', this.trendingMusic.length, 'songs');
        }
      },
      error: (error) => {
        console.error('Error loading trending music:', error);
        // Use mock data for development
        this.loadMockData();
      }
    });

    // Load new music
    this.musicService.getMusicByType(MusicType.NEW_MUSIC, { page: 0, size: 6 }).subscribe({
      next: (response) => {
        console.log('New music response:', response);
        if (response.success && response.data) {
          this.newMusic = response.data.content;
          console.log('New music loaded:', this.newMusic.length, 'songs');
        }
      },
      error: (error) => {
        console.error('Error loading new music:', error);
      }
    });

    // Load top charts
    this.musicService.getMusicByType(MusicType.TOP_VIEW, { page: 0, size: 10 }).subscribe({
      next: (response) => {
        console.log('Top music response:', response);
        if (response.success && response.data) {
          this.topMusic = response.data.content;
          console.log('Top music loaded:', this.topMusic.length, 'songs');
        }
      },
      error: (error) => {
        console.error('Error loading top music:', error);
      }
    });
  }

  loadMockData() {
    // Mock data for development
    const mockMusic: Music[] = [
      {
        id: 1,
        title: 'Sample Song 1',
        durationSeconds: 180,
        fileUrl: '',
        imageUrl: '',
        typeMusic: MusicType.TRENDING,
        playCount: 1250000,
        likeCount: 5400,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        artist: { id: 1, name: 'Sample Artist', isActive: true, createdAt: '', updatedAt: '' }
      }
    ];

    this.trendingMusic = mockMusic;
    this.newMusic = mockMusic;
    this.topMusic = mockMusic;
  }  playMusic(music: Music) {
    console.log('🎵 Playing music:', music.title);
    console.log('🎵 Music object:', music);
    // Create playlist from all loaded music
    const allMusic = [...this.trendingMusic, ...this.newMusic, ...this.topMusic];
    console.log('🎵 Calling musicPlayerService.playTrack...');
    this.musicPlayerService.playTrack(music, allMusic);
    console.log('🎵 playTrack called successfully');
  }

  startListening() {
    // Play first available song or redirect to music page
    if (this.trendingMusic.length > 0) {
      this.playMusic(this.trendingMusic[0]);
    }
  }

  formatPlayCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }
  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }
  // Test method for mock login
  testLogin() {
    this.authService.mockLogin();
    console.log('Mock login successful');
  }
  isFavorite(musicId: number): boolean {
    return this.favoriteStates[musicId] || false;
  }

  toggleFavorite(music: Music) {
    const currentState = this.favoriteStates[music.id] || false;

    if (currentState) {
      // Remove from favorites
      this.userMusicService.removeFromFavorites(music.id).subscribe({
        next: () => {
          this.favoriteStates[music.id] = false;
          console.log('Removed from favorites:', music.title);
        },
        error: (error) => {
          console.error('Error removing from favorites:', error);
        }
      });
    } else {
      // Add to favorites
      this.userMusicService.addToFavorites(music.id).subscribe({
        next: () => {
          this.favoriteStates[music.id] = true;
          console.log('Added to favorites:', music.title);
        },
        error: (error) => {
          console.error('Error adding to favorites:', error);
        }
      });
    }
  }
}
