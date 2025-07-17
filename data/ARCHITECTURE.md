# Kiến Trúc Logic Hệ Thống Coconut Music

## Kiến trúc logic mô tả luồng xử lý và các lớp (layer) bên trong hệ thống:

### Tầng Giao diện (Presentation Layer)

#### + Front-end Angular 17:
- **Component**: Thể hiện từng màn hình, trang (Page), quản lý logic UI và sự kiện người dùng cho các chức năng như:
  - Trang chủ với các danh mục nhạc (trending, new music, top view)
  - Trang phát nhạc với music player đầy đủ tính năng
  - Trang quản lý playlist cá nhân và danh sách yêu thích
  - Trang tìm kiếm và khám phá nhạc mới
  - Trang admin quản lý hệ thống (nhạc, người dùng, thể loại, nghệ sĩ)

- **Service (phía client)**: Gửi/nhận dữ liệu qua API, chia sẻ dữ liệu giữa các component, xử lý logic cục bộ:
  - `AuthService`: Xử lý đăng nhập/đăng ký, quản lý JWT token
  - `MusicService`: Quản lý phát nhạc, playlist, lịch sử nghe
  - `AdminService`: Xử lý các chức năng quản trị hệ thống
  - `PlaylistService`: Quản lý playlist cá nhân và chia sẻ
  - `CategoryService`: Quản lý danh mục và thể loại nhạc

- **Router**: Định tuyến sang từng màn hình với phân quyền:
  - Route công khai: Trang chủ, đăng nhập, đăng ký
  - Route người dùng: Playlist, yêu thích, lịch sử, profile
  - Route admin: Dashboard quản trị, quản lý nội dung

#### + Nhiệm vụ:
Hiển thị giao diện music streaming, xử lý thao tác phát nhạc, quản lý playlist, tìm kiếm bài hát, đăng nhập/đăng ký người dùng, và cung cấp giao diện quản trị hệ thống.

---

### Tầng Dịch vụ & Nghiệp vụ (Business Logic Layer)

#### + Spring Boot 3.2.0 Service:
- **Service**: Thực hiện nghiệp vụ cốt lõi của hệ thống nhạc trực tuyến:
  - `MusicService`: Quản lý bài hát, upload file nhạc, metadata processing
  - `PlaylistService`: Tạo và quản lý playlist, chia sẻ playlist giữa người dùng
  - `UserService`: Quản lý tài khoản, profile, lịch sử nghe nhạc
  - `CategoryService`: Phân loại nhạc theo thể loại, trend analysis
  - `ArtistService`: Quản lý thông tin nghệ sĩ và albums
  - `AdminService`: Thống kê hệ thống, quản lý nội dung, moderation
  - `NotificationService`: Gửi thông báo và email tới người dùng

- **Security (Spring Security + JWT)**:
  - Kiểm tra phân quyền User/Admin
  - Xác thực người dùng qua JWT token
  - Bảo vệ API endpoints theo vai trò
  - Session management cho music streaming

#### + Nhiệm vụ:
Đảm bảo quy trình nghiệp vụ streaming nhạc (quản lý bài hát, playlist, tài khoản), thực hiện các logic phức tạp như thuật toán gợi ý nhạc, thống kê lượt nghe, xử lý upload file, và gửi email thông báo.

---

### Tầng Truy xuất dữ liệu (Data Access Layer)

#### + Repository/DAO:
Sử dụng Spring Data JPA/Hibernate tương tác với MySQL Database:
- `UserRepository`: Truy xuất thông tin người dùng và xác thực
- `MusicRepository`: Quản lý database bài hát và metadata
- `PlaylistRepository`: Xử lý playlist và mối quan hệ playlist-music
- `CategoryRepository`: Truy xuất danh mục và thể loại nhạc
- `ArtistRepository`: Quản lý thông tin nghệ sĩ
- `FavoriteRepository`: Xử lý danh sách yêu thích của người dùng
- `HistoryRepository`: Lưu trữ lịch sử nghe nhạc
- `BannerRepository`: Quản lý banner và quảng cáo trang chủ

