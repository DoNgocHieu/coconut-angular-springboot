import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../core/services/sidebar.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';
import { Music } from '../../../core/models/music.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-overlay" [class.show]="open" (click)="toggle()"></div>
    <div class="sidebar" [class.open]="open">
      <div class="sidebar-header">
        <h3><i class="fas fa-music"></i> Đang phát</h3>
        <button class="close-btn" (click)="toggle()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="sidebar-content">
        <ng-container *ngIf="queue && queue.length > 0; else emptyQueue">
          <ul class="my-list-nav">
            <li
              *ngFor="let track of queue; let i = index"
              class="my-list-item"
              [class.playing]="track.id === currentTrackId"
              (click)="playTrack(track)"
            >
              <span class="song-index">{{ i + 1 }}</span>
              <img class="song-img" [src]="track.imageUrl || '/assets/default-music.png'" [alt]="track.title" />
              <div class="song-info">
                <div class="song-title">{{ track.title }}</div>
                <div class="song-artist">{{ track.artist?.name }}</div>
              </div>


              <ng-container *ngIf="track.id === currentTrackId">
                <span class="playing-bars">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </span>
              </ng-container>
            </li>
          </ul>
        </ng-container>
        <ng-template #emptyQueue>
          <p>Danh sách phát trống.</p>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  open = false;
  queue: Music[] = [];
  currentTrackId: number | null = null;

  constructor(
    private sidebarService: SidebarService,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit() {
    this.sidebarService.open$.subscribe(open => {
      this.open = open;
    });
    this.musicPlayerService.playlist$.subscribe(queue => {
      this.queue = queue || [];
    });
    this.musicPlayerService.currentTrack$.subscribe(track => {
      this.currentTrackId = track?.id ?? null;
    });
  }

  toggle() {
    this.sidebarService.toggle();
  }

  playTrack(track: Music) {
    this.musicPlayerService.playTrack(track, this.queue);
  }

  removeFromQueue(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.queue.splice(index, 1);
    this.musicPlayerService.setPlaylist([...this.queue]);
  }
}
