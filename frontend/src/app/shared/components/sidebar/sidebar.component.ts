import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../core/services/sidebar.service';
import { UserMusicService } from '../../../core/services/user-music.service'; // Thêm dòng này
import { Music } from '../../../core/models/music.model'; // Thêm dòng này
import { MusicPlayerService } from '../../../core/services/music-player.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-overlay" [class.show]="open" (click)="toggle()"></div>
    <div class="sidebar" [class.open]="open">
      <div class="sidebar-header">
        <h3><i class="fas fa-list"></i> My List</h3>
        <button class="close-btn" (click)="toggle()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="sidebar-content">
        <ul class="my-list-nav">
          <li *ngFor="let song of myList; let i = index"
              class="my-list-item"
              [class.playing]="song.id === currentTrackId"
              (click)="playSong(song)">
            <span class="song-index">{{ i + 1 }}</span>
            <img [src]="song.imageUrl" width="48" height="48" alt="cover" class="song-img" />
            <div class="song-info">
              <div class="song-title">{{ song.title }}</div>
              <div class="song-artist">{{ song.artist?.name || 'Unknown Artist' }}</div>
            </div>
            <i *ngIf="song.id === currentTrackId" class="playing-bars">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </i>
            <button class="delete-btn" (click)="removeFromMyList(song, $event)">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div *ngIf="userMessage" class="copy-toast">
      {{ userMessage }}
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  open = false;
  myList: Music[] = [];
  currentTrackId: number | null = null;
  userMessage: string = '';

  constructor(
    private sidebarService: SidebarService,
    private userMusicService: UserMusicService, // Inject service lấy nhạc user
    private musicPlayerService: MusicPlayerService // Thêm dòng này
  ) {}

  ngOnInit() {
    this.sidebarService.open$.subscribe(open => {
      this.open = open;
    });
    this.sidebarService.myListChanged$.subscribe(() => {
      this.loadMyList();
    });
    this.loadMyList();

    // Lắng nghe bài hát đang phát
    this.musicPlayerService.currentTrack$.subscribe(track => {
      this.currentTrackId = track ? track.id : null;
    });
  }

  // Ví dụ hàm loadMyList:
  loadMyList() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;
    if (!userId) {
      this.myList = [];
      return;
    }
    this.userMusicService.getMyList(userId).subscribe((res: any) => {
      this.myList = res.map((item: any) => item.music);
    });
  }

  playSong(song: Music) {
    // Phát nhạc và truyền cả danh sách để next/prev được
    this.musicPlayerService.playTrack(song, this.myList);
    // Đóng sidebar nếu muốn:
    // this.sidebarService.close();
  }

  toggle() {
    this.sidebarService.toggle();
  }

  showUserMessage(msg: string) {
    this.userMessage = msg;
    setTimeout(() => this.userMessage = '', 2000);
  }

  removeFromMyList(song: Music, event: MouseEvent) {
    event.stopPropagation();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;
    if (!userId) return;
    this.userMusicService.removeFromMyList(song.id, userId).subscribe({
      next: () => {
        this.sidebarService.notifyMyListChanged();
        this.showUserMessage('Đã xóa khỏi danh sách!');
      }
    });
  }
}
