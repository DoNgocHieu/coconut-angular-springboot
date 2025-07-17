# Coconut Music Database Schema Documentation

## Tổng quan hệ thống
Coconut Music là một ứng dụng phát nhạc trực tuyến với đầy đủ tính năng quản lý người dùng, nghệ sĩ, nhạc, playlist và analytics. Database được thiết kế với 10 bảng chính hỗ trợ các chức năng từ cơ bản đến nâng cao.

---

## 1. Bảng USERS

### Mục đích
Lưu trữ thông tin và các vai trò của người dùng (vai trò: ROLE_ADMIN, ROLE_MODERATOR, ROLE_USER).

### Khóa chính
- **id** (VARCHAR(36)): Định danh duy nhất của vai trò

### Quan hệ
- **1:N với bảng MUSIC**: Trong bảng MUSIC, trường role_id là khóa ngoại, tham chiếu đến ROLE.id
- **1:N với bảng PLAYLISTS**: Trong bảng PLAYLISTS, trường user_id là khóa ngoại, tham chiếu đến USERS.id
- **1:N với bảng HISTORY**: Trong bảng HISTORY, trường user_id là khóa ngoại, tham chiếu đến USERS.id
- **1:N với bảng FAVORITES**: Trong bảng FAVORITES, trường user_id là khóa ngoại, tham chiếu đến USERS.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của người dùng | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| username | Tên đăng nhập | VARCHAR | 255 | NOT NULL, UNIQUE |
| email | Địa chỉ email | VARCHAR | 255 | NOT NULL, UNIQUE |
| password | Mật khẩu đã mã hóa | VARCHAR | 255 | NOT NULL |
| is_admin | Quyền quản trị viên | BIT(1) | — | DEFAULT NULL |
| is_verified | Trạng thái xác thực email | BIT(1) | — | DEFAULT NULL |
| avatar_url | URL ảnh đại diện | VARCHAR | 255 | NULL |
| forgot_password_token | Token reset mật khẩu | VARCHAR | 255 | NULL |
| forgot_password_token_expiry | Thời hạn token reset | DATETIME(6) | — | NULL |
| verify_token | Token xác thực email | VARCHAR | 255 | NULL |
| verify_token_expiry | Thời hạn token xác thực | DATETIME(6) | — | NULL |
| created_at | Thời điểm tạo tài khoản | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## 2. Bảng ARTISTS

### Mục đích
Lưu trữ thông tin nghệ sĩ và hồ sơ nghệ thuật.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của nghệ sĩ

### Quan hệ
- **1:N với bảng MUSIC**: Trong bảng MUSIC, trường artist_id là khóa ngoại, tham chiếu đến ARTISTS.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của nghệ sĩ | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| name | Tên nghệ sĩ | VARCHAR | 255 | NOT NULL |
| bio | Tiểu sử nghệ sĩ | TEXT | — | NULL |
| avatar_url | URL ảnh đại diện | VARCHAR | 255 | NULL |
| is_active | Trạng thái hoạt động | BIT(1) | — | DEFAULT NULL |
| created_at | Thời điểm tạo hồ sơ | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## 3. Bảng CATEGORIES

### Mục đích
Lưu trữ thông tin thể loại và phân loại âm nhạc.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của thể loại

### Quan hệ
- **1:N với bảng MUSIC**: Trong bảng MUSIC, trường category_id là khóa ngoại, tham chiếu đến CATEGORIES.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của thể loại | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| name | Tên thể loại | VARCHAR | 255 | NOT NULL, UNIQUE |
| description | Mô tả chi tiết về thể loại | TEXT | — | NULL |
| image_url | URL hình ảnh đại diện | VARCHAR | 255 | NULL |
| is_active | Trạng thái hoạt động | BIT(1) | — | DEFAULT NULL |
| created_at | Thời điểm tạo thể loại | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## 4. Bảng MUSIC

### Mục đích
Lưu trữ thông tin bài hát, metadata và thống kê phát nhạc.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của bài hát

