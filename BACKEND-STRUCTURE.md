# Cây Thư Mục Backend - Coconut Music

## Cấu trúc thư mục backend Spring Boot 3.2.0

```
backend/
├── .mvn/                             # Maven wrapper files
├── mvnw.cmd                          # Maven wrapper script for Windows
├── package-lock.json                 # NPM lock file (if any)
├── pom.xml                           # Maven project configuration
├── uploads/                          # User uploaded files
│   └── playlist-images/              # Uploaded playlist cover images
│
├── src/                              # Source code chính
│   └── main/                         # Main application source
│       ├── java/                     # Java source code
│       │   └── com/
│       │       └── coconutmusic/     # Main package
│       │           ├── CoconutMusicApplication.java  # Spring Boot main class
│       │           │
│       │           ├── config/       # Configuration classes
│       │           │   ├── DataSeeder.java           # Database seeding
│       │           │   ├── JacksonConfig.java        # JSON serialization config
│       │           │   ├── SampleMusic.java          # Sample music data model
│       │           │   ├── SampleMusicResponse.java  # Sample music response
│       │           │   ├── SecurityConfig.java       # Spring Security configuration
│       │           │   ├── StaticResourceConfig.java # Static resource handling
│       │           │   └── WebMvcConfig.java         # Web MVC configuration
│       │           │
│       │           ├── controller/   # REST API Controllers
│       │           │   ├── AdminArtistController.java    # Admin artist management
│       │           │   ├── AdminCategoryController.java  # Admin category management
│       │           │   ├── AdminController.java          # General admin operations
│       │           │   ├── AdminMusicController.java     # Admin music management
│       │           │   ├── AdminPlaylistController.java  # Admin playlist management
│       │           │   ├── AdminUserController.java      # Admin user management
│       │           │   ├── AuthController.java           # Authentication endpoints
│       │           │   ├── CategoryController.java       # Category public endpoints
│       │           │   ├── MusicController.java          # Music public endpoints
│       │           │   ├── PlaylistController.java       # Playlist user endpoints
│       │           │   ├── UserController.java           # User profile endpoints
│       │           │   └── UserMusicController.java      # User music operations
│       │           │
│       │           ├── dto/           # Data Transfer Objects
│       │           │   ├── ArtistSimpleDto.java          # Simple artist data
│       │           │   ├── CategorySimpleDto.java        # Simple category data
│       │           │   ├── MusicResponseDto.java         # Music response format
│       │           │   ├── MyListDTO.java                # User's music list
│       │           │   ├── PlaylistCreateRequest.java    # Playlist creation request
│       │           │   ├── PlaylistDTO.java              # Playlist data transfer
│       │           │   ├── RecentlyPlayedDTO.java        # Recently played music
│       │           │   ├── RecentlyPlayedRequest.java    # Recently played request
│       │           │   ├── SampleMusicData.java          # Sample music data
│       │           │   │
│       │           │   ├── request/   # Request DTOs
│       │           │   │   ├── AddToFavoritesRequest.java     # Add to favorites
│       │           │   │   ├── AddToMyListRequest.java        # Add to my list
│       │           │   │   ├── AddToRecentlyPlayedRequest.java # Add to history
│       │           │   │   ├── ArtistCreateRequest.java       # Create artist
│       │           │   │   ├── ArtistUpdateRequest.java       # Update artist
│       │           │   │   ├── CategoryCreateRequest.java     # Create category
│       │           │   │   ├── CategoryUpdateRequest.java     # Update category
│       │           │   │   ├── LoginRequest.java             # User login
│       │           │   │   ├── MusicCreateRequest.java       # Create music
│       │           │   │   ├── MusicUpdateRequest.java       # Update music
│       │           │   │   ├── RegisterRequest.java          # User registration
│       │           │   │   ├── UserCreateRequest.java        # Create user (admin)
│       │           │   │   └── UserUpdateRequest.java        # Update user
│       │           │   │
│       │           │   └── response/  # Response DTOs
│       │           │       ├── ApiResponse.java              # Generic API response
│       │           │       └── AuthResponse.java             # Authentication response
│       │           │
│       │           ├── entity/        # JPA Entities (Database models)
│       │           │   ├── Artist.java            # Artist entity
│       │           │   ├── Banner.java            # Banner/Advertisement entity
│       │           │   ├── Category.java          # Music category entity
│       │           │   ├── Favorite.java          # User favorite music entity
│       │           │   ├── FavoritePlaylist.java  # User favorite playlist entity
│       │           │   ├── History.java           # Music listening history
│       │           │   ├── Music.java             # Music/Song entity
│       │           │   ├── MusicType.java         # Music type enumeration
│       │           │   ├── MyList.java            # User's personal music list
│       │           │   ├── Playlist.java          # Playlist entity
│       │           │   ├── PlaylistMusic.java     # Playlist-Music mapping
│       │           │   └── User.java              # User account entity
│       │           │
│       │           ├── exception/     # Exception handling
│       │           │   ├── BadRequestException.java        # 400 Bad Request
│       │           │   ├── GlobalExceptionHandler.java     # Global exception handler
│       │           │   ├── ResourceNotFoundException.java  # 404 Not Found
│       │           │   └── UnauthorizedException.java      # 401 Unauthorized
│       │           │
│       │           ├── repository/    # Spring Data JPA Repositories
│       │           │   ├── ArtistRepository.java           # Artist data access
│       │           │   ├── BannerRepository.java           # Banner data access
│       │           │   ├── CategoryRepository.java         # Category data access
│       │           │   ├── FavoritePlaylistRepository.java # Favorite playlist access
│       │           │   ├── FavoriteRepository.java         # Favorite music access
│       │           │   ├── HistoryRepository.java          # Listening history access
│       │           │   ├── MusicRepository.java            # Music data access
│       │           │   ├── MyListRepository.java           # User list access
│       │           │   ├── PlaylistMusicRepository.java    # Playlist-Music mapping
│       │           │   ├── PlaylistRepository.java         # Playlist data access
│       │           │   └── UserRepository.java             # User data access
│       │           │
│       │           ├── security/      # Security components
│       │           │   ├── CustomUserDetailsService.java  # User details service
│       │           │   ├── JwtAuthenticationFilter.java   # JWT filter
│       │           │   ├── JwtTokenProvider.java          # JWT token provider
│       │           │   └── UserPrincipal.java             # User principal
│       │           │
│       │           └── service/       # Business logic services
│       │               ├── AdminArtistService.java        # Admin artist service
│       │               ├── AdminCategoryService.java      # Admin category service
│       │               ├── AdminMusicService.java         # Admin music service
│       │               ├── AdminService.java              # General admin service
│       │               ├── AdminUserService.java          # Admin user service
│       │               ├── AuthService.java               # Authentication service
│       │               ├── CategoryService.java           # Category service
│       │               ├── EmailService.java              # Email notification service
│       │               ├── MusicService.java              # Music service
│       │               ├── PlaylistService.java           # Playlist service
│       │               ├── UserMusicService.java          # User music service
│       │               └── UserService.java               # User profile service
│       │
│       └── resources/                # Application resources
│           ├── application.properties         # Main application config
│           ├── application-mysql.properties   # MySQL specific config
│           │
│           └── static/               # Static resources
│               └── samples/          # Sample data files
│                   ├── favorite_music.json   # Sample favorite music data
│                   ├── new_music.json        # Sample new music data
│                   ├── top_view_music.json   # Sample top viewed music
│                   ├── trending_music.json   # Sample trending music
│                   └── vn_lofi.json          # Sample Vietnamese lofi music
│
└── target/                           # Maven build output (generated)
    ├── classes/                      # Compiled classes
    └── test-classes/                 # Compiled test classes
```

