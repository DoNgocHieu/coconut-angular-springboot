import { Music, User } from './music.model';

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  user?: User;
  userId: number;
  isPublic: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  songCount: number;
  totalDurationSeconds: number;
  totalDuration?: number; // for compatibility
  createdBy: string;
  isLiked?: boolean; // For frontend usage
}

export interface PlaylistMusic {
  id: number;
  playlist: Playlist;
  music: Music;
  position: number;
  addedAt: string;
}

export interface Favorite {
  id: number;
  user: User;
  music: Music;
  createdAt: string;
}

export interface History {
  id: number;
  user: User;
  music: Music;
  playedAt: string;
}

export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
