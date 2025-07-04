import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../models/auth.model';
import { ApiResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
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
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.API_URL}/login`, loginRequest)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
          }
        })
      );
  }
  register(registerRequest: RegisterRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.API_URL}/register`,
      registerRequest
    );
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
      })
    );
  }

  verifyEmail(token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/verify`, null, {
      params: { token },
    });
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.API_URL}/forgot-password`,
      null,
      {
        params: { email },
      }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/reset-password`, null, {
      params: { token, newPassword },
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
      isVerified: authResponse.isVerified || true, // Use response value or default to true
      isAdmin: authResponse.isAdmin,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    console.log('Setting auth data:', user);
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }
  private clearAuthData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
  private loadStoredAuth(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('currentUser');

      if (token && storedUser) {
        try {
          const user: User = JSON.parse(storedUser);
          console.log('Loading stored auth data:', user);
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          this.clearAuthData();
        }
      } else {
        this.clearAuthData();
      }
    }
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('accessToken');
      console.log('AuthService.getToken() called - Token exists:', !!token);
      if (token) {
        console.log('Token preview:', token.substring(0, 50) + '...');
      }
      return token;
    }
    console.log('AuthService.getToken() - Not in browser platform');
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
  }

  // Public method to set auth data (for mock registration)
  setAuthDataPublic(authResponse: AuthResponse): void {
    this.setAuthData(authResponse);
  }
}