## Mô tả các package chính:

### 📁 **config/** - Cấu hình hệ thống
- **SecurityConfig**: Cấu hình Spring Security, CORS, JWT
- **WebMvcConfig**: Cấu hình Web MVC, file upload, static resources
- **JacksonConfig**: Cấu hình JSON serialization/deserialization
- **DataSeeder**: Khởi tạo dữ liệu mẫu cho database
- **StaticResourceConfig**: Cấu hình serving static files

### 📁 **controller/** - REST API Endpoints
#### Admin Controllers:
- **AdminController**: Dashboard, thống kê hệ thống
- **AdminMusicController**: CRUD operations cho music
- **AdminUserController**: Quản lý tài khoản người dùng
- **AdminCategoryController**: Quản lý thể loại nhạc
- **AdminArtistController**: Quản lý nghệ sĩ
- **AdminPlaylistController**: Quản lý playlist hệ thống

#### Public Controllers:
- **AuthController**: Đăng ký, đăng nhập, xác thực
- **MusicController**: Tìm kiếm, streaming nhạc
- **CategoryController**: Danh sách thể loại công khai
- **PlaylistController**: Quản lý playlist cá nhân
- **UserController**: Profile và cài đặt người dùng
- **UserMusicController**: Favorites, history, my list

### 📁 **dto/** - Data Transfer Objects
#### Request DTOs:
- **Authentication**: LoginRequest, RegisterRequest
- **Music Management**: MusicCreateRequest, MusicUpdateRequest
- **User Operations**: AddToFavoritesRequest, AddToMyListRequest
- **Admin Operations**: CategoryCreateRequest, ArtistCreateRequest

