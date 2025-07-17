# KẾ HOẠCH XÂY DỰNG HỆ THỐNG COCONUT MUSIC
## Angular Frontend + Spring Boot Backend + MySQL Database

---

## I. PHÂN TÍCH DỰ ÁN HIỆN TẠI

### 1. Mô hình dữ liệu hiện tại (MongoDB)
- **User**: username, email, password, isVerified, isAdmin
- **Music**: name_music, category, time_format, name_singer, type, src_music, image_music
- **Favorite**: user_id, song_id
- **History**: user_id, song_id
- **Playlist**: user_id, playlist_name, isPublic
- **Banner**: banner_title, image_src, active

### 2. Chức năng hiện tại
#### Frontend (User):
- Nghe nhạc online với player tích hợp
- Tìm kiếm bài hát
- Quản lý danh sách yêu thích
- Lịch sử nghe nhạc
- Tạo và quản lý playlist cá nhân
- Tải nhạc từ YouTube
- Đăng nhập/Đăng ký
- Giao diện responsive (dark/light mode)

#### Backend API hiện tại:
- Authentication (login, signup, logout)
- Music management (upload, search, categories)
- User favorites and history
- Playlist management
- YouTube integration
- Admin functions

---

## II. THIẾT KẾ CSDL MYSQL

### 1. Bảng Users
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

### 2. Bảng Categories
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

### 3. Bảng Artists
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

