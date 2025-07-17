# README - Giải thích chi tiết từng thư mục Source Code

## Coconut Music Project Structure

### 📁 Frontend Angular 17

| Tên thư mục | Mục đích | Ví dụ |
|-------------|----------|-------|
| `src/app/core/config/` | Chứa các file cấu hình toàn cục của ứng dụng | `firebase.config.ts` - Cấu hình Firebase để lưu trữ file âm thanh và hình ảnh |
| `src/app/core/guards/` | Bảo vệ các route, kiểm tra quyền truy cập | `auth.guard.ts` - Kiểm tra user đã đăng nhập chưa, `admin.guard.ts` - Kiểm tra quyền admin |
| `src/app/core/interceptors/` | Xử lý HTTP requests/responses tự động | `auth.interceptor.ts` - Tự động thêm JWT token vào header của mọi API call |
| `src/app/core/models/` | Định nghĩa cấu trúc dữ liệu TypeScript | `music.model.ts` - Interface cho bài hát (id, title, artist, duration), `user.model.ts` - Interface cho người dùng |
| `src/app/core/services/` | Xử lý logic nghiệp vụ và gọi API | `auth.service.ts` - Đăng nhập, đăng ký, quản lý JWT, `music.service.ts` - Tìm kiếm, phát nhạc |
| `src/app/features/admin/` | Tất cả tính năng dành cho admin | `dashboard/` - Thống kê hệ thống, `music/` - Quản lý kho nhạc |
| `src/app/features/auth/` | Chức năng xác thực người dùng | `login/` - Trang đăng nhập, `register/` - Trang đăng ký |
| `src/app/features/home/` | Trang chủ ứng dụng | Components hiển thị trending music, categories, banner |
| `src/app/features/music/` | Chức năng liên quan đến nhạc | Music player, tìm kiếm, chi tiết bài hát |
| `src/app/features/playlist/` | Quản lý danh sách phát | Tạo playlist, thêm/xóa bài hát, chia sẻ playlist |
| `src/app/features/user/` | Trang cá nhân người dùng | Profile, cài đặt tài khoản, đổi mật khẩu |
| `src/app/shared/components/` | Components được dùng chung | `header/` - Header navigation, `sidebar/` - Menu bên, `music-player/` - Player điều khiển nhạc |
| `src/assets/` | Tài nguyên tĩnh (hình ảnh, icon) | Logo, background images, default avatars |
| `src/environments/` | Cấu hình môi trường | `environment.ts` - API URL dev, `environment.prod.ts` - API URL production |
| `src/styles/` | CSS/SCSS toàn cục | `theme.scss` - Theme chính, `admin-theme.scss` - Theme admin |

---

### 📁 Backend Spring Boot 3.2.0

| Tên thư mục | Mục đích | Ví dụ |
|-------------|----------|-------|
| `src/main/java/com/coconutmusic/config/` | Cấu hình Spring Boot framework | `SecurityConfig.java` - Cấu hình JWT, CORS, authentication, `WebMvcConfig.java` - Cấu hình upload file, static resources |
| `src/main/java/com/coconutmusic/controller/` | REST API endpoints nhận HTTP requests | `MusicController.java` - API tìm kiếm nhạc, get thông tin bài hát, `AuthController.java` - API đăng nhập, đăng ký |
| `src/main/java/com/coconutmusic/dto/request/` | Dữ liệu nhận từ frontend (Input) | `LoginRequest.java` - {username, password}, `MusicCreateRequest.java` - {title, artist, file, category} |
| `src/main/java/com/coconutmusic/dto/response/` | Dữ liệu trả về cho frontend (Output) | `AuthResponse.java` - {token, userInfo, expiresIn}, `ApiResponse.java` - {success, message, data} |
| `src/main/java/com/coconutmusic/entity/` | Ánh xạ bảng database thành Java objects | `Music.java` - Bảng music (id, title, artist, file_path), `User.java` - Bảng users (id, username, email, role) |
| `src/main/java/com/coconutmusic/repository/` | Truy vấn database (CRUD operations) | `MusicRepository.java` - findByTitle(), findByArtist(), `UserRepository.java` - findByUsername(), findByEmail() |
| `src/main/java/com/coconutmusic/service/` | Xử lý logic nghiệp vụ chính | `MusicService.java` - Validate file nhạc, xử lý metadata, `AuthService.java` - Encrypt password, generate JWT |
| `src/main/java/com/coconutmusic/security/` | Bảo mật JWT và authentication | `JwtTokenProvider.java` - Tạo và validate JWT token, `JwtAuthenticationFilter.java` - Filter kiểm tra token |
| `src/main/java/com/coconutmusic/exception/` | Xử lý lỗi tập trung | `GlobalExceptionHandler.java` - Bắt mọi exception và trả về JSON error, `ResourceNotFoundException.java` - Lỗi 404 |
| `src/main/resources/` | File cấu hình và tài nguyên | `application.properties` - Database URL, JWT secret, `static/samples/` - File JSON mẫu |
| `uploads/` | Thư mục lưu file upload | `playlist-images/` - Ảnh cover playlist do user upload |
| `target/` | File build được Maven tạo ra | `classes/` - File .class đã compile, `coconut-music-backend.jar` - File chạy |

