# Cây Thư Mục Frontend - Coconut Music

## Cấu trúc thư mục frontend Angular 17

```
frontend/
├── .editorconfig                     # Cấu hình editor cho consistency
├── .gitignore                        # Ignore files cho Git
├── .vscode/                          # VS Code workspace settings
├── angular.json                      # Cấu hình Angular CLI
├── package.json                      # Dependencies và scripts
├── package-lock.json                 # Lock file cho npm
├── README.md                         # Hướng dẫn frontend
├── server.ts                         # Server-side rendering setup
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.app.json                 # App-specific TypeScript config
├── tsconfig.spec.json                # Test TypeScript config
│
└── src/                              # Source code chính
    ├── favicon.ico                   # Icon của ứng dụng
    ├── index.html                    # Entry HTML file
    ├── main.ts                       # Entry point của ứng dụng
    ├── main.server.ts                # Server-side entry point
    ├── styles.scss                   # Global styles
    │
    ├── app/                          # Angular application
    │   ├── app.component.html        # Root component template
    │   ├── app.component.scss        # Root component styles
    │   ├── app.component.spec.ts     # Root component tests
    │   ├── app.component.ts          # Root component logic
    │   ├── app.config.ts             # Application configuration
    │   ├── app.config.server.ts      # Server configuration
    │   ├── app.routes.ts             # Application routing
    │   ├── test-modal.component.ts   # Test modal component
    │   │
    │   ├── core/                     # Core module (Singleton services, guards)
    │   │   ├── config/               # Cấu hình ứng dụng
    │   │   │   └── firebase.config.ts        # Firebase configuration
    │   │   │
    │   │   ├── guards/               # Route guards
    │   │   │   ├── admin.guard.ts            # Admin authorization guard
    │   │   │   └── auth.guard.ts             # Authentication guard
    │   │   │
    │   │   ├── interceptors/         # HTTP interceptors
    │   │   │   └── auth.interceptor.ts       # JWT token interceptor
    │   │   │
    │   │   ├── models/               # Data models và interfaces
    │   │   │   ├── api.model.ts              # API response models
    │   │   │   ├── auth.model.ts             # Authentication models
    │   │   │   ├── category.model.ts         # Category models
    │   │   │   ├── music.model.ts            # Music/Song models
    │   │   │   └── playlist.model.ts         # Playlist models
    │   │   │
    │   │   └── services/             # Core services
    │   │       ├── admin-artist.service.ts   # Admin artist management
    │   │       ├── admin-category.service.ts # Admin category management
    │   │       ├── admin-music.service.ts    # Admin music management
    │   │       ├── admin-playlist.service.ts # Admin playlist management
    │   │       ├── admin-user.service.ts     # Admin user management
    │   │       ├── admin.service.ts          # General admin services
    │   │       ├── auth.service.ts           # Authentication service
    │   │       ├── category.service.ts       # Category service
    │   │       ├── firebase-storage.service.ts # Firebase storage
    │   │       ├── mock-admin-music.service.ts # Mock data for testing
    │   │       ├── music-player.service.ts   # Music player logic
    │   │       ├── music.service.ts          # Music management
    │   │       ├── playlist.service.ts       # Playlist management
    │   │       ├── sidebar.service.ts        # Sidebar state management
    │   │       └── user-music.service.ts     # User music preferences
    │   │
    │   ├── features/                 # Feature modules
    │   │   ├── admin/                # Admin panel features
    │   │   │   ├── artists/          # Artist management
    │   │   │   ├── categories/       # Category management
    │   │   │   ├── dashboard/        # Admin dashboard
    │   │   │   │   ├── admin-dashboard.component.scss
    │   │   │   │   └── admin-dashboard.component.ts
    │   │   │   ├── music/            # Music management
    │   │   │   │   ├── admin-music.component.scss
    │   │   │   │   └── admin-music.component.ts
    │   │   │   ├── playlists/        # Playlist management
    │   │   │   └── users/            # User management
    │   │   │
    │   │   ├── auth/                 # Authentication features
    │   │   │   ├── login/            # Login page
    │   │   │   │   ├── login.component.html
    │   │   │   │   ├── login.component.scss
    │   │   │   │   └── login.component.ts
    │   │   │   ├── register/         # Registration page
    │   │   │   └── verify/           # Email verification
    │   │   │
    │   │   ├── category/             # Category features
    │   │   ├── home/                 # Home page features
    │   │   ├── music/                # Music features
    │   │   ├── playlist/             # Playlist features
    │   │   └── user/                 # User profile features
    │   │
    │   └── shared/                   # Shared components và utilities
    │       └── components/           # Reusable components
    │           ├── admin-layout/     # Admin layout wrapper
    │           ├── header/           # Header component
    │           │   ├── header.component.scss
    │           │   └── header.component.ts
    │           ├── music-player/     # Music player component
    │           └── sidebar/          # Sidebar navigation
    │
    ├── assets/                       # Static assets
    │   └── .gitkeep                  # Keep empty folder in Git
    │
    ├── environments/                 # Environment configurations
    │   ├── environment.ts            # Development environment
    │   └── environment.prod.ts       # Production environment
    │
    └── styles/                       # Global style files
        ├── admin-modal-force.scss    # Admin modal styling
        ├── admin-shared.scss         # Shared admin styles
        ├── admin-theme.scss          # Admin theme
        └── theme.scss                # Main application theme
```

## Mô tả các thư mục chính:

### 📁 **core/** - Module Core
- **config/**: Cấu hình Firebase và các service bên ngoài
- **guards/**: Route guards cho authentication và authorization
- **interceptors/**: HTTP interceptors để xử lý JWT token
- **models/**: TypeScript interfaces và models cho data
- **services/**: Singleton services cho toàn ứng dụng

### 📁 **features/** - Modules tính năng
- **admin/**: Tất cả tính năng quản trị hệ thống
  - Dashboard, quản lý nhạc, user, category, artist, playlist
- **auth/**: Xác thực người dùng (login, register, verify)
- **home/**: Trang chủ với trending music, categories
- **music/**: Tính năng liên quan đến nhạc
- **playlist/**: Quản lý playlist cá nhân
- **user/**: Profile và settings người dùng

### 📁 **shared/** - Components dùng chung
- **components/**: Các component được sử dụng ở nhiều nơi
  - Header, Sidebar, Music Player, Admin Layout

### 📁 **assets/** - Tài nguyên tĩnh
- Hình ảnh, icons, fonts (hiện tại trống)

### 📁 **environments/** - Cấu hình môi trường
- Cấu hình cho development và production

### 📁 **styles/** - Styling toàn cục
- Theme chính, admin theme, modal styles

## Công nghệ sử dụng:

- **Angular 17**: Framework frontend chính
- **TypeScript**: Ngôn ngữ lập trình
- **SCSS**: Preprocessor CSS
- **Angular Material**: UI component library
- **RxJS**: Reactive programming
- **Firebase**: Storage và authentication support
- **FontAwesome**: Icon library

## Kiến trúc Frontend:

### 🔄 **Data Flow**:
```
Component ↔ Service ↔ HTTP Client ↔ Backend API
```

### 🛡️ **Security**:
- JWT token trong AuthInterceptor
- Route guards cho protected routes
- Role-based access control (User/Admin)

### 🎵 **Music Player**:
- Centralized music player service
- Global state management cho current song
- Playlist queue management

### 📱 **Responsive Design**:
- Mobile-first approach
- Angular Material responsive breakpoints
- Custom SCSS mixins cho responsive design

Cấu trúc này tuân theo **Angular Style Guide** và best practices, đảm bảo code maintainable và scalable cho dự án music streaming.
