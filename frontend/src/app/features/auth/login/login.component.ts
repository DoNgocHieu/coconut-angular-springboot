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
  templateUrl: './login.component.html',
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
