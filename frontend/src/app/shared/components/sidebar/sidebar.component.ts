import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../core/services/sidebar.service';
import { MusicPlayerService } from '../../../core/services/music-player.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-overlay" [class.show]="open" (click)="toggle()"></div>
    <div class="sidebar" [class.open]="open">
      <div class="sidebar-header">
        <h3><i class="fas fa-music"></i> Music Player</h3>
        <button class="close-btn" (click)="toggle()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="sidebar-content">
        <p>Music player controls will be here</p>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  open = false;

  constructor(
    private sidebarService: SidebarService,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit() {
    this.sidebarService.open$.subscribe(open => {
      this.open = open;
    });
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