#### + Entity:
Mapping các bảng trong MySQL DB, đại diện cho các đối tượng:
- `User`: Thông tin tài khoản người dùng (id, username, email, role)
- `Music`: Bài hát (id, title, artist, file_path, duration, genre)
- `Playlist`: Danh sách phát (id, name, user_id, description, image)
- `Category`: Thể loại nhạc (id, name, description)
- `Artist`: Nghệ sĩ (id, name, bio, avatar)
- `Favorite`: Bài hát yêu thích (user_id, music_id)
- `History`: Lịch sử nghe (user_id, music_id, play_date)
- `Banner`: Quảng cáo trang chủ (id, title, image, link)

#### + Nhiệm vụ:
Giao tiếp với MySQL database, thực hiện CRUD operations, đảm bảo tính toàn vẹn dữ liệu nhạc và thông tin người dùng, tối ưu hóa query cho streaming performance.

---

### Tầng Hệ thống & Tích hợp

#### + Web Server (development):
- **Angular Development Server**: Phục vụ ứng dụng Angular SPA trong môi trường phát triển
- **Spring Boot Embedded Tomcat**: Web server tích hợp cho REST API backend

#### + CSDL MySQL:
Lưu toàn bộ dữ liệu liên quan đến:
- Người dùng và phân quyền (User, Role)
- Thư viện nhạc và metadata (Music, Artist, Category)
- Playlist và sở thích cá nhân (Playlist, Favorite, History)
- Quản trị hệ thống (Banner, System settings)

#### + External Services:
- **Email Service (SMTP)**: Gửi email xác thực tài khoản, thông báo hệ thống
- **File Storage**: Lưu trữ file nhạc MP3 và hình ảnh playlist/avatar
- **Firebase (optional)**: Hỗ trợ real-time notifications và analytics

---

## Hình 4.1.2: Sơ đồ mô tả kiến trúc triển khai theo kiểu phân tầng

Trong hình 4.1.2 đã mô tả kiến trúc triển khai chi tiết của hệ thống Coconut Music cùng với các thành phần chính như sau:

### Angular SPA (Single Page Application)
#### + Vai trò:
Đây là lớp giao diện người dùng (frontend) cho hệ thống streaming nhạc. Ứng dụng được xây dựng bằng Angular 17 chạy trực tiếp trên trình duyệt của người dùng.

#### + Chức năng:
- **Hiển thị giao diện**: Cung cấp giao diện tương tác cho music streaming, hiển thị danh sách bài hát, playlist, thông tin nghệ sĩ, music player với đầy đủ controls (play, pause, next, previous, volume, progress bar).

- **Tương tác với người dùng**: Thu thập dữ liệu từ người dùng (form đăng nhập, tạo playlist, tìm kiếm nhạc) và xử lý sự kiện (click play, add to favorite, create playlist, upload music cho admin).

- **Gọi API**: Gửi các yêu cầu HTTP/HTTPS đến Spring Boot backend để:
  - Streaming nhạc và quản lý playlist
  - Xác thực người dùng và phân quyền
  - Upload/download file nhạc
  - Thống kê và báo cáo cho admin

### Spring Boot Backend (Controller → Service → Repository)
#### + Vai trò:
Đây là lớp Back-end của hệ thống music streaming, chịu trách nhiệm xử lý logic nghiệp vụ và quản lý giao tiếp với cơ sở dữ liệu nhạc.

#### + Kiến trúc nội bộ:

**Controller**: Tiếp nhận yêu cầu HTTP từ Angular SPA, thực hiện các thao tác kiểm tra ban đầu và định tuyến:
- `AuthController`: Xử lý đăng nhập/đăng ký, JWT authentication
- `MusicController`: API cho streaming nhạc, search, metadata
- `PlaylistController`: Quản lý playlist cá nhân và chia sẻ
- `AdminController`: API quản trị (thống kê, quản lý nội dung)
- `UserController`: Quản lý profile và preferences
- `FileController`: Upload/download file nhạc và hình ảnh

