import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Music, MusicType } from '../models/music.model';
import { ApiResponse, PageResponse, PaginationParams } from '../models/api.model';
import { MusicCreateRequest, MusicUpdateRequest, MusicFilters } from './admin-music.service';

@Injectable({
  providedIn: 'root'
})
export class MockAdminMusicService {
  private mockMusic: Music[] = [
    {
      id: 1,
      title: 'Lofi Chill Music 1',
      fileUrl: '/assets/samples/lofi1.mp3',
      imageUrl: '/assets/images/music1.jpg',
      durationSeconds: 180,
      playCount: 1250,
      likeCount: 89,
      isActive: true,
      typeMusic: MusicType.VN_LOFI,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      category: {
        id: 1,
        name: 'Lo-fi',
        description: 'Chill lofi beats',
        imageUrl: '/assets/images/lofi.jpg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: 2,
      title: 'Trending Pop Song',
      fileUrl: '/assets/samples/pop1.mp3',
      imageUrl: '/assets/images/music2.jpg',
      durationSeconds: 210,
      playCount: 5680,
      likeCount: 342,
      isActive: true,
      typeMusic: MusicType.TRENDING,
      createdAt: '2024-01-16T14:20:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      category: {
        id: 2,
        name: 'Pop',
        description: 'Popular music',
        imageUrl: '/assets/images/pop.jpg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: 3,
      title: 'New Release Track',
      fileUrl: '/assets/samples/new1.mp3',
      imageUrl: '/assets/images/music3.jpg',
      durationSeconds: 195,
      playCount: 890,
      likeCount: 67,
      isActive: true,
      typeMusic: MusicType.NEW_MUSIC,
      createdAt: '2024-01-17T09:15:00Z',
      updatedAt: '2024-01-17T09:15:00Z',
      category: {
        id: 3,
        name: 'Rock',
        description: 'Rock music',
        imageUrl: '/assets/images/rock.jpg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: 4,
      title: 'Top Viewed Hit',
      fileUrl: '/assets/samples/hit1.mp3',
      imageUrl: '/assets/images/music4.jpg',
      durationSeconds: 225,
      playCount: 12340,
      likeCount: 756,
      isActive: true,
      typeMusic: MusicType.TOP_VIEW,
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      category: {
        id: 4,
        name: 'Electronic',
        description: 'Electronic music',
        imageUrl: '/assets/images/electronic.jpg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    },
    {
      id: 5,
      title: 'Favorite Classic',
      fileUrl: '/assets/samples/classic1.mp3',
      imageUrl: '/assets/images/music5.jpg',
      durationSeconds: 240,
      playCount: 3450,
      likeCount: 189,
      isActive: false,
      typeMusic: MusicType.FAVORITE,
      createdAt: '2024-01-10T12:00:00Z',
      updatedAt: '2024-01-10T12:00:00Z',
      category: {
        id: 5,
        name: 'Classical',
        description: 'Classical music',
        imageUrl: '/assets/images/classical.jpg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    }
  ];

  getAllMusic(params?: PaginationParams, filters?: MusicFilters): Observable<ApiResponse<PageResponse<Music>>> {
    console.log('Mock admin music service called with params:', params, 'filters:', filters);

    let filteredMusic = [...this.mockMusic];

    // Apply filters
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredMusic = filteredMusic.filter(music =>
        music.title.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.categoryId) {
      filteredMusic = filteredMusic.filter(music =>
        music.category?.id === filters.categoryId
      );
    }

    if (filters?.isActive !== undefined) {
      filteredMusic = filteredMusic.filter(music =>
        music.isActive === filters.isActive
      );
    }

    // Apply pagination
    const page = params?.page || 0;
    const size = params?.size || 10;
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const content = filteredMusic.slice(startIndex, endIndex);

    const pageResponse: PageResponse<Music> = {
      content,
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: startIndex,
        pageSize: size,
        pageNumber: page,
        paged: true,
        unpaged: false
      },
      last: endIndex >= filteredMusic.length,
      totalPages: Math.ceil(filteredMusic.length / size),
      totalElements: filteredMusic.length,
      size: size,
      number: page,
      sort: { empty: true, sorted: false, unsorted: true },
      first: page === 0,
      numberOfElements: content.length,
      empty: content.length === 0
    };    const response: ApiResponse<PageResponse<Music>> = {
      success: true,
      message: 'Music retrieved successfully',
      data: pageResponse,
      timestamp: new Date().toISOString()
    };

    console.log('Mock response:', response);
    return of(response).pipe(delay(500)); // Simulate network delay
  }

  getMusicById(id: number): Observable<ApiResponse<Music>> {
    const music = this.mockMusic.find(m => m.id === id);
    const response: ApiResponse<Music> = {
      success: !!music,
      message: music ? 'Music found' : 'Music not found',
      data: music
    };
    return of(response).pipe(delay(300));
  }

  createMusic(request: MusicCreateRequest): Observable<ApiResponse<Music>> {
    const newMusic: Music = {
      id: Math.max(...this.mockMusic.map(m => m.id)) + 1,
      title: request.title,
      fileUrl: request.fileUrl,
      imageUrl: request.imageUrl || '',
      durationSeconds: request.durationSeconds,
      playCount: 0,
      likeCount: 0,
      isActive: request.isActive ?? true,
      typeMusic: request.typeMusic || MusicType.NEW_MUSIC,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: request.categoryId ? this.mockMusic.find(m => m.category?.id === request.categoryId)?.category : undefined
    };

    this.mockMusic.unshift(newMusic);

    const response: ApiResponse<Music> = {
      success: true,
      message: 'Music created successfully',
      data: newMusic
    };
    return of(response).pipe(delay(500));
  }

  updateMusic(id: number, request: MusicUpdateRequest): Observable<ApiResponse<Music>> {
    const index = this.mockMusic.findIndex(m => m.id === id);
    if (index === -1) {
      const response: ApiResponse<Music> = {
        success: false,
        message: 'Music not found'
      };
      return of(response).pipe(delay(300));
    }

    const updatedMusic: Music = {
      ...this.mockMusic[index],
      title: request.title,
      fileUrl: request.fileUrl,
      imageUrl: request.imageUrl || '',
      durationSeconds: request.durationSeconds,
      isActive: request.isActive ?? true,
      typeMusic: request.typeMusic || MusicType.NEW_MUSIC,
      updatedAt: new Date().toISOString(),
      category: request.categoryId ? this.mockMusic.find(m => m.category?.id === request.categoryId)?.category : undefined
    };

    this.mockMusic[index] = updatedMusic;

    const response: ApiResponse<Music> = {
      success: true,
      message: 'Music updated successfully',
      data: updatedMusic
    };
    return of(response).pipe(delay(500));
  }

  deleteMusic(id: number): Observable<ApiResponse<void>> {
    const index = this.mockMusic.findIndex(m => m.id === id);
    if (index === -1) {
      const response: ApiResponse<void> = {
        success: false,
        message: 'Music not found'
      };
      return of(response).pipe(delay(300));
    }

    this.mockMusic.splice(index, 1);

    const response: ApiResponse<void> = {
      success: true,
      message: 'Music deleted successfully'
    };
    return of(response).pipe(delay(500));
  }

  toggleActiveStatus(id: number): Observable<ApiResponse<Music>> {
    const music = this.mockMusic.find(m => m.id === id);
    if (!music) {
      const response: ApiResponse<Music> = {
        success: false,
        message: 'Music not found'
      };
      return of(response).pipe(delay(300));
    }

    music.isActive = !music.isActive;
    music.updatedAt = new Date().toISOString();

    const response: ApiResponse<Music> = {
      success: true,
      message: 'Music status updated successfully',
      data: music
    };
    return of(response).pipe(delay(500));
  }

  bulkDeleteMusic(musicIds: number[]): Observable<ApiResponse<void>> {
    this.mockMusic = this.mockMusic.filter(m => !musicIds.includes(m.id));

    const response: ApiResponse<void> = {
      success: true,
      message: `${musicIds.length} music tracks deleted successfully`
    };
    return of(response).pipe(delay(800));
  }

  bulkToggleActive(musicIds: number[], active: boolean): Observable<ApiResponse<void>> {
    musicIds.forEach(id => {
      const music = this.mockMusic.find(m => m.id === id);
      if (music) {
        music.isActive = active;
        music.updatedAt = new Date().toISOString();
      }
    });

    const response: ApiResponse<void> = {
      success: true,
      message: `${musicIds.length} music tracks updated successfully`
    };
    return of(response).pipe(delay(800));
  }
}