### Quan hệ
- **N:1 với bảng ARTISTS**: Trường artist_id tham chiếu đến ARTISTS.id
- **N:1 với bảng CATEGORIES**: Trường category_id tham chiếu đến CATEGORIES.id
- **N:1 với bảng USERS**: Trường uploaded_by tham chiếu đến USERS.id
- **1:N với bảng PLAYLIST_MUSIC**: Bảng trung gian với playlists
- **1:N với bảng FAVORITES**: Người dùng yêu thích bài hát
- **1:N với bảng HISTORY**: Lịch sử phát nhạc

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của bài hát | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| title | Tiêu đề bài hát | VARCHAR | 255 | NOT NULL |
| file_url | URL file âm thanh | VARCHAR | 255 | NOT NULL |
| image_url | URL hình ảnh cover | VARCHAR | 255 | NULL |
| duration_seconds | Thời lượng (giây) | INT | — | NOT NULL |
| play_count | Số lượt phát | BIGINT | — | DEFAULT NULL |
| like_count | Số lượt thích | BIGINT | — | DEFAULT NULL |
| is_active | Trạng thái hoạt động | BIT(1) | — | DEFAULT NULL |
| type_music | Loại nhạc | ENUM | — | ('NEW_MUSIC', 'TRENDING', 'TOP_VIEW', 'VN_LOFI', 'FAVORITE') |
| artist_id | ID nghệ sĩ | BIGINT | — | FOREIGN KEY → ARTISTS.id |
| category_id | ID thể loại | BIGINT | — | FOREIGN KEY → CATEGORIES.id |
| uploaded_by | ID người upload | BIGINT | — | FOREIGN KEY → USERS.id |
| created_at | Thời điểm tạo | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## 5. Bảng PLAYLISTS

### Mục đích
Lưu trữ thông tin playlist do người dùng tạo.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của playlist

### Quan hệ
- **N:1 với bảng USERS**: Trường user_id tham chiếu đến USERS.id
- **1:N với bảng PLAYLIST_MUSIC**: Bảng trung gian với music
- **1:N với bảng FAVORITE_PLAYLISTS**: Người dùng yêu thích playlist

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của playlist | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| name | Tên playlist | VARCHAR | 255 | NOT NULL |
| description | Mô tả playlist | TEXT | — | NULL |
| image_url | URL hình ảnh playlist | VARCHAR | 255 | NULL |
| is_public | Trạng thái công khai | BIT(1) | — | DEFAULT NULL |
| user_id | ID người tạo | BIGINT | — | NOT NULL, FOREIGN KEY → USERS.id |
| created_at | Thời điểm tạo | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## 6. Bảng PLAYLIST_MUSIC

### Mục đích
Bảng trung gian quản lý mối quan hệ N:N giữa playlists và music.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của mối quan hệ

### Quan hệ
- **N:1 với bảng PLAYLISTS**: Trường playlist_id tham chiếu đến PLAYLISTS.id
- **N:1 với bảng MUSIC**: Trường music_id tham chiếu đến MUSIC.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| playlist_id | ID playlist | BIGINT | — | NOT NULL, FOREIGN KEY → PLAYLISTS.id |
| music_id | ID bài hát | BIGINT | — | NOT NULL, FOREIGN KEY → MUSIC.id |
| position | Vị trí trong playlist | INT | — | DEFAULT NULL |
| added_at | Thời điểm thêm vào | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |

**Ràng buộc duy nhất**: UNIQUE(playlist_id, music_id) - Mỗi bài hát chỉ xuất hiện một lần trong một playlist.

---

## 7. Bảng FAVORITES

### Mục đích
Lưu trữ danh sách bài hát yêu thích của người dùng.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của mối quan hệ yêu thích

### Quan hệ
- **N:1 với bảng USERS**: Trường user_id tham chiếu đến USERS.id
- **N:1 với bảng MUSIC**: Trường music_id tham chiếu đến MUSIC.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| user_id | ID người dùng | BIGINT | — | NOT NULL, FOREIGN KEY → USERS.id |
| music_id | ID bài hát | BIGINT | — | NOT NULL, FOREIGN KEY → MUSIC.id |
| created_at | Thời điểm yêu thích | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |

**Ràng buộc duy nhất**: UNIQUE(user_id, music_id) - Mỗi người dùng chỉ có thể yêu thích một bài hát một lần.

---

## 8. Bảng HISTORY

### Mục đích
Theo dõi lịch sử phát nhạc của người dùng cho mục đích analytics và gợi ý.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của bản ghi lịch sử

### Quan hệ
- **N:1 với bảng USERS**: Trường user_id tham chiếu đến USERS.id
- **N:1 với bảng MUSIC**: Trường music_id tham chiếu đến MUSIC.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| user_id | ID người dùng | BIGINT | — | NOT NULL, FOREIGN KEY → USERS.id |
| music_id | ID bài hát | BIGINT | — | NOT NULL, FOREIGN KEY → MUSIC.id |
| played_at | Thời điểm phát nhạc | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |

**Lưu ý**: Bảng này không có ràng buộc duy nhất, cho phép một người dùng phát cùng một bài hát nhiều lần.

---

## 9. Bảng FAVORITE_PLAYLISTS

### Mục đích
Lưu trữ danh sách playlist yêu thích của người dùng.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của mối quan hệ yêu thích playlist

