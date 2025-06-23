import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaylistService } from '../../../core/services/playlist.service';
import { MusicService } from '../../../core/services/music.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { Playlist } from '../../../core/models/playlist.model';
import { Music, MusicType } from '../../../core/models/music.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="playlist-detail-container">
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <div class="loading-spinner">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <p>Loading playlist...</p>
      </div>

      <!-- Playlist Header -->
      <div *ngIf="!isLoading && playlist" class="playlist-header">
        <div class="back-button">
          <button (click)="goBack()" class="btn btn-ghost">
            <i class="fas fa-arrow-left"></i>
            Back to Playlists
          </button>
        </div>

        <div class="playlist-hero">
          <div class="playlist-cover">
            <img [src]="getPlaylistImageUrl()" [alt]="playlist.name" />
            <div
              class="playlist-type-badge"
              [class.public]="playlist.isPublic"
              [class.private]="!playlist.isPublic"
            >
              <i
                class="fas"
                [class.fa-globe]="playlist.isPublic"
                [class.fa-lock]="!playlist.isPublic"
              ></i>
              {{ playlist.isPublic ? 'Public' : 'Private' }}
            </div>
          </div>

          <div class="playlist-info">
            <div class="playlist-meta">
              <span class="playlist-label">Playlist</span>
              <span class="creator">By {{ playlist.createdBy }}</span>
            </div>

            <h1 class="playlist-title">{{ playlist.name }}</h1>

            <p *ngIf="playlist.description" class="playlist-description">
              {{ playlist.description }}
            </p>

            <div class="playlist-stats">
              <span class="song-count">
                <i class="fas fa-music"></i>
                {{ playlist.songCount }}
                {{ playlist.songCount === 1 ? 'song' : 'songs' }}
              </span>
              <span class="duration">
                <i class="fas fa-clock"></i>
                {{ formatDuration(playlist.totalDurationSeconds || 0) }}
              </span>
              <span class="created-date">
                <i class="fas fa-calendar"></i>
                Created {{ getTimeAgo(playlist.createdAt) }}
              </span>
            </div>

            <div class="playlist-actions">
              <button
                (click)="playPlaylist()"
                class="btn btn-primary btn-large"
              >
                <i class="fas fa-play"></i>
                Play All
              </button>
              <button (click)="shufflePlaylist()" class="btn btn-secondary">
                <i class="fas fa-random"></i>
                Shuffle
              </button>
              <button
                (click)="toggleLike()"
                class="btn btn-ghost"
                [class.liked]="playlist.isLiked"
              >
                <i
                  class="fas"
                  [class.fa-heart]="playlist.isLiked"
                  [class.fa-heart-o]="!playlist.isLiked"
                ></i>
              </button>
              <button
                (click)="addMusic()"
                class="btn btn-primary"
                title="Add Songs"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Music List -->
      <div *ngIf="!isLoading && playlist" class="music-list-section">
        <div class="section-header">
          <h2>Songs</h2>
          <div class="list-controls">
            <button (click)="toggleSortOrder()" class="sort-btn">
              <i class="fas fa-sort"></i>
              {{ sortBy === 'position' ? 'Position' : 'Title' }}
            </button>
          </div>
        </div>

        <!-- Music List Header -->
        <div class="music-list-header">
          <div class="track-number">#</div>
          <div class="track-info">Title</div>
          <div class="track-artist">Artist</div>
          <div class="track-duration">
            <i class="fas fa-clock"></i>
          </div>
          <div class="track-actions"></div>
        </div>

        <!-- Loading Music -->
        <div *ngIf="isLoadingMusic" class="loading-music">
          <div class="loading-spinner">
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <p>Loading songs...</p>
        </div>

        <!-- Music Items -->
        <div *ngIf="!isLoadingMusic" class="music-list">
          <div
            *ngFor="let music of musicList; let i = index"
            class="music-item"
            [class.playing]="currentPlayingId === music.id"
            (click)="playMusic(music, i)"
            (dblclick)="playMusic(music, i)"
          >
            <div class="track-number">
              <span *ngIf="currentPlayingId !== music.id">{{ i + 1 }}</span>
              <i
                *ngIf="currentPlayingId === music.id"
                class="fas fa-volume-up playing-icon"
              ></i>
            </div>

            <div class="track-info">
              <div class="track-image">
                <img
                  [src]="music.imageUrl || '/assets/default-music.png'"
                  [alt]="music.title"
                />
                <div class="play-overlay">
                  <i class="fas fa-play"></i>
                </div>
              </div>
              <div class="track-details">
                <h3 class="track-title">{{ music.title }}</h3>
                <p class="track-meta">{{ music.artist?.name }}</p>
              </div>
            </div>

            <div class="track-artist">
              {{ music.artist?.name }}
            </div>

            <div class="track-duration">
              {{ formatDuration(music.durationSeconds || 0) }}
            </div>
            <div class="track-actions" (click)="$event.stopPropagation()">
              <button
                (click)="toggleMusicLike(music)"
                class="action-btn like-btn"
              >
                <i class="fas fa-heart-o"></i>
              </button>
              <button
                (click)="removeMusicFromPlaylist(music)"
                class="action-btn remove-btn"
              >
                <i class="fas fa-minus"></i>
              </button>

            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="musicList.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-music"></i>
            </div>
            <h3>No songs in this playlist</h3>
            <p>Start adding songs to build your perfect playlist</p>
            <button (click)="addMusic()" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Add Songs
            </button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="!isLoading && !playlist" class="error-state">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h2>Playlist not found</h2>
        <p>
          The playlist you're looking for doesn't exist or has been removed.
        </p>
        <button (click)="goBack()" class="btn btn-primary">
          <i class="fas fa-arrow-left"></i>
          Back to Playlists
        </button>
      </div>

      <!-- Toast Message -->
      <div *ngIf="toastMessage" class="toast-message">
        {{ toastMessage }}
      </div>

      <!-- Add Music Modal -->
      <div
        *ngIf="showAddMusicModal"
        class="add-music-modal"
        (click)="showAddMusicModal = false"
      >
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Add Songs to Playlist</h3>
            <button class="close-btn" (click)="showAddMusicModal = false">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body">
            <!-- Search and Filter -->
            <div class="search-filter">
              <select [(ngModel)]="searchType" class="search-type-select">
                <option value="title">Tên bài hát</option>
                <option value="artist">Ca sĩ</option>
              </select>
              <input
                type="text"
                placeholder="Search for songs..."
                [(ngModel)]="searchQuery"
                (input)="filterMusicList()"
                class="search-input"
              />
            </div>

            <!-- Music List -->
            <div class="available-music-list">
              <div
                *ngFor="let music of allMusicList; let i = index"
                class="music-item"
                [class.selected]="selectedMusicIds.includes(music.id)"
                (click)="toggleMusicSelection(music)"
              >
                <div class="track-info">
                  <div class="track-image">
                    <img
                      [src]="music.imageUrl || '/assets/default-music.png'"
                      [alt]="music.title"
                    />
                  </div>
                  <div class="track-details">
                    <h3 class="track-title">{{ music.title }}</h3>
                    <p class="track-meta">{{ music.artist?.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              (click)="addSelectedMusic()"
              class="btn btn-primary"
              [disabled]="selectedMusicIds.length === 0"
            >
              <i class="fas fa-plus"></i>
              Add Selected Songs
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .playlist-detail-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
        min-height: 100vh;
      }

      .loading-container,
      .loading-music {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: white;
      }

      .loading-spinner {
        font-size: 2rem;
        margin-bottom: 16px;
        color: #ffd700;
      }

      .back-button {
        margin-bottom: 20px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: 14px;
      }

      .btn-ghost {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        backdrop-filter: blur(10px);
      }

      .btn-ghost:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }

      .btn-primary {
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        color: #333;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
      }

      .btn-secondary {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        backdrop-filter: blur(10px);
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.25);
      }

      .btn-large {
        padding: 16px 32px;
        font-size: 16px;
      }

      .playlist-hero {
        display: flex;
        gap: 30px;
        margin-bottom: 40px;
        align-items: flex-end;
      }

      .playlist-cover {
        position: relative;
        width: 250px;
        height: 250px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }

      .playlist-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .playlist-type-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        backdrop-filter: blur(10px);
      }

      .playlist-type-badge.public {
        background: rgba(76, 175, 80, 0.9);
        color: white;
      }

      .playlist-type-badge.private {
        background: rgba(158, 158, 158, 0.9);
        color: white;
      }

      .playlist-info {
        flex: 1;
        color: white;
      }

      .playlist-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;
        font-size: 14px;
        opacity: 0.9;
      }

      .playlist-label {
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .playlist-title {
        font-size: 3rem;
        font-weight: 800;
        margin: 0 0 16px 0;
        line-height: 1.1;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .playlist-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
        opacity: 0.9;
      }

      .playlist-stats {
        display: flex;
        gap: 24px;
        margin-bottom: 24px;
        font-size: 14px;
      }

      .playlist-stats span {
        display: flex;
        align-items: center;
        gap: 6px;
        opacity: 0.9;
      }

      .playlist-actions {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .btn.liked {
        color: #ff6b6b;
      }

      .music-list-section {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        padding: 24px;
        margin-top: 30px;
        backdrop-filter: blur(10px);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .section-header h2 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
      }

      .sort-btn {
        background: none;
        border: 1px solid #ddd;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #666;
      }

      .sort-btn:hover {
        background: #f5f5f5;
      }

      .music-list-header {
        display: grid;
        grid-template-columns: 50px 1fr 200px 80px 120px;
        gap: 16px;
        padding: 12px 16px;
        background: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 8px;
        font-weight: 600;
        color: #666;
        font-size: 14px;
      }

      .modal-footer {
        padding: 24px 24px 24px 24px;
        display: flex;
        justify-content: flex-end;
        background: #fff;
      }

      .modal-footer .btn.btn-primary {
        margin-bottom: 0;
        margin-top: 0;
        margin-right: 0;
        margin-left: 0;
        /* Nếu muốn nút nhỏ lại, thêm: min-width: 220px; */
      }

      .music-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .music-item {
        display: grid;
        grid-template-columns: 50px 1fr 200px 80px 120px;
        gap: 16px;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        align-items: center;
      }

      .music-item:hover {
        background: #f8f9fa;
      }

      .music-item.playing {
        background: rgba(255, 215, 0, 0.1);
        border-left: 4px solid #ffd700;
      }

      .track-number {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-weight: 500;
      }

      .playing-icon {
        color: #ffd700;
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .track-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .track-image {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        overflow: hidden;
      }

      .track-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .music-item:hover .play-overlay {
        opacity: 1;
      }

      .play-overlay i {
        color: white;
        font-size: 14px;
      }

      .track-details {
        flex: 1;
      }

      .track-title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }

      .track-meta {
        margin: 0;
        font-size: 12px;
        color: #666;
      }

      .track-artist {
        color: #666;
        font-size: 14px;
      }

      .track-duration {
        color: #666;
        font-size: 14px;
        text-align: center;
      }

      .track-actions {
        display: flex;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .music-item:hover .track-actions {
        opacity: 1;
      }

      .action-btn {
        background: none;
        border: none;
        padding: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        color: #666;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .action-btn:hover {
        background: #f0f0f0;
        transform: scale(1.1);
      }

      .action-btn.liked {
        color: #ff6b6b;
      }

      .remove-btn:hover {
        color: #ff6b6b;
      }

      .empty-state,
      .error-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;
      }

      .empty-icon,
      .error-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        color: #ddd;
      }

      .empty-state h3,
      .error-state h2 {
        margin: 0 0 12px 0;
        color: #333;
      }

      .empty-state p,
      .error-state p {
        margin: 0 0 24px 0;
        font-size: 16px;
      }

      .toast-message {
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        background: #222;
        color: #00e676;
        padding: 12px 32px;
        border-radius: 24px;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 2px 12px #0008;
        animation: fadeInOut 2s;
      }
      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .add-music-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        animation: fadeIn 0.3s;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .modal-content {
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        width: 90%;
        max-width: 800px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .modal-header {
        padding: 16px;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-header h3 {
        margin: 0;
        font-size: 18px;
        color: #333;
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: #666;
        transition: color 0.2s ease;
      }

      .close-btn:hover {
        color: #333;
      }

      .modal-body {
        padding: 16px;
        color: #333;
        font-size: 14px;
        line-height: 1.6;
      }

      .search-filter {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }

      .search-type-select {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        background: #f8f9fa;
        cursor: pointer;
        min-width: 120px;
      }

      .search-input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ffd700;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        transition: border-color 0.2s ease;
      }

      .available-music-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 400px;
        padding: 0 16px 16px 16px;
        max-height: 400px;
        overflow-y: auto;
      }

      .available-music-list .music-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        background: #f8f9fa;
        transition: background 0.2s;
      }

      .available-music-list .music-item.selected {
        background: rgba(255, 215, 0, 0.2);
        border-left: 4px solid #ffd700;
      }

      .available-music-list .track-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .available-music-list .track-image {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        overflow: hidden;
        flex-shrink: 0;
      }

      .available-music-list .track-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .available-music-list .track-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .available-music-list .track-title {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        color: #222;
      }

      .available-music-list .track-meta {
        font-size: 13px;
        color: #666;
        margin: 0;
      }

      @media (max-width: 768px) {
        .playlist-hero {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .playlist-cover {
          width: 200px;
          height: 200px;
        }

        .playlist-title {
          font-size: 2rem;
        }

        .music-list-header,
        .music-item {
          grid-template-columns: 40px 1fr 60px 80px;
        }

        .track-artist {
          display: none;
        }

        .playlist-actions {
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    `,
  ],
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: Playlist | null = null;
  musicList: Music[] = [];
  isLoading = true;
  isLoadingMusic = false;
  currentPlayingId: number | null = null;
  sortBy: 'position' | 'title' = 'position';
  playlistId!: number;
  toastMessage: string | null = null;
  showAddMusicModal = false;
  allMusicList: Music[] = [];
  allMusicListOrigin: Music[] = [];
  selectedMusicIds: number[] = [];
  searchQuery: string = '';
  searchType: 'title' | 'artist' = 'title';
  private subscriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private musicService: MusicService,
    private musicPlayerService: MusicPlayerService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.playlistId = +params['id'];
      this.loadPlaylistDetail();
    });

    // Subscribe to current playing track
    const currentTrackSub = this.musicPlayerService.currentTrack$.subscribe(
      (track) => {
        this.currentPlayingId = track?.id || null;
      }
    );
    this.subscriptions.push(currentTrackSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadPlaylistDetail() {
    this.isLoading = true;

    this.playlistService.getPlaylistById(this.playlistId).subscribe({
      next: (response) => {
        if (response.success) {
          this.playlist = response.data;
          this.loadPlaylistMusic();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading playlist:', error);
        this.isLoading = false;
      },
    });
  }
  loadPlaylistMusic() {
    this.isLoadingMusic = true;

    this.playlistService.getPlaylistMusic(this.playlistId).subscribe({
      next: (response) => {
        if (response.success) {
          this.musicList = response.data;
          console.log('🎵 Loaded playlist music:', this.musicList);
        }
        this.isLoadingMusic = false;
      },
      error: (error) => {
        console.error('Error loading playlist music:', error);
        // Fallback to mock data if API fails
        this.musicList = this.getMockMusicList();
        this.isLoadingMusic = false;
      },
    });
  }

  getMockMusicList(): Music[] {
    // This will be replaced with actual API call
    return [
      {
        id: 1,
        title: 'Blinding Lights',
        artist: {
          id: 1,
          name: 'The Weeknd',
          avatarUrl: '',
          bio: '',
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
        category: {
          id: 1,
          name: 'Pop',
          description: '',
          imageUrl: '',
          isActive: true,
          createdAt: '',
          updatedAt: '',
        },
        durationSeconds: 200,
        fileUrl: 'https://sample-music.netlify.app/music/1.mp3',
        imageUrl: 'https://picsum.photos/300/300?random=1',
        typeMusic: MusicType.TRENDING,
        playCount: 1000000,
        likeCount: 50000,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uploadedBy: {
          id: 1,
          username: 'admin',
          email: '',
          isAdmin: true,
          isVerified: true,
          createdAt: '',
          updatedAt: '',
        },
      },
      // Add more mock songs...
    ];
  }
  playMusic(music: Music, index: number) {
    this.currentPlayingId = music.id;
    // Đặt lại playlist cho player (queue)
    this.musicPlayerService.setPlaylist(this.musicList);
    // Phát nhạc
    this.musicPlayerService.playTrack(music, this.musicList);
  }
  playPlaylist() {
    if (this.musicList.length > 0) {
      this.playMusic(this.musicList[0], 0);
      // Set the entire playlist for continuous playback
      this.musicPlayerService.setPlaylist(this.musicList);
    }
  }
  shufflePlaylist() {
    const shuffled = [...this.musicList].sort(() => Math.random() - 0.5);
    this.musicList = shuffled;
    if (shuffled.length > 0) {
      this.playMusic(shuffled[0], 0);
      // Set the shuffled playlist for continuous playback
      this.musicPlayerService.setPlaylist(shuffled);
    }
  }

  toggleLike() {
    if (this.playlist) {
      this.playlist.isLiked = !this.playlist.isLiked;
    }
  }
  toggleMusicLike(music: Music) {
    // TODO: Implement music like functionality
    console.log('Toggle like for:', music.title);
  }

  removeMusicFromPlaylist(music: Music) {
    if (!this.playlist) return;

    // Lấy user hiện tại từ localStorage (hoặc AuthService nếu có)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (this.playlist.userId !== currentUser.id) {
      this.showToast('Bạn không có quyền xóa bài hát khỏi playlist này!');
      return;
    }

    this.playlistService
      .removeMusicFromPlaylist(this.playlist.id, music.id)
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Xóa trên FE sau khi BE đã xóa thành công
            const index = this.musicList.findIndex((m) => m.id === music.id);
            if (index > -1) {
              this.musicList.splice(index, 1);
              if (this.playlist) {
                this.playlist.songCount--;
              }
            }
            this.showToast('Đã xóa bài hát khỏi playlist!');
          }
        },
        error: (err) => {
          if (err.status === 403) {
            this.showToast('Bạn cần đăng nhập để xóa bài hát khỏi playlist!');
          } else {
            this.showToast('Xóa bài hát thất bại!');
          }
          console.error('Lỗi xóa bài hát khỏi playlist:', err);
        },
      });
  }

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = null), 2000);
  }

  addMusic() {
    this.showAddMusicModal = true;
    this.musicService.getAllMusic({ size: -1 }).subscribe({
      next: (res) => {
        // Lấy id các bài đã có trong playlist
        const existingIds = this.musicList.map((m) => m.id);
        // Lọc bỏ các bài đã có
        this.allMusicList = (res.data?.content || []).filter(
          (music) => !existingIds.includes(music.id)
        );
        this.allMusicListOrigin = [...this.allMusicList];
      },
      error: () => {
        this.allMusicList = [];
        this.allMusicListOrigin = [];
        this.showToast('Không tải được danh sách nhạc!');
      },
    });
  }

  toggleSortOrder() {
    this.sortBy = this.sortBy === 'position' ? 'title' : 'position';
    if (this.sortBy === 'title') {
      this.musicList.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort by position (original order)
      this.loadPlaylistMusic();
    }
  }

  showOptions() {
    console.log('Show playlist options');
  }

  showMusicOptions(music: Music) {
    console.log('Show music options for:', music.title);
  }

  goBack() {
    this.router.navigate(['/playlists']);
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  getPlaylistImageUrl(): string {
    if (!this.playlist?.imageUrl) {
      return '/assets/default-playlist.png';
    }
    if (this.playlist.imageUrl.startsWith('http')) {
      return this.playlist.imageUrl;
    }
    return environment.backendUrl + this.playlist.imageUrl;
  }

  filterMusicList() {
    if (!this.searchQuery) {
      this.allMusicList = [...this.allMusicListOrigin];
      return;
    }
    const query = this.searchQuery.toLowerCase();
    if (this.searchType === 'artist') {
      this.allMusicList = this.allMusicListOrigin.filter((music) =>
        music.artist?.name?.toLowerCase().includes(query)
      );
    } else {
      this.allMusicList = this.allMusicListOrigin.filter((music) =>
        music.title.toLowerCase().includes(query)
      );
    }
  }

  toggleMusicSelection(music: Music) {
    const index = this.selectedMusicIds.indexOf(music.id);
    if (index === -1) {
      this.selectedMusicIds.push(music.id);
    } else {
      this.selectedMusicIds.splice(index, 1);
    }
  }

  addSelectedMusic() {
    if (this.selectedMusicIds.length === 0) return;

    let addCount = 0;
    let doneCount = 0;
    let errorOccurred = false;
    const total = this.selectedMusicIds.length;

    this.selectedMusicIds.forEach((musicId) => {
      this.playlistService
        .addMusicToPlaylist(this.playlistId, musicId)
        .subscribe({
          next: (response) => {
            addCount++;
            doneCount++;
            if (doneCount === total) {
              if (addCount > 0) {
                this.showToast('Đã thêm bài hát vào playlist!');
                this.selectedMusicIds = [];
                this.showAddMusicModal = false;
                this.loadPlaylistMusic();
              } else if (errorOccurred) {
                this.showToast('Thêm bài hát vào playlist thất bại!');
              }
            }
          },
          error: (error) => {
            errorOccurred = true;
            doneCount++;
            if (doneCount === total) {
              if (addCount > 0) {
                this.showToast('Đã thêm bài hát vào playlist!');
                this.selectedMusicIds = [];
                this.showAddMusicModal = false;
                this.loadPlaylistMusic();
              } else {
                this.showToast('Thêm bài hát vào playlist thất bại!');
              }
            }
          },
        });
    });
  }
}
