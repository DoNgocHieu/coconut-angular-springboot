import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'verify',
        loadComponent: () => import('./features/auth/verify/verify.component').then(m => m.VerifyComponent)
      }
    ]
  },
  {
    path: 'music',
    loadComponent: () => import('./features/music/music-list/music-list.component').then(m => m.MusicListComponent)
  },
  {
    path: 'playlists',
    loadComponent: () => import('./features/playlist/playlist-list/playlist-list.component').then(m => m.PlaylistListComponent)
  },
  {
    path: 'playlist/:id',
    loadComponent: () => import('./features/playlist/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent)
  },
  {
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
  },  // Admin routes
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () => import('./shared/components/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'music',
        loadComponent: () => import('./features/admin/music/admin-music.component').then(m => m.AdminMusicComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'playlists',
        loadComponent: () => import('./features/admin/playlists/admin-playlists.component').then(m => m.AdminPlaylistsComponent)
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/home'
  }
];