### 4. Bảng Music
```sql
CREATE TABLE music (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(300) NOT NULL,
    duration_seconds INT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    image_url VARCHAR(500),
    category_id BIGINT,
    artist_id BIGINT,
    type_music ENUM('new-music', 'trending', 'top-view', 'vn-lofi', 'favorite') DEFAULT 'new-music',
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

### 5. Bảng Playlists
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

### 6. Bảng Playlist_Music (Many-to-Many)
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

### 7. Bảng Favorites
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

### 8. Bảng History
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

### 9. Bảng Banners
```sql
CREATE TABLE banners (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    link_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 10. Indexes để tối ưu hiệu suất
```sql
-- Indexes cho tìm kiếm
CREATE INDEX idx_music_title ON music(title);
CREATE INDEX idx_music_type ON music(type_music);
CREATE INDEX idx_music_category ON music(category_id);
CREATE INDEX idx_music_artist ON music(artist_id);
CREATE INDEX idx_music_active ON music(is_active);

-- Indexes cho user activities
CREATE INDEX idx_history_user_played ON history(user_id, played_at DESC);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_playlists_user ON playlists(user_id);

-- Index cho banners
CREATE INDEX idx_banners_active_sort ON banners(is_active, sort_order);
```

---

## III. BACKEND - SPRING BOOT

### 1. Cấu trúc project
```
src/main/java/com/coconutmusic/
├── CoconutMusicApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   ├── WebConfig.java
│   └── DatabaseConfig.java
├── controller/
│   ├── AuthController.java
│   ├── MusicController.java
│   ├── UserController.java
│   ├── PlaylistController.java
│   ├── CategoryController.java
│   ├── ArtistController.java
│   ├── BannerController.java
│   └── AdminController.java
├── dto/
│   ├── request/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── MusicUploadRequest.java
│   │   ├── PlaylistRequest.java
│   │   └── CategoryRequest.java
│   └── response/
│       ├── AuthResponse.java
│       ├── MusicResponse.java
│       ├── UserResponse.java
│       └── ApiResponse.java
├── entity/
│   ├── User.java
│   ├── Music.java
│   ├── Category.java
│   ├── Artist.java
│   ├── Playlist.java
│   ├── PlaylistMusic.java
│   ├── Favorite.java
│   ├── History.java
│   └── Banner.java
├── repository/
│   ├── UserRepository.java
│   ├── MusicRepository.java
│   ├── CategoryRepository.java
│   ├── ArtistRepository.java
│   ├── PlaylistRepository.java
│   ├── FavoriteRepository.java
│   ├── HistoryRepository.java
│   └── BannerRepository.java
├── service/
│   ├── AuthService.java
│   ├── MusicService.java
│   ├── UserService.java
│   ├── PlaylistService.java
│   ├── CategoryService.java
│   ├── ArtistService.java
│   ├── FileStorageService.java
│   ├── YoutubeService.java
│   └── EmailService.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── UserPrincipal.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   └── UnauthorizedException.java
└── util/
    ├── FileUtil.java
    ├── ValidationUtil.java
    └── DateUtil.java
```

### 2. Dependencies (pom.xml)
```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>

    <!-- Database -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
    </dependency>

    <!-- File Upload -->
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.4</version>
    </dependency>

    <!-- YouTube API -->
    <dependency>
        <groupId>com.github.kiulian</groupId>
        <artifactId>java-youtube-downloader</artifactId>
        <version>3.0.3</version>
    </dependency>

    <!-- Cloud Storage (AWS S3 hoặc Firebase) -->
    <dependency>
        <groupId>com.amazonaws</groupId>
        <artifactId>aws-java-sdk-s3</artifactId>
        <version>1.12.261</version>
    </dependency>

    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 3. Main API Endpoints

#### Authentication APIs
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu

#### Music APIs
- `GET /api/music` - Danh sách nhạc (có phân trang, filter)
- `GET /api/music/{id}` - Chi tiết bài hát
- `POST /api/music` - Upload nhạc (Admin)
- `PUT /api/music/{id}` - Cập nhật thông tin nhạc (Admin)
- `DELETE /api/music/{id}` - Xóa nhạc (Admin)
- `GET /api/music/search` - Tìm kiếm nhạc
- `GET /api/music/trending` - Nhạc trending
- `GET /api/music/new` - Nhạc mới
- `GET /api/music/top-view` - Nhạc nghe nhiều
- `POST /api/music/play/{id}` - Tăng lượt nghe

#### User APIs
- `GET /api/user/profile` - Thông tin user
- `PUT /api/user/profile` - Cập nhật profile
- `GET /api/user/favorites` - Danh sách yêu thích
- `POST /api/user/favorites/{musicId}` - Thêm vào yêu thích
- `DELETE /api/user/favorites/{musicId}` - Xóa khỏi yêu thích
- `GET /api/user/history` - Lịch sử nghe
- `POST /api/user/history` - Thêm lịch sử nghe

#### Playlist APIs
- `GET /api/playlists` - Danh sách playlist của user
- `POST /api/playlists` - Tạo playlist mới
- `PUT /api/playlists/{id}` - Cập nhật playlist
- `DELETE /api/playlists/{id}` - Xóa playlist
- `POST /api/playlists/{id}/music/{musicId}` - Thêm nhạc vào playlist
- `DELETE /api/playlists/{id}/music/{musicId}` - Xóa nhạc khỏi playlist

#### Admin APIs
- `GET /api/admin/users` - Quản lý users
- `GET /api/admin/music` - Quản lý nhạc
- `GET /api/admin/categories` - Quản lý thể loại
- `GET /api/admin/artists` - Quản lý nghệ sĩ
- `GET /api/admin/banners` - Quản lý banners
- `GET /api/admin/statistics` - Thống kê hệ thống

---

## IV. FRONTEND - ANGULAR

### 1. Cấu trúc project Angular
```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── music.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── playlist.service.ts
│   │   │   └── admin.service.ts
│   │   └── models/
│   │       ├── user.model.ts
│   │       ├── music.model.ts
│   │       ├── playlist.model.ts
│   │       └── api-response.model.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── player/
│   │   │   ├── music-card/
│   │   │   ├── loading/
│   │   │   └── pagination/
│   │   ├── pipes/
│   │   │   ├── duration.pipe.ts
│   │   │   └── search-filter.pipe.ts
│   │   └── directives/
│   │       └── lazy-load.directive.ts
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── home/
│   │   ├── music/
│   │   │   ├── music-list/
│   │   │   ├── music-detail/
│   │   │   └── search/
│   │   ├── playlist/
│   │   │   ├── playlist-list/
│   │   │   ├── playlist-detail/
│   │   │   └── create-playlist/
│   │   ├── user/
│   │   │   ├── profile/
│   │   │   ├── favorites/
│   │   │   └── history/
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── user-management/
│   │       ├── music-management/
│   │       ├── category-management/
│   │       └── banner-management/
│   ├── layout/
│   │   ├── main-layout/
│   │   └── admin-layout/
│   └── app-routing.module.ts
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

### 2. Dependencies chính (package.json)
```json
{
  "dependencies": {
    "@angular/animations": "^16.0.0",
    "@angular/common": "^16.0.0",
    "@angular/compiler": "^16.0.0",
    "@angular/core": "^16.0.0",
    "@angular/forms": "^16.0.0",
    "@angular/platform-browser": "^16.0.0",
    "@angular/platform-browser-dynamic": "^16.0.0",
    "@angular/router": "^16.0.0",
    "@angular/material": "^16.0.0",
    "@angular/cdk": "^16.0.0",
    "ngx-audio-player": "^17.0.0",
    "ngx-toastr": "^17.0.0",
    "ngx-spinner": "^16.0.0",
    "ngx-pagination": "^6.0.3",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0"
  }
}
```

### 3. Các module chính

#### SharedModule
```typescript
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PlayerComponent,
    MusicCardComponent,
    LoadingComponent,
    PaginationComponent,
    DurationPipe,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PlayerComponent,
    MusicCardComponent,
    LoadingComponent,
    PaginationComponent,
    DurationPipe,
    SearchFilterPipe,
    MaterialModule
  ]
})
export class SharedModule { }
```

#### CoreModule
```typescript
@NgModule({
  providers: [
    AuthService,
    MusicService,
    UserService,
    PlaylistService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
```

### 4. State Management với RxJS
```typescript
// music.service.ts
@Injectable()
export class MusicService {
  private currentTrackSubject = new BehaviorSubject<Music | null>(null);
  private playlistSubject = new BehaviorSubject<Music[]>([]);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);

  currentTrack$ = this.currentTrackSubject.asObservable();
  playlist$ = this.playlistSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();

  // Methods để quản lý nhạc
  playMusic(music: Music) { }
  pauseMusic() { }
  nextTrack() { }
  previousTrack() { }
  addToPlaylist(music: Music) { }
}
```

---

## V. TÍNH NĂNG NÂNG CAO

### 1. Admin Panel
#### Dashboard
- Thống kê tổng quan (users, songs, plays)
- Biểu đồ thống kê theo thời gian
- Top bài hát/nghệ sĩ được nghe nhiều

#### Quản lý User
- Danh sách users với phân trang
- Tìm kiếm, filter users
- Khóa/mở khóa tài khoản
- Phân quyền admin

#### Quản lý Nhạc
- Upload multiple files
- Bulk edit thông tin nhạc
- Quản lý thể loại nhạc
- Quản lý nghệ sĩ
- Preview trước khi publish

#### Quản lý Banner
- Upload/edit banners
- Sắp xếp thứ tự hiển thị
- Bật/tắt banner

### 2. Player nâng cao
- Equalizer
- Repeat modes (off, one, all)
- Shuffle
- Volume control
- Seek timeline
- Mini player
- Keyboard shortcuts
- Crossfade between tracks

### 3. Social Features
- Share playlist
- Follow users
- Comment và rate nhạc
- Recent activity feed

### 4. Search nâng cao
- Auto-complete
- Search by lyrics
- Voice search
- Filter by genre, artist, duration
- Search history

### 5. Responsive Design
- Mobile-first approach
- PWA support
- Offline capabilities
- Touch gestures

---

## VI. TRIỂN KHAI VÀ DEVOPS

### 1. Database Setup
```sql
-- Script tạo database
CREATE DATABASE coconut_music CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tạo user cho ứng dụng
CREATE USER 'coconut_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON coconut_music.* TO 'coconut_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/coconut_music
spring.datasource.username=coconut_user
spring.datasource.password=strong_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# File Upload Configuration
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB

# CORS Configuration
app.cors.allowed-origins=http://localhost:4200
```

### 3. Deployment Structure
```
nginx (Reverse Proxy)
├── Frontend (Angular) - Port 80/443
└── Backend (Spring Boot) - Port 8080

MySQL Database - Port 3306
File Storage (AWS S3 / Local Storage)
```

### 4. Docker Setup
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/coconut-music-backend.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Frontend Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

---

## VII. TIMELINE PHÁT TRIỂN

### Phase 1 (2-3 tuần): Setup & Core Backend
- Setup Spring Boot project
- Thiết kế và tạo database
- Implement Authentication APIs
- Basic Music APIs
- Basic User APIs

### Phase 2 (2-3 tuần): Core Frontend
- Setup Angular project
- Implement Authentication UI
- Music listing và player cơ bản
- User dashboard
- Responsive layout

### Phase 3 (2 tuần): Advanced Features
- Playlist management
- Search functionality
- File upload
- YouTube integration

### Phase 4 (2 tuần): Admin Panel
- Admin authentication
- User management
- Music management
- Category management
- Banner management

### Phase 5 (1-2 tuần): UI/UX Enhancement
- Advanced player features
- Animation và transitions
- Mobile optimization
- Dark/Light theme

### Phase 6 (1 tuần): Testing & Deployment
- Unit testing
- Integration testing
- Performance optimization
- Production deployment

---

## VIII. SECURITY CONSIDERATIONS

### 1. Backend Security
- JWT token với refresh mechanism
- Password encryption với BCrypt
- Input validation và sanitization
- CORS configuration
- Rate limiting
- SQL injection prevention
- File upload validation

### 2. Frontend Security
- XSS prevention
- CSRF protection
- Secure token storage
- Input validation
- Route guards
- Environment variables protection

---

## IX. PERFORMANCE OPTIMIZATION

### 1. Database
- Proper indexing
- Query optimization
- Connection pooling
- Caching frequently accessed data

### 2. Backend
- Pagination cho large datasets
- Async processing
- File compression
- CDN cho static files

### 3. Frontend
- Lazy loading modules
- OnPush change detection
- Virtual scrolling
- Image optimization
- Bundle size optimization

---

## X. TESTING STRATEGY

### 1. Backend Testing
- Unit tests với JUnit
- Integration tests
- API testing với Postman/Newman
- Load testing

### 2. Frontend Testing
- Unit tests với Jasmine/Karma
- Component testing
- E2E testing với Cypress
- Accessibility testing

---

Đây là kế hoạch chi tiết để xây dựng lại hệ thống Coconut Music với Angular và Spring Boot. Bạn có thể bắt đầu từ Phase 1 và triển khai từng phase một cách tuần tự để đảm bảo chất lượng và tiến độ của dự án.
