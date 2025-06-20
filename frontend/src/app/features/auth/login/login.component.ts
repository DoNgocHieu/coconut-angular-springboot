import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo">
            <i class="fas fa-music"></i>
            <h1>Coconut Music</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your musical journey</p>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="usernameOrEmail">
              <i class="fas fa-user"></i>
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              [(ngModel)]="loginData.usernameOrEmail"
              required
              class="form-control"
              placeholder="Enter your username or email"
              [class.error]="showErrors && !loginData.usernameOrEmail">
            <div *ngIf="showErrors && !loginData.usernameOrEmail" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Username or email is required
            </div>
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              Password
            </label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                required
                minlength="6"
                class="form-control"
                placeholder="Enter your password"
                [class.error]="showErrors && !loginData.password">
              <button type="button" class="password-toggle" (click)="togglePassword()">
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div *ngIf="showErrors && !loginData.password" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Password is required
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
              <span class="checkmark">
                <i class="fas fa-check"></i>
              </span>
              Remember me
            </label>
            <a routerLink="/auth/forgot-password" class="forgot-password">
              <i class="fas fa-key"></i>
              Forgot password?
            </a>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="isLoading">
            <span *ngIf="isLoading" class="loading-spinner">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span *ngIf="!isLoading">
              <i class="fas fa-sign-in-alt"></i>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>          <div *ngIf="errorMessage" class="error-alert">
            <i class="fas fa-exclamation-triangle"></i>
            {{ errorMessage }}
          </div>

          <div class="demo-credentials">
            <div class="demo-header">
              <i class="fas fa-info-circle"></i>
              Demo Credentials
            </div>
            <div class="demo-list">
              <div class="demo-item">
                <strong>Admin:</strong> admin / admin123
              </div>
              <div class="demo-item">
                <strong>User:</strong> user / user123
              </div>
              <div class="demo-item">
                <strong>Demo:</strong> demo / demo123
              </div>
            </div>
          </div>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/auth/register">
            <i class="fas fa-user-plus"></i>
            Create one here
          </a></p>
        </div>

        <div class="social-login">
          <div class="divider">
            <span>or sign in with</span>
          </div>
          <div class="social-buttons">
            <button class="social-btn google-btn" (click)="signInWithGoogle()">
              <i class="fab fa-google"></i>
              Google
            </button>
            <button class="social-btn facebook-btn" (click)="signInWithFacebook()">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginRequest = {
    usernameOrEmail: '',
    password: ''
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  showErrors = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.showErrors = true;
    this.errorMessage = '';

    if (!this.loginData.usernameOrEmail || !this.loginData.password) {
      return;
    }

    this.isLoading = true;

    // For development: use mock login since backend is not ready
    this.mockLogin();
  }

  private mockLogin() {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Mock credentials validation
        const validCredentials = [
          { username: 'admin', password: 'admin123' },
          { username: 'user', password: 'user123' },
          { username: 'demo', password: 'demo123' },
          { username: 'test@coconutmusic.com', password: 'test123' }
        ];

        const isValid = validCredentials.some(cred =>
          (cred.username === this.loginData.usernameOrEmail) &&
          (cred.password === this.loginData.password)
        );

        if (isValid) {
          // Mock successful login
          const mockAuthResponse = {
            userId: Math.floor(Math.random() * 1000) + 1,
            username: this.loginData.usernameOrEmail.includes('@') ?
                     this.loginData.usernameOrEmail.split('@')[0] :
                     this.loginData.usernameOrEmail,
            email: this.loginData.usernameOrEmail.includes('@') ?
                  this.loginData.usernameOrEmail :
                  `${this.loginData.usernameOrEmail}@coconutmusic.com`,
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            tokenType: 'Bearer',
            isAdmin: this.loginData.usernameOrEmail === 'admin'
          };

          this.authService.setAuthDataPublic(mockAuthResponse);
          this.isLoading = false;
          this.router.navigate(['/home']);
        } else {
          this.isLoading = false;
          this.errorMessage = 'Invalid username/email or password. Try: admin/admin123, user/user123, demo/demo123';
        }
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = 'An unexpected error occurred. Please try again.';
        console.error('Mock login error:', error);
      }
    }, 1000);
  }

  private realLogin() {
    // Keep the real API call for when backend is ready
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check your internet connection.';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid username/email or password.';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid login data. Please check your inputs.';
        } else {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  signInWithGoogle() {
    console.log('Sign in with Google');
    // TODO: Implement Google Sign In
  }

  signInWithFacebook() {
    console.log('Sign in with Facebook');
    // TODO: Implement Facebook Sign In
  }
}
