import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.model';
import { ApiResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadStoredAuth();
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/register`, registerRequest)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/logout`, {})
      .pipe(
        tap(() => {
          this.clearAuthData();
        })
      );
  }

  verifyEmail(token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/verify`, null, {
      params: { token }
    });
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/forgot-password`, null, {
      params: { email }
    });
  }

  resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/reset-password`, null, {
      params: { token, newPassword }
    });
  }
  private setAuthData(authResponse: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
    }

    const user: User = {
      id: authResponse.userId,
      username: authResponse.username,
      email: authResponse.email,
      isVerified: true,
      isAdmin: authResponse.isAdmin,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  private clearAuthData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
  private loadStoredAuth(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // TODO: Validate token and get user info from backend
        // For now, create a mock user for development
        const mockUser: User = {
          id: 1,
          username: 'user_demo',
          email: 'user@coconutmusic.com',
          isVerified: true,
          isAdmin: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.currentUserSubject.next(mockUser);
        this.isLoggedInSubject.next(true);
      }
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.isAdmin || false;
  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }  // Mock login for development/testing
  mockLogin(): void {
    const mockAuthResponse: AuthResponse = {
      userId: 1,
      username: 'user_demo',
      email: 'user@coconutmusic.com',
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      tokenType: 'Bearer',
      isAdmin: false
    };
    this.setAuthData(mockAuthResponse);
  }

  // Public method to set auth data (for mock registration)
  setAuthDataPublic(authResponse: AuthResponse): void {
    this.setAuthData(authResponse);
  }
}