**Service**: Chứa logic nghiệp vụ chính của hệ thống music streaming:
- Xử lý algorithms gợi ý nhạc dựa trên lịch sử nghe
- Quản lý quyền truy cập nội dung theo role (User/Admin)
- Xử lý streaming performance và caching
- Thống kê lượt nghe và trending analysis
- Validation metadata nhạc và content moderation

**Repository**: Lớp truy cập dữ liệu, sử dụng Spring Data JPA và Hibernate để:
- Thực hiện CRUD operations trên MySQL database
- Tối ưu hóa query cho music search và filtering
- Quản lý relationships giữa User-Playlist-Music
- Tracking listening history và analytics data

### MySQL Database
#### + Vai trò:
Đây là cơ sở dữ liệu chính lưu trữ toàn bộ dữ liệu của hệ thống music streaming.

#### + Chức năng:
- **Lưu trữ dữ liệu**: Dữ liệu được lưu theo các bảng đã chuẩn hóa:
  - `users`: Thông tin tài khoản và phân quyền
  - `music`: Metadata bài hát (title, artist, duration, file_path)
  - `playlists`: Danh sách phát của người dùng
  - `playlist_music`: Mapping bài hát trong playlist
  - `favorites`: Bài hát yêu thích của user
  - `categories`: Thể loại và phân loại nhạc
  - `artists`: Thông tin nghệ sĩ và albums
  - `listening_history`: Lịch sử nghe nhạc cho analytics

- **Đảm bảo tính toàn vẹn dữ liệu**:
  - Foreign key constraints giữa các bảng liên quan
  - Indexes cho search performance
  - Triggers cho logging và audit trail
  - Backup strategies cho data protection

---

## Luồng Dữ liệu Tổng thể

### + Từ Angular SPA:
- Người dùng tương tác với music player interface trên trình duyệt
- Khi thực hiện thao tác (play nhạc, tạo playlist, tìm kiếm), Angular gửi API request qua HTTPS
- Real-time updates cho currently playing track và playback progress

### + Tại Spring Boot:
**Controller**:
- Nhận music streaming requests từ Angular
- Validate user permissions và content access rights
- Route requests tới appropriate service layer

**Service**:
- Xử lý business logic cho music streaming
- Implement recommendation algorithms
- Handle file streaming và caching logic
- Process playlist operations và user preferences
- Generate analytics và usage statistics

**Repository**:
- Query MySQL để retrieve music metadata
- Update listening history và user preferences
- Manage playlist relationships và favorites
- Track usage analytics cho admin dashboard

### + MySQL Database:
- Xử lý complex queries cho music search và filtering
- Store và retrieve music metadata efficiently
- Maintain user preferences và listening history
- Support analytics queries cho trending music
- Ensure data consistency across concurrent users

### + Trả kết quả về cho Angular SPA:
- Music metadata và streaming URLs được trả về dưới dạng JSON
- Real-time updates cho playlist changes và user interactions
- Analytics data cho admin dashboard
- User preferences và recommendations
- Angular cập nhật UI based trên received data và maintains music player state

---

## Đặc điểm Kỹ thuật của Hệ thống

### Performance Optimizations:
- **Caching**: Implement Redis cho frequently accessed music metadata
- **CDN**: Distribute music files qua Content Delivery Network
- **Lazy Loading**: Load music content on-demand để improve initial page load
- **Database Indexing**: Optimize search queries và playlist operations

### Security Measures:
- **JWT Authentication**: Secure user sessions và API access
- **Role-based Access Control**: Phân quyền User/Admin
- **Content Protection**: DRM cho premium music content
- **Rate Limiting**: Prevent abuse của streaming APIs

### Scalability Considerations:
- **Microservices Architecture**: Separate music streaming từ user management
- **Load Balancing**: Distribute requests across multiple backend instances
- **Database Sharding**: Scale music library storage
- **Async Processing**: Handle file uploads và analytics processing

Kiến trúc này đảm bảo hệ thống Coconut Music có thể handle large-scale music streaming với performance tốt, security cao, và user experience mượt mà cho cả end users và administrators.
