import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="verify-container">
      <div class="verify-card">
        <div class="verify-header">
          <h1>🎵 Email Verification</h1>
        </div>

        <div class="verify-content">
          <div *ngIf="loading" class="loading">
            <div class="spinner"></div>
            <p>Verifying your email...</p>
          </div>          <div *ngIf="success" class="success">
            <div class="success-icon">✅</div>
            <h2>Email Verified Successfully!</h2>
            <p>Your account has been verified. You can now access all features of Coconut Music.</p>
            <p *ngIf="countdown > 0" class="countdown">Redirecting to login in {{ countdown }} seconds...</p>
            <div class="success-actions">
              <button class="btn btn-primary" (click)="goToLogin()">Go to Login Now</button>
            </div>
          </div>

          <div *ngIf="error" class="error">
            <div class="error-icon">❌</div>
            <h2>Verification Failed</h2>
            <p>{{ errorMessage }}</p>
            <div class="error-actions">
              <button class="btn btn-secondary" (click)="goToLogin()">Go to Login</button>
              <button class="btn btn-primary" (click)="goToRegister()">Register Again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .verify-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .verify-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .verify-header h1 {
      color: #333;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .loading {
      padding: 20px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .success, .error {
      padding: 20px;
    }

    .success-icon, .error-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .success h2 {
      color: #28a745;
      margin-bottom: 15px;
    }

    .error h2 {
      color: #dc3545;
      margin-bottom: 15px;
    }    .success p, .error p {
      color: #666;
      margin-bottom: 25px;
      line-height: 1.6;
    }

    .countdown {
      color: #667eea !important;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .success-actions {
      margin-top: 20px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin: 0 5px;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5a6fd8;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }

    .error-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  `]
})
export class VerifyComponent implements OnInit {
  loading = true;
  success = false;
  error = false;
  errorMessage = '';
  countdown = 0;
  private hasVerified = false; // Flag to prevent duplicate calls

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];

    if (!token) {
      this.showError('Invalid verification link. Please check your email for the correct link.');
      return;
    }

    // Prevent duplicate verification calls
    if (this.hasVerified) {
      return;
    }

    this.verifyEmail(token);
  }

  verifyEmail(token: string) {
    // Prevent multiple calls to the same token
    if (this.hasVerified) {
      return;
    }

    this.hasVerified = true;

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = true;
        console.log('Email verified successfully:', response);

        // Start countdown and auto redirect
        this.countdown = 3;
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(interval);
            this.router.navigate(['/auth/login'], {
              queryParams: {
                message: 'Email verified successfully! You can now log in to your account.'
              }
            });
          }
        }, 1000);
      },      error: (error) => {
        this.loading = false;
        this.hasVerified = false; // Reset flag on error so user can try again

        // Check if it's an "already verified" error
        const errorMessage = error.error?.message || 'Verification failed. The link may be expired or invalid.';

        if (errorMessage.includes('already verified')) {
          // Handle "already verified" case more gracefully
          this.success = true;
          this.countdown = 3;
          const interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
              clearInterval(interval);
              this.router.navigate(['/auth/login'], {
                queryParams: {
                  message: 'Email is already verified! You can log in to your account.'
                }
              });
            }
          }, 1000);
        } else {
          this.showError(errorMessage);
        }

        console.error('Email verification failed:', error);
      }
    });
  }

  showError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