---

## 🔍 **Ví dụ chi tiết luồng hoạt động:**

### 📱 **Frontend → Backend Flow:**

#### 1. **User đăng nhập:**
```
📁 features/auth/login/login.component.ts
   ↓ gọi this.authService.login(loginForm.value)
📁 core/services/auth.service.ts
   ↓ HTTP POST /api/auth/login với LoginRequest
📁 controller/AuthController.java
   ↓ gọi authService.authenticate(loginRequest)
📁 service/AuthService.java
   ↓ kiểm tra user trong database với username/email
📁 repository/UserRepository.java
   ↓ trả về JWT token và user info
📁 dto/response/AuthResponse.java
```

#### 2. **User phát nhạc:**
```
📁 shared/components/music-player/music-player.component.ts
   ↓ gọi musicService.playMusic(musicId)
📁 core/services/music.service.ts
   ↓ HTTP GET /api/music/{id}
📁 controller/MusicController.java
   ↓ gọi musicService.getMusicById()
📁 service/MusicService.java
   ↓ truy vấn database
📁 repository/MusicRepository.java
   ↓ trả về file path và metadata
📁 entity/Music.java
```

#### 3. **Admin upload nhạc:**
```
📁 features/admin/music/admin-music.component.ts
   ↓ gọi adminMusicService.uploadMusic(file, metadata)
📁 core/services/admin-music.service.ts
   ↓ HTTP POST /api/admin/music với JWT token
📁 security/JwtAuthenticationFilter.java (kiểm tra quyền admin)
   ↓
📁 controller/AdminMusicController.java
   ↓ gọi adminMusicService.createMusic()
📁 service/AdminMusicService.java
   ↓ lưu file và metadata vào database
📁 repository/MusicRepository.java
```

---

## 💻 **Ví dụ code cụ thể:**

### **1. Frontend Login Component:**
```typescript
// features/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    usernameOrEmail: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe({
        next: (response) => {
          // Lưu JWT token và user info
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Hiển thị error message cho user
          alert('Đăng nhập thất bại: ' + error.message);
        }
      });
    } else {
      // Validate form và hiển thị errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  // Getter methods cho template validation
  get usernameOrEmail() { return this.loginForm.get('usernameOrEmail'); }
  get password() { return this.loginForm.get('password'); }
}
```

### **2. Frontend Auth Service:**
```typescript
// core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
```

### **3. Backend Controller:**
```java
// controller/AuthController.java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
```

### **4. Backend Service:**
```java
// service/AuthService.java
@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse authenticate(LoginRequest request) {
        // Validate input
        if (request.getUsernameOrEmail() == null || request.getUsernameOrEmail().trim().isEmpty()) {
            throw new BadRequestException("Username or email is required");
        }

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new BadRequestException("Password is required");
        }

        // Find user by username or email
        User user = userRepository.findByUsernameOrEmail(
            request.getUsernameOrEmail(),
            request.getUsernameOrEmail()
        ).orElseThrow(() -> new BadRequestException("Invalid username/email or password"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid username/email or password");
        }

        // Check if user is active
        if (!user.isEnabled()) {
            throw new BadRequestException("Account is disabled");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getUsername());
        long expiresIn = jwtTokenProvider.getExpirationTime();

        return AuthResponse.builder()
            .token(token)
            .user(UserDto.from(user))
            .expiresIn(expiresIn)
            .build();
    }
}
```

### **5. DTO Classes:**
```java
// dto/request/LoginRequest.java
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginRequest {
    @NotBlank(message = "Username or email is required")
    @Size(min = 3, max = 50, message = "Username or email must be between 3 and 50 characters")
    private String usernameOrEmail;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    // Default constructor
    public LoginRequest() {}

    // Constructor with parameters
    public LoginRequest(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }

    // Getters and Setters
    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

// dto/response/AuthResponse.java
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {
    @JsonProperty("token")
    private String token;

    @JsonProperty("user")
    private UserDto user;

    @JsonProperty("expiresIn")
    private long expiresIn;

    // Static builder method
    public static Builder builder() {
        return new Builder();
    }

    // Builder pattern
    public static class Builder {
        private String token;
        private UserDto user;
        private long expiresIn;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder user(UserDto user) {
            this.user = user;
            return this;
        }

        public Builder expiresIn(long expiresIn) {
            this.expiresIn = expiresIn;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(token, user, expiresIn);
        }
    }

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String token, UserDto user, long expiresIn) {
        this.token = token;
        this.user = user;
        this.expiresIn = expiresIn;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }
}

// dto/UserDto.java (Helper DTO)
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;

    public static UserDto from(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        return dto;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
```