### Quan hệ
- **N:1 với bảng USERS**: Trường user_id tham chiếu đến USERS.id
- **N:1 với bảng PLAYLISTS**: Trường playlist_id tham chiếu đến PLAYLISTS.id

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| user_id | ID người dùng | BIGINT | — | NOT NULL, FOREIGN KEY → USERS.id |
| playlist_id | ID playlist | BIGINT | — | NOT NULL, FOREIGN KEY → PLAYLISTS.id |
| created_at | Thời điểm yêu thích | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |

**Ràng buộc duy nhất**: UNIQUE(user_id, playlist_id) - Mỗi người dùng chỉ có thể yêu thích một playlist một lần.

---

## 10. Bảng BANNERS

### Mục đích
Quản lý nội dung marketing và banner quảng cáo trong ứng dụng.

### Khóa chính
- **id** (BIGINT): Định danh duy nhất của banner

### Quan hệ
- **Độc lập**: Bảng này không có quan hệ khóa ngoại với bảng khác

### Cấu trúc bảng

| Phần tử dữ liệu | Miêu tả | Thành phần/Kiểu dữ liệu | Chiều dài | Giá trị (mặc định/ràng buộc) |
|-----------------|---------|-------------------------|-----------|------------------------------|
| id | Định danh duy nhất của banner | BIGINT | — | NOT NULL, PRIMARY KEY, AUTO_INCREMENT |
| title | Tiêu đề banner | VARCHAR | 255 | NOT NULL |
| image_url | URL hình ảnh banner | VARCHAR | 255 | NOT NULL |
| link_url | URL liên kết | VARCHAR | 255 | NULL |
| is_active | Trạng thái hiển thị | BIT(1) | — | DEFAULT NULL |
| sort_order | Thứ tự hiển thị | INT | — | DEFAULT NULL |
| created_at | Thời điểm tạo | DATETIME(6) | — | NOT NULL, DEFAULT GETDATE() |
| updated_at | Thời điểm cập nhật cuối | DATETIME(6) | — | NULL |

---

## Kiến trúc hệ thống

Coconut Music được thiết kế theo kiến trúc 3-tier với các thành phần sau:

**Frontend (Angular)** - Giao diện người dùng gửi HTTP requests đến backend.

**Nginx** - Reverse proxy phân phối file tĩnh (build Angular) và chuyển tiếp API requests đến Spring Boot backend.

**Backend (Spring Boot)** - Xử lý business logic với kiến trúc phân lớp:
- **Controller Layer**: Nhận HTTP requests và trả về responses
- **Service Layer**: Xử lý business logic và validation
- **Repository Layer**: Data access layer sử dụng JPA/Hibernate

**Database (MySQL)** - Lưu trữ dữ liệu ứng dụng với 10 bảng chính.

**Firebase Storage** - CDN lưu trữ file âm thanh và hình ảnh.

---

## Các kỹ thuật thiết kế

Trong quá trình thiết kế hệ thống, nhóm áp dụng các kỹ thuật sau:

### Phân lớp theo mô hình MVC/MVVM
Cách ly rõ ràng giữa giao diện (Angular Components), logic nghiệp vụ (Spring Boot Services) và truy xuất dữ liệu (JPA Repositories) giúp mã dễ bảo trì, dễ mở rộng.

### Sử dụng UML trong mô hình hóa
- **Use Case Diagram**: Mô tả tương tác giữa tác nhân (User, Admin) và hệ thống.
- **Activity Diagram**: Biểu diễn luồng công việc (quy trình phát nhạc, quản lý playlist, upload nhạc, v.v.).
- **Class Diagram**: Thể hiện cấu trúc lớp, mối quan hệ giữa các lớp Entity, Service, Controller.
- **Sequence Diagram**: Mô tả trình tự gọi hàm khi thực hiện chức năng quan trọng (xác thực, phát nhạc, tạo playlist).
- **ERD (Entity Relationship Diagram)**: Thiết kế chi tiết cơ sở dữ liệu với 10 bảng và 15 mối quan hệ khóa ngoại.

### Tối ưu bằng Design Patterns
- **Repository Pattern** (Spring Data JPA) cho CRUD operations với database.
- **Service Layer**: Tách biệt logic nghiệp vụ khỏi Controller, đảm bảo Single Responsibility Principle.
- **Dependency Injection**: Spring Boot tự động inject bean giúp code gọn, dễ thay thế và test.
- **DTO Pattern**: Tránh trả về trực tiếp entity, bảo mật và linh hoạt hơn trong trao đổi dữ liệu giữa client-server.
- **Observer Pattern**: Khi có nhạc mới được upload hoặc playlist được tạo, hệ thống sẽ thông báo đến các module xử lý analytics và recommendation.
- **Strategy Pattern**: Xử lý các loại nhạc khác nhau (NEW_MUSIC, TRENDING, TOP_VIEW, VN_LOFI, FAVORITE) với các thuật toán tương ứng.

