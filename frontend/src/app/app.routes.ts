import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'music',
    loadComponent: () => import('./features/music/music-list/music-list.component').then(m => m.MusicListComponent)
  },  {
    path: 'playlists',
    loadComponent: () => import('./features/playlist/playlist-list/playlist-list.component').then(m => m.PlaylistListComponent)
  },
  {
    path: 'playlist/:id',
    loadComponent: () => import('./features/playlist/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent)
  },  {
    path: 'categories',
    loadComponent: () => import('./features/category/category-list/category-list.component').then(m => m.CategoryListComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/user/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'recently-played',
    loadComponent: () => import('./features/user/recently-played/recently-played.component').then(m => m.RecentlyPlayedComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