### **6. Frontend Login Template:**
```html
<!-- features/auth/login/login.component.html -->
<div class="login-container">
  <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
    <h2>Đăng nhập Coconut Music</h2>

    <!-- Username/Email Field -->
    <div class="form-group">
      <label for="usernameOrEmail">Username hoặc Email:</label>
      <input
        id="usernameOrEmail"
        type="text"
        formControlName="usernameOrEmail"
        class="form-control"
        [class.is-invalid]="usernameOrEmail?.invalid && usernameOrEmail?.touched"
        placeholder="Nhập username hoặc email">

      <!-- Validation Messages -->
      <div *ngIf="usernameOrEmail?.invalid && usernameOrEmail?.touched" class="invalid-feedback">
        <small *ngIf="usernameOrEmail?.errors?.['required']">
          Username hoặc email là bắt buộc
        </small>
        <small *ngIf="usernameOrEmail?.errors?.['minlength']">
          Username hoặc email phải có ít nhất 3 ký tự
        </small>
      </div>
    </div>

    <!-- Password Field -->
    <div class="form-group">
      <label for="password">Mật khẩu:</label>
      <input
        id="password"
        type="password"
        formControlName="password"
        class="form-control"
        [class.is-invalid]="password?.invalid && password?.touched"
        placeholder="Nhập mật khẩu">

      <!-- Validation Messages -->
      <div *ngIf="password?.invalid && password?.touched" class="invalid-feedback">
        <small *ngIf="password?.errors?.['required']">
          Mật khẩu là bắt buộc
        </small>
        <small *ngIf="password?.errors?.['minlength']">
          Mật khẩu phải có ít nhất 6 ký tự
        </small>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="btn btn-primary btn-block"
      [disabled]="loginForm.invalid">
      Đăng nhập
    </button>

    <!-- Register Link -->
    <div class="text-center mt-3">
      <a routerLink="/auth/register">Chưa có tài khoản? Đăng ký ngay</a>
    </div>
  </form>
</div>
```

### **7. Backend Validation & Error Handling:**
```java
// controller/AuthController.java
@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        }
    }
}

// exception/GlobalExceptionHandler.java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
        MethodArgumentNotValidException ex) {

        Map<String, Object> errors = new HashMap<>();
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        });

        errors.put("success", false);
        errors.put("message", "Validation failed");
        errors.put("errors", fieldErrors);

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse> handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.badRequest()
            .body(new ApiResponse(false, ex.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiResponse(false, ex.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse> handleUnauthorizedException(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse(false, ex.getMessage()));
    }
}
```

---

## 🛠️ **Chi tiết kỹ thuật từng layer:**

### **Frontend Layers:**
- **Presentation Layer**: Components (*.component.ts) - UI logic
- **Business Layer**: Services (*.service.ts) - API calls, data processing
- **Data Layer**: Models (*.model.ts) - TypeScript interfaces

### **Backend Layers:**
- **Presentation Layer**: Controllers - REST API endpoints
- **Business Layer**: Services - Business logic, validation
- **Data Access Layer**: Repositories - Database operations
- **Data Layer**: Entities - Database table mapping

---

## 📋 **Quy ước đặt tên:**

### **Frontend:**
- **Components**: `kebab-case` (login.component.ts)
- **Services**: `camelCase` (authService)
- **Models**: `PascalCase` (UserModel)
- **Files**: `kebab-case.type.ts`

### **Backend:**
- **Classes**: `PascalCase` (UserController)
- **Methods**: `camelCase` (getUserById)
- **Packages**: `lowercase` (com.coconutmusic.service)
- **Files**: `PascalCase.java`

---

## 🚀 **Cách chạy và phát triển:**

### **Frontend (Angular):**
```bash
cd frontend/
npm install
ng serve                 # Chạy dev server
ng build                 # Build production
ng test                  # Chạy unit tests
```

### **Backend (Spring Boot):**
```bash
cd backend/
mvn clean install        # Build project
mvn spring-boot:run      # Chạy server
mvn test                 # Chạy tests
```

### **Database:**
```bash
# Import sample data
mysql -u root -p coconut_music < database/coconut_music.sql
```

Cấu trúc này đảm bảo code dễ đọc, dễ maintain và tuân theo best practices của Angular và Spring Boot!
