export interface Music {
  id: number;
  title: string;
  durationSeconds: number;
  fileUrl: string;
  imageUrl?: string;
  category?: Category;
  artist?: Artist;
  typeMusic: MusicType;
  playCount: number;
  likeCount: number;
  isActive: boolean;
  uploadedBy?: User;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean; // Added for frontend use
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: number;
  name: string;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum MusicType {
  NEW_MUSIC = 'NEW_MUSIC',
  TRENDING = 'TRENDING',
  TOP_VIEW = 'TOP_VIEW',
  VN_LOFI = 'VN_LOFI',
  FAVORITE = 'FAVORITE'
}

export interface User {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
