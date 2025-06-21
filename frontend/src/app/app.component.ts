import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { MusicService } from './core/services/music.service';
import { MusicPlayerService } from './core/services/music-player.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { MusicPlayerComponent } from './shared/components/music-player/music-player.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { Music } from './core/models/music.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    MusicPlayerComponent,
    SidebarComponent
  ],
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar>

      <!-- Header -->
      <app-header></app-header>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Music Player Component -->
      <app-music-player
        [currentTrack]="currentTrack$ | async"
        *ngIf="currentTrack$ | async">
      </app-music-player>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Coconut Music';
  currentTrack$: Observable<Music | null>;
  isPlaying$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private musicService: MusicService,
    private musicPlayerService: MusicPlayerService
  ) {
    this.currentTrack$ = this.musicPlayerService.currentTrack$;
    this.isPlaying$ = this.musicPlayerService.isPlaying$;
  }

  ngOnInit() {
    // Initialize app
    // Debug: Log when currentTrack changes
    this.currentTrack$.subscribe(track => {
      console.log('🎵 Current track changed in app component:', track);
    });
  }

  togglePlay() {
    this.isPlaying$.subscribe(isPlaying => {
      if (isPlaying) {
        this.musicPlayerService.pauseTrack();
      } else {
        this.musicPlayerService.resumeTrack();
      }
    }).unsubscribe();
  }

  nextTrack() {
    this.musicPlayerService.nextTrack();
  }

  previousTrack() {
    this.musicPlayerService.previousTrack();
  }
}
