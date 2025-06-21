import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo">
            <i class="fas fa-music"></i>
            <h1>Coconut Music</h1>
          </div>
          <h2>Create Your Account</h2>
          <p>Join millions of music lovers and start your journey</p>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="registerData.username"
              required
              minlength="3"
              maxlength="50"
              class="form-control"
              placeholder="Choose a username"
              [class.error]="showErrors && (!registerData.username || registerData.username.length < 3)">
            <div *ngIf="showErrors && (!registerData.username || registerData.username.length < 3)" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Username is required (3-50 characters)
            </div>
          </div>

          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="registerData.email"
              required
              email
              class="form-control"
              placeholder="Enter your email address"
              [class.error]="showErrors && (!registerData.email || !isValidEmail(registerData.email))">
            <div *ngIf="showErrors && (!registerData.email || !isValidEmail(registerData.email))" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Please enter a valid email address
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
                [(ngModel)]="registerData.password"
                required
                minlength="6"
                class="form-control"
                placeholder="Create a strong password"
                [class.error]="showErrors && (!registerData.password || registerData.password.length < 6)">
              <button type="button" class="password-toggle" (click)="togglePassword()">
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div *ngIf="showErrors && (!registerData.password || registerData.password.length < 6)" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Password is required (minimum 6 characters)
            </div>
            <div class="password-strength">
              <div class="strength-bar">
                <div class="strength-fill" [style.width.%]="passwordStrength" [class]="getPasswordStrengthClass()"></div>
              </div>
              <span class="strength-text" [class]="getPasswordStrengthClass()">
                <i class="fas fa-shield-alt"></i>
                {{ getPasswordStrengthText() }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">
              <i class="fas fa-lock"></i>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              required
              class="form-control"
              placeholder="Confirm your password"
              [class.error]="showErrors && (!confirmPassword || registerData.password !== confirmPassword)">
            <div *ngIf="showErrors && (!confirmPassword || registerData.password !== confirmPassword)" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              Passwords do not match
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="agreeToTerms" name="agreeToTerms" required>
              <span class="checkmark">
                <i class="fas fa-check"></i>
              </span>
              I agree to the <a href="#" target="_blank">Terms of Service</a> and <a href="#" target="_blank">Privacy Policy</a>
            </label>
            <div *ngIf="showErrors && !agreeToTerms" class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              You must agree to the terms and conditions
            </div>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="isLoading">
            <span *ngIf="isLoading" class="loading-spinner">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span *ngIf="!isLoading">
              <i class="fas fa-user-plus"></i>
            </span>
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div *ngIf="errorMessage" class="error-alert">
            <i class="fas fa-exclamation-triangle"></i>
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="success-alert">
            <i class="fas fa-check-circle"></i>
            {{ successMessage }}
          </div>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/auth/login">
            <i class="fas fa-sign-in-alt"></i>
            Sign in here
          </a></p>
        </div>

        <div class="social-login">
          <div class="divider">
            <span>or sign up with</span>
          </div>
          <div class="social-buttons">
            <button class="social-btn google-btn" (click)="signUpWithGoogle()">
              <i class="fab fa-google"></i>
              Google
            </button>
            <button class="social-btn facebook-btn" (click)="signUpWithFacebook()">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };

  confirmPassword = '';
  showPassword = false;
  agreeToTerms = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showErrors = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordStrength(): number {
    if (!this.registerData.password) return 0;

    let strength = 0;
    const password = this.registerData.password;

    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    return Math.min(strength, 100);
  }

  getPasswordStrengthClass(): string {
    const strength = this.passwordStrength;
    if (strength < 40) return 'weak';
    if (strength < 70) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.passwordStrength;
    if (strength === 0) return '';
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  }  onSubmit() {
    this.showErrors = true;

    if (!this.isFormValid()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Use real API call to backend
    this.realRegister();
  }

  private realRegister() {
    // Keep the real API call for when backend is ready
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = response.message || 'Registration successful! Please check your email to verify your account.';
          // Redirect to login page after successful registration
          setTimeout(() => {
            this.router.navigate(['/auth/login'], {
              queryParams: {
                message: 'Registration successful! Please check your email to verify your account before logging in.'
              }
            });
          }, 3000);
        } else {
          this.errorMessage = response.message || 'Registration failed';
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check your internet connection.';
        } else if (error.status === 409) {
          this.errorMessage = 'Username or email already exists. Please choose different credentials.';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid registration data. Please check your inputs.';
        } else {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
        console.error('Registration error:', error);
      }
    });
  }

  private isFormValid(): boolean {
    return !!(
      this.registerData.username &&
      this.registerData.username.length >= 3 &&
      this.registerData.email &&
      this.isValidEmail(this.registerData.email) &&
      this.registerData.password &&
      this.registerData.password.length >= 6 &&
      this.confirmPassword &&
      this.registerData.password === this.confirmPassword &&
      this.agreeToTerms
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  signUpWithGoogle() {
    // TODO: Implement Google OAuth
    console.log('Google sign up not implemented yet');
  }

  signUpWithFacebook() {
    // TODO: Implement Facebook OAuth
    console.log('Facebook sign up not implemented yet');
  }
}
