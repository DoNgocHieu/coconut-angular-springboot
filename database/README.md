# Hướng dẫn sử dụng Database Coconut Music

## Vấn đề đã khắc phục

File `coconut_music.sql` đã được sửa để khắc phục lỗi **"Duplicate entry '1' for key 'artists.PRIMARY'"** và các lỗi tương tự.

### Nguyên nhân lỗi:
- Khi chạy script SQL nhiều lần, dữ liệu bị trùng lặp do có sẵn data trong database
- Các ID được chỉ định cụ thể trong INSERT statements, gây xung đột với AUTO_INCREMENT

### Giải pháp đã áp dụng:

1. **Thêm lệnh TRUNCATE** ở đầu file để xóa sạch dữ liệu cũ:
   ```sql
   -- Vô hiệu hóa kiểm tra foreign key để có thể xóa dữ liệu
   SET FOREIGN_KEY_CHECKS = 0;

   -- Xóa tất cả dữ liệu từ các bảng để tránh lỗi duplicate key
   TRUNCATE TABLE `playlist_music`;
   TRUNCATE TABLE `favorite_playlists`;
   TRUNCATE TABLE `favorites`;
   TRUNCATE TABLE `history`;
   TRUNCATE TABLE `playlists`;
   TRUNCATE TABLE `music`;
   TRUNCATE TABLE `artists`;
   TRUNCATE TABLE `categories`;
   TRUNCATE TABLE `banners`;
   TRUNCATE TABLE `users`;

   -- Bật lại kiểm tra foreign key
   SET FOREIGN_KEY_CHECKS = 1;
   ```

2. **Thứ tự xóa bảng đúng** để tránh lỗi foreign key constraint

## Cách sử dụng

### 1. Import database:
```bash
mysql -u username -p coconut_music < coconut_music.sql
```

### 2. Hoặc sử dụng phpMyAdmin:
- Mở phpMyAdmin
- Chọn database `coconut_music`
- Vào tab "Import"
- Chọn file `coconut_music.sql`
- Click "Go" để thực thi

### 3. Kiểm tra kết quả:
Sau khi import thành công, database sẽ có:
- 33 artists
- 3 banners
- 8 categories
- 39 bài nhạc
- 6 users
- Và các dữ liệu liên quan khác

## Lưu ý

- File này có thể chạy nhiều lần mà không bị lỗi duplicate key
- Dữ liệu cũ sẽ bị xóa hoàn toàn khi chạy lại script
- Đảm bảo backup dữ liệu quan trọng trước khi chạy script này

## Cấu trúc Database

### Các bảng chính:
- `users` - Người dùng
- `artists` - Nghệ sĩ
- `categories` - Danh mục nhạc
- `music` - Bài nhạc
- `playlists` - Playlist
- `favorites` - Yêu thích
- `history` - Lịch sử nghe

### Quan hệ:
- Music → Artist (Many-to-One)
- Music → Category (Many-to-One)
- Music → User (Many-to-One, uploaded_by)
- Playlist → User (Many-to-One)
- PlaylistMusic → Playlist, Music (Many-to-Many)
- Favorites → User, Music (Many-to-Many)
- History → User, Music (Many-to-Many)
