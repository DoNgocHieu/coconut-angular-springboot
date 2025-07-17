# Tài Liệu Dự Án Coconut Music

## Tổng Quan Dự Án

**Coconut Music** là một ứng dụng web nghe nhạc trực tuyến được xây dựng với kiến trúc full-stack hiện đại:
- **Frontend**: Angular 17 với TypeScript
- **Backend**: Spring Boot 3.2.0 với Java 17
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)

## Mục Lục

1. [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
2. [Backend - Spring Boot](#backend---spring-boot)
3. [Frontend - Angular](#frontend---angular)
4. [Database - MySQL](#database---mysql)
5. [API Documentation](#api-documentation)
6. [Chức Năng Hệ Thống](#chức-năng-hệ-thống)
7. [Cài Đặt và Chạy Dự Án](#cài-đặt-và-chạy-dự-án)
8. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)

---

## Kiến Trúc Hệ Thống

### Kiến Trúc Tổng Thể
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    JDBC    ┌─────────────────┐
│   Angular 17    │ ←─────────────────→ │  Spring Boot    │ ←─────────→ │     MySQL       │
│   Frontend      │     (Port 4200)     │   Backend       │             │   Database      │
│                 │                     │  (Port 8080)    │             │  (Port 3306)    │
└─────────────────┘                     └─────────────────┘             └─────────────────┘
```

### Công Nghệ Sử Dụng

#### Frontend
- **Angular 17**: Framework chính
- **TypeScript**: Ngôn ngữ lập trình
- **Angular Material**: UI Components
- **FontAwesome**: Icons
- **RxJS**: Reactive programming
- **Angular Router**: Routing
- **Angular Forms**: Form handling
- **Angular HTTP Client**: API communication
- **Angular Guards**: Route protection
- **Angular Interceptors**: HTTP request/response handling

#### Backend
- **Spring Boot 3.2.0**: Framework chính
- **Java 17**: Ngôn ngữ lập trình
- **Spring Security**: Authentication & Authorization
- **Spring Data JPA**: Data access layer
- **Spring Web**: REST API
- **Spring Mail**: Email service
- **JWT (jsonwebtoken 0.11.5)**: Token-based authentication
- **MySQL Connector**: Database connectivity
- **Jackson**: JSON serialization/deserialization
- **Hibernate**: ORM
- **Maven**: Build tool

#### Database
- **MySQL**: Relational database
- **H2**: In-memory database (development)

---

## Backend - Spring Boot

### Cấu Trúc Package
```
com.coconutmusic/
├── CoconutMusicApplication.java        # Main application class
├── config/                             # Configuration classes
│   ├── SecurityConfig.java            # Spring Security configuration
│   ├── JwtConfig.java                 # JWT configuration
│   └── WebConfig.java                 # Web configuration
├── controller/                         # REST Controllers
│   ├── AuthController.java            # Authentication endpoints
│   ├── MusicController.java           # Music management
│   ├── UserController.java            # User management
│   ├── PlaylistController.java        # Playlist management
│   ├── CategoryController.java        # Category management
│   ├── AdminController.java           # Admin functions
│   └── UserMusicController.java       # User-music interactions
├── dto/                               # Data Transfer Objects
│   ├── request/                       # Request DTOs
│   └── response/                      # Response DTOs
├── entity/                            # JPA Entities
│   ├── User.java                      # User entity
│   ├── Music.java                     # Music entity
│   ├── Category.java                  # Category entity
│   ├── Artist.java                    # Artist entity
│   ├── Playlist.java                  # Playlist entity
│   ├── PlaylistMusic.java             # Playlist-Music relationship
│   ├── Favorite.java                  # User favorites
│   ├── History.java                   # Listening history
│   └── Banner.java                    # Banner/Advertisement
├── repository/                        # Data Access Layer
├── service/                           # Business Logic Layer
├── security/                          # Security components
│   ├── JwtTokenProvider.java          # JWT utility
│   ├── JwtAuthenticationFilter.java   # JWT filter
│   └── UserPrincipal.java            # User details
├── exception/                         # Exception handling
└── util/                             # Utility classes
```

### Core Entities

#### User Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "is_admin")
    private Boolean isAdmin = false;

    // Relationships
    @OneToMany(mappedBy = "user")
    private List<Playlist> playlists;

    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "user")
    private List<History> history;
}
```

#### Music Entity
```java
@Entity
@Table(name = "music")
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_music")
    private MusicType typeMusic = MusicType.NEW_MUSIC;

    @Column(name = "play_count")
    private Long playCount = 0L;

    @Column(name = "like_count")
    private Long likeCount = 0L;
}
```

### Security Configuration

#### JWT Authentication
- **Access Token**: Thời hạn 24 giờ
- **Refresh Token**: Thời hạn 7 ngày
- **Secret Key**: Cấu hình trong application.properties

#### Endpoints Security
- **Public**: `/api/auth/**`, `/api/music/public/**`
- **Authenticated**: `/api/user/**`, `/api/playlists/**`
- **Admin**: `/api/admin/**`

---

## Frontend - Angular

### Cấu Trúc Project
```
src/app/
├── app.component.ts                   # Root component
├── app.routes.ts                      # Routing configuration
├── core/                              # Core functionality
│   ├── guards/                        # Route guards
│   │   ├── auth.guard.ts             # Authentication guard
│   │   └── admin.guard.ts            # Admin guard
│   ├── interceptors/                  # HTTP interceptors
│   │   └── auth.interceptor.ts       # JWT token interceptor
│   ├── models/                        # TypeScript interfaces
│   │   ├── auth.model.ts             # Authentication models
│   │   ├── music.model.ts            # Music models
│   │   ├── playlist.model.ts         # Playlist models
│   │   └── api.model.ts              # API response models
│   └── services/                      # Business services
│       ├── auth.service.ts           # Authentication service
│       ├── music.service.ts          # Music service
│       ├── playlist.service.ts       # Playlist service
│       ├── user-music.service.ts     # User-music interactions
│       └── music-player.service.ts   # Music player service
├── features/                          # Feature modules
│   ├── auth/                         # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verify/
│   ├── home/                         # Homepage
│   ├── music/                        # Music pages
│   │   ├── music-list/
│   │   └── music-detail/
│   ├── playlist/                     # Playlist pages
│   │   ├── playlist-list/
│   │   └── playlist-detail/
│   ├── user/                         # User pages
│   │   ├── profile/
│   │   ├── favorites/
│   │   └── history/
│   ├── admin/                        # Admin pages
│   │   ├── dashboard/
│   │   ├── music-management/
│   │   ├── user-management/
│   │   └── playlist-management/
│   └── category/                     # Category pages
└── shared/                           # Shared components
    └── components/                   # Reusable components
```

### Key Services

#### AuthService
```typescript
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(loginRequest: LoginRequest): Observable<ApiResponse<AuthResponse>>
  register(registerRequest: RegisterRequest): Observable<ApiResponse<any>>
  logout(): Observable<ApiResponse>
  verifyEmail(token: string): Observable<ApiResponse>
  // ... other methods
}
```

#### MusicService
```typescript
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  getAllMusic(page: number, size: number): Observable<ApiResponse<PaginatedResponse<Music>>>
  getMusicByType(type: MusicType, page: number, size: number): Observable<ApiResponse<PaginatedResponse<Music>>>
  getMusicById(id: number): Observable<ApiResponse<Music>>
  searchMusic(query: string): Observable<ApiResponse<Music[]>>
  // ... other methods
}
```

### Routing Configuration
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home.component') },
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component') }
    ]
  },
  { path: 'music', loadComponent: () => import('./features/music/music-list/music-list.component') },
  { path: 'playlists', loadComponent: () => import('./features/playlist/playlist-list/playlist-list.component') },
  { path: 'favorites', loadComponent: () => import('./features/user/favorites/favorites.component') },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard.component') },
      { path: 'music', loadComponent: () => import('./features/admin/music-management/music-management.component') }
    ]
  }
];
```

---

## Database - MySQL

### Cấu Trúc Database

#### 1. Bảng Users
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(500),
    forgot_password_token VARCHAR(255),
    forgot_password_token_expiry DATETIME,
    verify_token VARCHAR(255),
    verify_token_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. Bảng Categories
```sql
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3. Bảng Artists
```sql
CREATE TABLE artists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 4. Bảng Music
```sql
CREATE TABLE music (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(300) NOT NULL,
    duration_seconds INT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    image_url VARCHAR(500),
    category_id BIGINT,
    artist_id BIGINT,
    type_music ENUM('NEW_MUSIC', 'TRENDING', 'TOP_VIEW', 'VN_LOFI', 'FAVORITE') DEFAULT 'NEW_MUSIC',
    play_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    uploaded_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
```

#### 5. Bảng Playlists
```sql
CREATE TABLE playlists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    user_id BIGINT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 6. Bảng Playlist_Music (Many-to-Many)
```sql
CREATE TABLE playlist_music (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    playlist_id BIGINT NOT NULL,
    music_id BIGINT NOT NULL,
    position INT DEFAULT 0,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (music_id) REFERENCES music(id) ON DELETE CASCADE,
    UNIQUE KEY unique_playlist_music (playlist_id, music_id)
);
```

#### 7. Bảng Favorites
```sql
CREATE TABLE favorites (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    music_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (music_id) REFERENCES music(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_music (user_id, music_id)
);
```

#### 8. Bảng History
```sql
CREATE TABLE history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    music_id BIGINT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (music_id) REFERENCES music(id) ON DELETE CASCADE
);
```

---

## API Documentation

### Authentication APIs

#### POST /api/auth/register
Đăng ký tài khoản mới
```json
Request:
{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": null
}
```

#### POST /api/auth/login
Đăng nhập vào hệ thống
```json
Request:
{
  "usernameOrEmail": "string",
  "password": "string"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "string",
    "tokenType": "Bearer",
    "userId": 1,
    "username": "string",
    "email": "string",
    "isVerified": true,
    "isAdmin": false
  }
}
```

#### POST /api/auth/verify
Xác thực email
```json
Request: ?token=verification_token

Response:
{
  "success": true,
  "message": "Email verified successfully. You can now access all features."
}
```

### Music APIs

#### GET /api/music
Lấy danh sách nhạc với phân trang
```json
Request Parameters:
- page: int (default: 0)
- size: int (default: 10)

Response:
{
  "success": true,
  "message": "Music loaded successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Song Title",
        "durationSeconds": 180,
        "fileUrl": "https://example.com/song.mp3",
        "imageUrl": "https://example.com/image.jpg",
        "category": {
          "id": 1,
          "name": "Pop"
        },
        "artist": {
          "id": 1,
          "name": "Artist Name"
        },
        "typeMusic": "NEW_MUSIC",
        "playCount": 1000,
        "likeCount": 50,
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00",
        "updatedAt": "2024-01-01T00:00:00"
      }
    ],
    "totalElements": 100,
    "totalPages": 10,
    "number": 0,
    "size": 10,
    "first": true,
    "last": false
  }
}
```

#### GET /api/music/type/{type}
Lấy nhạc theo loại (NEW_MUSIC, TRENDING, TOP_VIEW, VN_LOFI, FAVORITE)
```json
Request Parameters:
- type: MusicType (NEW_MUSIC, TRENDING, TOP_VIEW, VN_LOFI, FAVORITE)
- page: int (default: 0)
- size: int (default: 10)

Response: Tương tự như GET /api/music
```

#### GET /api/music/search
Tìm kiếm nhạc
```json
Request Parameters:
- query: string (search keyword)
- page: int (default: 0)
- size: int (default: 10)

Response: Tương tự như GET /api/music
```

#### POST /api/music/play/{id}
Tăng lượt nghe cho bài hát
```json
Response:
{
  "success": true,
  "message": "Play count updated successfully"
}
```

### User Music APIs

#### GET /api/user/favorites
Lấy danh sách bài hát yêu thích
```json
Response:
{
  "success": true,
  "message": "Favorites loaded successfully",
  "data": [
    {
      "id": 1,
      "music": {
        "id": 1,
        "title": "Song Title",
        // ... music details
      },
      "createdAt": "2024-01-01T00:00:00"
    }
  ]
}
```

#### POST /api/user/favorites/{musicId}
Thêm bài hát vào danh sách yêu thích
```json
Response:
{
  "success": true,
  "message": "Music added to favorites successfully"
}
```

#### DELETE /api/user/favorites/{musicId}
Xóa bài hát khỏi danh sách yêu thích
```json
Response:
{
  "success": true,
  "message": "Music removed from favorites successfully"
}
```

#### GET /api/user/history
Lấy lịch sử nghe nhạc
```json
Response:
{
  "success": true,
  "message": "History loaded successfully",
  "data": [
    {
      "id": 1,
      "music": {
        "id": 1,
        "title": "Song Title",
        // ... music details
      },
      "playedAt": "2024-01-01T00:00:00"
    }
  ]
}
```

### Playlist APIs

#### GET /api/playlists
Lấy danh sách playlist của user
```json
Response:
{
  "success": true,
  "message": "Playlists loaded successfully",
  "data": [
    {
      "id": 1,
      "name": "My Playlist",
      "description": "My favorite songs",
      "isPublic": false,
      "imageUrl": "https://example.com/playlist.jpg",
      "user": {
        "id": 1,
        "username": "user1"
      },
      "musicCount": 5,
      "createdAt": "2024-01-01T00:00:00",
      "updatedAt": "2024-01-01T00:00:00"
    }
  ]
}
```

#### POST /api/playlists
Tạo playlist mới
```json
Request:
{
  "name": "string",
  "description": "string",
  "isPublic": false
}

Response:
{
  "success": true,
  "message": "Playlist created successfully",
  "data": {
    "id": 1,
    "name": "My Playlist",
    // ... playlist details
  }
}
```

#### GET /api/playlists/{id}
Lấy chi tiết playlist
```json
Response:
{
  "success": true,
  "message": "Playlist loaded successfully",
  "data": {
    "id": 1,
    "name": "My Playlist",
    "description": "My favorite songs",
    "isPublic": false,
    "imageUrl": "https://example.com/playlist.jpg",
    "user": {
      "id": 1,
      "username": "user1"
    },
    "playlistMusic": [
      {
        "id": 1,
        "music": {
          "id": 1,
          "title": "Song Title",
          // ... music details
        },
        "position": 0,
        "addedAt": "2024-01-01T00:00:00"
      }
    ],
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### POST /api/playlists/{playlistId}/music/{musicId}
Thêm nhạc vào playlist
```json
Response:
{
  "success": true,
  "message": "Music added to playlist successfully"
}
```

#### DELETE /api/playlists/{playlistId}/music/{musicId}
Xóa nhạc khỏi playlist
```json
Response:
{
  "success": true,
  "message": "Music removed from playlist successfully"
}
```

---

## Chức Năng Hệ Thống

### Chức Năng Người Dùng

#### 1. Authentication & Authorization
- **Đăng ký tài khoản**: Email verification required
- **Đăng nhập/Đăng xuất**: JWT-based authentication
- **Quên mật khẩu**: Email-based password reset
- **Profile management**: Update user information

#### 2. Music Features
- **Nghe nhạc trực tuyến**: HTML5 audio player
- **Tìm kiếm nhạc**: Search by title, artist, category
- **Phân loại nhạc**: New Music, Trending, Top View, VN LoFi
- **Lịch sử nghe**: Track listening history
- **Yêu thích**: Add/remove favorites

#### 3. Playlist Management
- **Tạo playlist**: Private/public playlists
- **Quản lý playlist**: Add/remove songs, reorder
- **Chia sẻ playlist**: Public playlists visible to all users

#### 4. Music Player
- **Play/Pause**: Basic playback controls
- **Volume control**: Adjust playback volume
- **Progress tracking**: Seek to specific time
- **Auto-play**: Continue to next song
- **Repeat/Shuffle**: Playback modes

### Chức Năng Admin

#### 1. User Management
- **Quản lý người dùng**: View, activate/deactivate users
- **Thống kê người dùng**: User registration trends

#### 2. Music Management
- **Upload nhạc**: Add new songs with metadata
- **Quản lý nhạc**: Edit, delete, categorize music
- **Quản lý category**: Create, edit categories
- **Quản lý artist**: Add, edit artist information

#### 3. System Management
- **Thống kê hệ thống**: Music plays, user activity
- **Banner management**: Homepage banners

---

## Cài Đặt và Chạy Dự Án

### Yêu Cầu Hệ Thống
- **Java 17** or higher
- **Node.js 18** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Angular CLI 17** or higher

### Cài Đặt Database

1. **Tạo database MySQL:**
```sql
CREATE DATABASE coconut_music;
```

2. **Import dữ liệu mẫu:**
```bash
mysql -u root -p coconut_music < database/coconut_music.sql
```

3. **Cấu hình kết nối database** trong `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/coconut_music
spring.datasource.username=root
spring.datasource.password=your_password
```

### Chạy Backend

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies and run:**
```bash
./mvnw spring-boot:run
```
hoặc sử dụng file batch:
```bash
start-backend.bat
```

Backend sẽ chạy tại: `http://localhost:8080`

### Chạy Frontend

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
ng serve
```
hoặc sử dụng file batch:
```bash
start-frontend.bat
```

Frontend sẽ chạy tại: `http://localhost:4200`

### Chạy Toàn Bộ Hệ Thống

Sử dụng file batch để chạy cả frontend và backend:
```bash
start-all.bat
```

### Cấu Hình Environment

#### Backend Configuration (application.properties)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/coconut_music
spring.datasource.username=root
spring.datasource.password=

# JWT
app.jwt.secret=mySecretKey123456789012345678901234567890
app.jwt.expiration=86400000

# File Upload
spring.servlet.multipart.max-file-size=50MB
app.file.upload-dir=./uploads/music

# CORS
app.cors.allowed-origins=http://localhost:4200

# Email
spring.mail.host=smtp.gmail.com
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

#### Frontend Configuration (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Coconut Music',
  version: '1.0.0'
};
```

---

## Cấu Trúc Thư Mục

### Root Directory
```
coconut-angular-springboot/
├── backend/                    # Spring Boot backend
├── frontend/                   # Angular frontend
├── database/                   # Database scripts
├── PLAN.md                    # Development plan
├── DOCUMENTATION.md           # This documentation
├── start-all.bat             # Start all services
├── start-backend.bat         # Start backend only
└── start-frontend.bat        # Start frontend only
```

### Backend Structure
```
backend/
├── src/main/java/com/coconutmusic/
│   ├── CoconutMusicApplication.java
│   ├── config/               # Configuration classes
│   ├── controller/           # REST controllers
│   ├── dto/                  # Data transfer objects
│   ├── entity/               # JPA entities
│   ├── repository/           # Data repositories
│   ├── service/              # Business logic
│   ├── security/             # Security components
│   ├── exception/            # Exception handling
│   └── util/                 # Utility classes
├── src/main/resources/
│   ├── application.properties
│   ├── application-mysql.properties
│   └── static/samples/       # Sample data
├── uploads/                  # File uploads
├── target/                   # Build output
├── pom.xml                   # Maven configuration
└── mvnw.cmd                  # Maven wrapper
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── core/             # Core functionality
│   │   │   ├── guards/       # Route guards
│   │   │   ├── interceptors/ # HTTP interceptors
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── services/     # Angular services
│   │   ├── features/         # Feature modules
│   │   │   ├── auth/         # Authentication
│   │   │   ├── home/         # Homepage
│   │   │   ├── music/        # Music features
│   │   │   ├── playlist/     # Playlist features
│   │   │   ├── user/         # User features
│   │   │   ├── admin/        # Admin features
│   │   │   └── category/     # Category features
│   │   └── shared/           # Shared components
│   ├── assets/               # Static assets
│   ├── environments/         # Environment configs
│   └── styles/               # Global styles
├── angular.json              # Angular configuration
├── package.json              # NPM dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Frontend documentation
```

### Database Structure
```
database/
├── coconut_music.sql         # Main database dump
├── fix_admin_permissions.sql # Admin permission fixes
├── restore_sample_data.sql   # Sample data restore
└── README.md                 # Database documentation
```

---

## Tính Năng Nổi Bật

### 1. Responsive Design
- Giao diện thân thiện trên mọi thiết bị
- Dark/Light mode support
- Mobile-first approach

### 2. Real-time Music Player
- HTML5 audio player
- Background playback
- Queue management
- Crossfade support

### 3. Advanced Search
- Full-text search
- Filter by category, artist
- Search history
- Autocomplete suggestions

### 4. User Experience
- Smooth page transitions
- Loading states
- Error handling
- Offline support

### 5. Security
- JWT authentication
- Password encryption
- CORS protection
- Input validation
- SQL injection prevention

### 6. Performance
- Lazy loading components
- Image optimization
- API caching
- Database indexing
- Pagination

---

## Kế Hoạch Phát Triển

### Phase 1: Core Features (Completed)
- ✅ User authentication
- ✅ Music playback
- ✅ Playlist management
- ✅ Favorites system
- ✅ Admin panel

### Phase 2: Enhanced Features (In Progress)
- 🔄 Social features (follow users)
- 🔄 Music recommendations
- 🔄 Advanced analytics
- 🔄 Mobile app

### Phase 3: Advanced Features (Planned)
- 📋 Real-time chat
- 📋 Live streaming
- 📋 Music collaboration
- 📋 AI-powered recommendations

---

## Liên Hệ và Hỗ Trợ

### Development Team
- **Project Lead**: [Tên Lead Developer]
- **Backend Developer**: [Tên Backend Developer]
- **Frontend Developer**: [Tên Frontend Developer]
- **Database Administrator**: [Tên DBA]

### Support Channels
- **Email**: support@coconutmusic.com
- **GitHub Issues**: [Repository URL]/issues
- **Documentation**: [Documentation URL]

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Tài liệu này được cập nhật lần cuối: July 14, 2025*
