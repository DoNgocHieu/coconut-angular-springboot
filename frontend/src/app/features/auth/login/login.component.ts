import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: LoginRequest = {
    usernameOrEmail: '',
    password: ''
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  showErrors = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check for message from registration
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.successMessage = params['message'];
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }  onSubmit() {
    this.showErrors = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.loginData.usernameOrEmail || !this.loginData.password) {
      return;
    }

    this.isLoading = true;

    // Use real API call to backend
    this.realLogin();
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
            email: this.loginData.usernameOrEmail.includes('@') ?                  this.loginData.usernameOrEmail :
                  `${this.loginData.usernameOrEmail}@coconutmusic.com`,
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            tokenType: 'Bearer',
            admin: this.loginData.usernameOrEmail === 'admin'
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
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          // Save auth data and navigate to home
          this.authService.setAuthDataPublic(response.data);
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check your internet connection.';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid username/email or password.';
        } else if (error.status === 400) {
          // Handle email verification error specifically
          if (error.error?.message?.includes('verify your email')) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Invalid login data. Please check your inputs.';
          }
        } else {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
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