#### Response DTOs:
- **ApiResponse**: Standardized API response format
- **AuthResponse**: JWT token và user info
- **MusicResponseDto**: Formatted music data
- **PlaylistDTO**: Playlist information với music list

### 📁 **entity/** - JPA Database Models
#### Core Entities:
- **User**: Tài khoản người dùng (id, username, email, role)
- **Music**: Bài hát (id, title, artist, filePath, duration)
- **Artist**: Nghệ sĩ (id, name, bio, avatar)
- **Category**: Thể loại nhạc (id, name, description)
- **Playlist**: Danh sách phát (id, name, userId, description)

#### Relationship Entities:
- **PlaylistMusic**: Many-to-many mapping playlist ↔ music
- **Favorite**: User's favorite music list
- **FavoritePlaylist**: User's favorite playlists
- **History**: Music listening history
- **MyList**: User's personal music collection
- **Banner**: Homepage banners/advertisements

### 📁 **repository/** - Data Access Layer
- **Spring Data JPA repositories** cho mỗi entity
- **Custom query methods** sử dụng @Query annotation
- **Pagination support** cho large datasets
- **Native queries** cho complex operations

### 📁 **service/** - Business Logic Layer
#### Core Services:
- **AuthService**: JWT authentication, user registration
- **MusicService**: Music streaming, search, metadata
- **PlaylistService**: Playlist CRUD operations
- **UserService**: User profile management
- **EmailService**: Email notifications

#### Admin Services:
- **AdminService**: Dashboard statistics, system overview
- **AdminMusicService**: Music content management
- **AdminUserService**: User account administration
- **AdminCategoryService**: Category management
- **AdminArtistService**: Artist information management

### 📁 **security/** - Authentication & Authorization
- **JwtTokenProvider**: JWT token generation và validation
- **JwtAuthenticationFilter**: HTTP request filtering
- **CustomUserDetailsService**: Spring Security user loading
- **UserPrincipal**: Authentication principal object

### 📁 **exception/** - Error Handling
- **GlobalExceptionHandler**: Centralized exception handling
- **Custom Exceptions**: Specific business logic exceptions
- **HTTP Status Mapping**: Proper HTTP status codes

## Công nghệ & Dependencies:

### 🚀 **Core Technologies**:
- **Spring Boot 3.2.0**: Main framework
- **Java 17**: Programming language
- **Maven**: Build tool và dependency management

### 🛡️ **Security**:
- **Spring Security**: Authentication & authorization
- **JWT (jsonwebtoken 0.11.5)**: Token-based authentication
- **BCrypt**: Password hashing

### 💾 **Database**:
- **Spring Data JPA**: ORM framework
- **Hibernate**: JPA implementation
- **MySQL Connector**: Database driver
- **H2 Database**: Development/testing database

### 📧 **External Services**:
- **Spring Boot Mail**: Email notifications
- **Commons FileUpload**: File upload handling

### 🔧 **Development Tools**:
- **Jackson**: JSON processing
- **Spring Boot DevTools**: Development utilities
- **Spring Boot Test**: Testing framework

## Kiến trúc Backend:

### 🏗️ **Layered Architecture**:
```
Controller → Service → Repository → Database
     ↓         ↓          ↓
   REST API → Business → Data Access → MySQL
```

### 🔄 **Request Flow**:
```
HTTP Request → Security Filter → Controller → Service → Repository → Database
                    ↓              ↓          ↓           ↓
              JWT Validation → DTO Validation → Business Logic → SQL Query
```

### 🛡️ **Security Flow**:
```
Login Request → AuthController → AuthService → JWT Token → Secure Endpoints
```

### 📊 **Data Flow**:
```
Frontend Request → Controller → DTO → Service → Entity → Repository → Database
Database Result ← DTO Mapping ← Entity ← Service ← Repository Result
```

## Đặc điểm kỹ thuật:

### 🔒 **Security Features**:
- JWT-based stateless authentication
- Role-based access control (USER/ADMIN)
- CORS configuration cho frontend integration
- Password encryption với BCrypt
- Request validation và sanitization

### 📈 **Performance Optimizations**:
- Connection pooling cho database
- Lazy loading cho JPA relationships
- Pagination cho large datasets
- Caching cho frequently accessed data
- File upload với validation

### 🚀 **Scalability Considerations**:
- Stateless architecture với JWT
- Service layer separation
- Repository pattern cho data access
- DTO pattern cho clean API contracts
- Exception handling với proper HTTP status codes

### 🔧 **Development Features**:
- Hot reload với Spring Boot DevTools
- Profile-based configuration (dev/prod)
- Sample data seeding
- Comprehensive error handling
- RESTful API design principles

Kiến trúc backend này đảm bảo tính bảo mật cao, performance tốt, và dễ dàng maintain/extend cho hệ thống music streaming Coconut Music.