### Kiểm soát lỗi & Ngoại lệ
- **Exception Handling**: Spring Boot @ControllerAdvice để bắt ngoại lệ toàn cục, trả response JSON chuẩn cho Angular client.
- **Validation**: Dùng annotation (@NotNull, @Size, @Email...) để xác thực dữ liệu đầu vào, giảm lỗi do input xấu.
- **Custom Exceptions**: Định nghĩa các exception riêng cho business logic (UserNotFoundException, MusicNotActiveException, etc.).

### Thiết kế Database
- **Tối ưu Normalization**: Phân tích bảng Users, Music, Artists, Categories với chuẩn 3NF nhưng vẫn cân nhắc denormalization cho performance (play_count, like_count).
- **Sử dụng quan hệ đa dạng**:
  - 1:N (Users-Playlists, Artists-Music, Categories-Music)
  - N:M (Users↔Music qua Favorites, Playlists↔Music qua Playlist_Music)
- **Ràng buộc toàn vẹn**: 15 Foreign Key constraints và 6 Unique constraints đảm bảo tính nhất quán dữ liệu.
- **Indexing Strategy**: Indexes trên foreign keys và các trường thường dùng trong tìm kiếm (play_count, created_at).

### Bảo mật và phân quyền
- **JWT Authentication**: Xác thực token-based với refresh token mechanism.
- **Role-based Authorization**: Phân quyền dựa trên vai trò (ROLE_USER, ROLE_ADMIN) với @PreAuthorize.
- **Password Security**: Sử dụng BCrypt với salt ngẫu nhiên cho mã hóa mật khẩu.
- **Email Verification**: Workflow xác thực email với token có thời hạn.
- **API Security**: Mọi endpoint admin yêu cầu xác thực token + kiểm tra role. Upload nhạc, tạo playlist chỉ cho user đã đăng nhập.
- **CORS Configuration**: Cấu hình CORS cho phép Angular client truy cập API một cách an toàn.

### Logging & Monitoring
- **Logback/SLF4J** trong Spring Boot để ghi log các hoạt động quan trọng (login, upload, API calls).
- **Nginx Logs**: Theo dõi request, giám sát băng thông, tỉ lệ lỗi HTTP, performance metrics.
- **Application Logs**: Ghi log user activities, system errors, performance bottlenecks.
- **Analytics Tracking**: Theo dõi play count, user engagement, popular content thông qua bảng History.

### Performance Optimization
- **Caching Strategy**: Spring Cache cho data ít thay đổi (categories, artist info).
- **Lazy Loading**: JPA lazy loading cho relationships để tránh N+1 query problem.
- **Connection Pooling**: HikariCP connection pool để tối ưu database connections.
- **CDN Integration**: Firebase Storage CDN cho file âm thanh và hình ảnh.
- **Pagination**: Implement pagination cho danh sách nhạc, playlist để giảm tải server.

### Frontend Architecture (Angular)
- **Component-based Architecture**: Tái sử dụng components (music-card, playlist-item, audio-player).
- **Service Layer**: Angular services cho HTTP calls, state management, authentication.
- **Reactive Programming**: RxJS Observables cho async operations và real-time updates.
- **Route Guards**: AuthGuard và AdminGuard để bảo vệ routes.
- **Lazy Loading**: Module lazy loading để giảm bundle size và tăng tốc độ load.

---

## Thống kê tổng quan

### Số lượng bảng: 10
### Số lượng Foreign Keys: 15
### Số lượng Unique Constraints: 6

### Các ràng buộc duy nhất:
1. **USERS**: email, username
2. **CATEGORIES**: name
3. **PLAYLIST_MUSIC**: (playlist_id, music_id)
4. **FAVORITES**: (user_id, music_id)
5. **FAVORITE_PLAYLISTS**: (user_id, playlist_id)

### Cấu hình Database:
- **Storage Engine**: InnoDB
- **Character Set**: UTF8MB4
- **Collation**: utf8mb4_0900_ai_ci
- **Hỗ trợ**: ACID compliance, Foreign key constraints, Row-level locking

---

## Ghi chú kỹ thuật

### Bảo mật
- Mật khẩu được mã hóa bằng BCrypt
- Token-based authentication với JWT
- Workflow xác thực email và reset mật khẩu

### Performance
- Indexes được tạo trên tất cả foreign keys
- Composite indexes cho các truy vấn phức tạp
- Play count tracking cho thuật toán trending

### Lưu trữ file
- File âm thanh và hình ảnh được lưu trữ trên Firebase Storage
- Database chỉ lưu trữ URLs tham chiếu

### Analytics
- Lịch sử phát nhạc không có ràng buộc unique (cho phép multiple plays)
- Tracking metrics cho recommendation algorithms
- Content insights cho business intelligence
