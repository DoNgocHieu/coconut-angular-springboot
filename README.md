# README - Coconut Music Project

## Câu Hỏi: Có mấy loại người dùng trong dự án này?

| **Mô tả** | Người sử dụng ứng dụng để nghe nhạc trực tuyến. Họ có thể đăng ký tài khoản để sử dụng các tính năng cá nhân như tạo playlist, lưu bài hát yêu thích và theo dõi lịch sử nghe nhạc. |
|-----------|-------------|
| **Nhu cầu** | • Cần có tài khoản để lưu trữ thông tin cá nhân<br/>• Muốn nghe nhạc miễn phí và tiện lợi<br/>• Cần tạo và quản lý playlist riêng<br/>• Muốn lưu lại những bài hát yêu thích<br/>• Cần tìm kiếm và khám phá nhạc mới |
| **Quyền lợi** | • **Nghe nhạc**: Nghe tất cả bài hát có trong hệ thống miễn phí<br/>• **Tìm kiếm**: Tìm bài hát theo tên, ca sĩ, thể loại<br/>• **Playlist cá nhân**: Tạo và quản lý danh sách phát riêng<br/>• **Yêu thích**: Lưu những bài hát ưa thích vào danh sách riêng<br/>• **Lịch sử**: Xem lại những bài hát đã nghe<br/>• **Cá nhân hóa**: Cập nhật thông tin profile, avatar<br/>• **Khám phá**: Xem các danh mục trending, new music, top view |
| **Các tính năng chính người dùng có thể sử dụng** | • **Đăng ký/Đăng nhập**: Tạo tài khoản và đăng nhập vào hệ thống<br/>• **Music Player**: Phát nhạc với đầy đủ chức năng play, pause, next, previous<br/>• **Quản lý Playlist**: Tạo mới, thêm/xóa bài hát, đổi tên playlist<br/>• **Tìm kiếm thông minh**: Tìm theo nhiều tiêu chí khác nhau<br/>• **Danh sách yêu thích**: Thêm/bỏ bài hát yêu thích dễ dàng<br/>• **Lịch sử nghe nhạc**: Theo dõi những gì đã nghe<br/>• **Cập nhật profile**: Thay đổi thông tin cá nhân, mật khẩu<br/>• **Responsive**: Sử dụng được trên máy tính, điện thoại, tablet |

---

## Tóm tắt:

Người dùng của ứng dụng Coconut Music có thể:
- Nghe nhạc miễn phí với đầy đủ tính năng
- Tạo và quản lý playlist cá nhân
- Lưu bài hát yêu thích và xem lịch sử
- Tìm kiếm và khám phá nhạc mới

Đây là những tính năng cơ bản mà một ứng dụng nghe nhạc hiện đại cần có để phục vụ người dùng.

---

## Câu Hỏi: Admin có vai trò gì trong hệ thống?

| **Vai trò** | Admin (Quản trị viên) là người quản lý và vận hành toàn bộ hệ thống Coconut Music. Họ có quyền hạn cao nhất để quản lý nội dung, người dùng và các cài đặt hệ thống. Admin đảm bảo ứng dụng hoạt động ổn định và nội dung phù hợp. |
|-----------|-------------|
| **Trách nhiệm** | • Quản lý và kiểm duyệt toàn bộ nội dung nhạc trong hệ thống<br/>• Giám sát hoạt động của người dùng và xử lý vi phạm<br/>• Đảm bảo chất lượng âm thanh và thông tin bài hát chính xác<br/>• Cập nhật và bảo trì hệ thống thường xuyên<br/>• Phản hồi và hỗ trợ người dùng khi có vấn đề<br/>• Sao lưu dữ liệu và đảm bảo tính bảo mật |
| **Chức năng quản lý hệ thống của Admin** | • **Quản lý nhạc**: Upload, chỉnh sửa, xóa bài hát và thông tin metadata<br/>• **Quản lý người dùng**: Xem danh sách, kích hoạt/khóa tài khoản người dùng<br/>• **Quản lý thể loại**: Tạo, sửa, xóa các danh mục nhạc<br/>• **Quản lý nghệ sĩ**: Thêm thông tin nghệ sĩ, cập nhật tiểu sử<br/>• **Thống kê hệ thống**: Xem báo cáo lượt nghe, người dùng mới, top trending<br/>• **Cài đặt banner**: Quản lý quảng cáo và banner trang chủ<br/>• **Phân quyền**: Cấp quyền admin cho người dùng khác<br/>• **Backup/Restore**: Sao lưu và khôi phục dữ liệu hệ thống |
| **Công cụ giám sát & bảo cảo** | • **Dashboard quản trị**: Giao diện tổng quan với các thống kê quan trọng<br/>• **Báo cáo hoạt động**: Thống kê lượt nghe, bài hát phổ biến, người dùng hoạt động<br/>• **Giám sát hệ thống**: Theo dõi hiệu suất server, dung lượng lưu trữ<br/>• **Log hoạt động**: Ghi lại các thao tác quan trọng của admin và người dùng<br/>• **Cảnh báo bảo mật**: Phát hiện và cảnh báo các hoạt động bất thường<br/>• **Quản lý file**: Kiểm soát dung lượng và định dạng file upload<br/>• **Kiểm duyệt nội dung**: Xem xét và phê duyệt nội dung do người dùng đề xuất |

---

## 3.2. Xác định các Actor

Hệ thống gồm ba Actor:

### - Người dùng:
   ○ **Mô tả**: Người sử dụng ứng dụng để nghe nhạc trực tuyến, có thể đăng ký tài khoản để sử dụng các tính năng cá nhân.
   ○ **Chức năng chính**: Nghe nhạc, tìm kiếm bài hát, tạo và quản lý playlist, lưu bài hát yêu thích, xem lịch sử nghe nhạc.

### - Admin:
   ○ **Mô tả**: Người quản lý và vận hành toàn bộ hệ thống Coconut Music, có quyền hạn cao nhất để quản lý nội dung, người dùng và các cài đặt hệ thống.
   ○ **Chức năng chính**: Quản lý nhạc, người dùng, thể loại, nghệ sĩ; xem thống kê hệ thống; quản lý quảng cáo và banner; phân quyền admin cho người dùng khác.

---

## 3.3. Biểu đồ Use Case tổng quan hệ thống

```
                    Hệ thống ứng dụng nghe nhạc Coconut Music

    Moderator                                                    Admin
        |                                                          |
        |                    Quan lý bài hát                      |
        |                         |                               |
        |                         |                               |
        |                         |                               |
        |                         |                   Quản lý bài hát
        |                         |                               |
        |               Tìm kiếm bài hát                         |
        |                         |                               |
        |                         |                               |
        |                         |                   Xem thống kê hệ thống
        |                         |                               |
        |                         |                               |
        |               Quản lý thể loại nhạc                    |
        |                         |                               |
        |                         |                               |
    User |                       |                   Quản lý quyền người dùng
        |                         |                               |
        |                         |                               |
        |                         |                               |
        |               Xem lịch sử phát                         |
        |                         |                               |
        |                         |                               |
        |               Quản lý Playlist                         |
        |                         |                               |
        |                         |                               |
        |               Tìm kiếm bài hát                         |
        |                         |                               |
        |                         |                               |
        |               Xem danh sách yêu thích                  |
        |                                                          |
        |                                                          |
        |               Đăng nhập ←─→ Xác thực đăng nhập         |
        |                                                          |
        |                                                          |
        |               Đăng ký ←─→ Đăng ký tài khoản            |
        |                                                          |
        |                                                          |
        |               Đăng xuất ←─→ Quản lý khóa              |
        |__________________________|___________________________|
```

**Mô tả biểu đồ Use Case:**

### Các Actor:
- **User (Người dùng)**: Sử dụng ứng dụng để nghe nhạc và quản lý playlist cá nhân
- **Moderator**: Có thể là một role trung gian (nếu cần) hoặc có thể bỏ qua
- **Admin**: Quản lý toàn bộ hệ thống

### Các Use Case chính:

#### **User có thể thực hiện:**
1. **Đăng nhập/Đăng ký/Đăng xuất** - Quản lý tài khoản
2. **Tìm kiếm bài hát** - Tìm nhạc theo nhiều tiêu chí
3. **Quản lý Playlist** - Tạo, sửa, xóa playlist cá nhân
4. **Xem danh sách yêu thích** - Quản lý bài hát yêu thích
5. **Xem lịch sử phát** - Theo dõi những bài đã nghe
6. **Quản lý thể loại nhạc** - Duyệt theo thể loại

#### **Admin có thể thực hiện:**
1. **Tất cả chức năng của User** +
2. **Quản lý bài hát** - Upload, sửa, xóa nhạc
3. **Quản lý quyền người dùng** - Phân quyền, khóa/mở khóa
4. **Xem thống kê hệ thống** - Báo cáo và thống kê
5. **Quản lý khóa** - Khóa tài khoản vi phạm

#### **Quan hệ extend và include:**
- **Đăng nhập** extend **Xác thực đăng nhập**
- **Đăng ký** extend **Đăng ký tài khoản**
- **Đăng xuất** extend **Quản lý khóa**

---

## 3.4. Đặc tả các ca sử dụng

### 3.4.1. Danh sách Use Case cho User (Người dùng)

#### **A. Quản lý tài khoản:**
1. **UC001 - Đăng ký tài khoản**
   - Người dùng tạo tài khoản mới với username, email, password
   - Hệ thống gửi email xác thực

2. **UC002 - Đăng nhập**
   - Người dùng đăng nhập bằng username/email và password
   - Hệ thống xác thực và cấp JWT token

3. **UC003 - Đăng xuất**
   - Người dùng đăng xuất khỏi hệ thống
   - Xóa token khỏi client

4. **UC004 - Xác thực email**
   - Người dùng xác thực email thông qua link trong email
   - Kích hoạt tài khoản để sử dụng đầy đủ tính năng

5. **UC005 - Quên mật khẩu**
   - Người dùng yêu cầu reset mật khẩu
   - Hệ thống gửi link reset qua email

6. **UC006 - Đổi mật khẩu**
   - Người dùng thay đổi mật khẩu hiện tại
   - Yêu cầu xác nhận mật khẩu cũ

#### **B. Chức năng nghe nhạc:**
7. **UC007 - Nghe nhạc**
   - Phát nhạc với player tích hợp (play, pause, next, previous)
   - Điều chỉnh âm lượng và thanh tiến trình

8. **UC008 - Tìm kiếm bài hát**
   - Tìm kiếm theo tên bài hát, nghệ sĩ, album, thể loại
   - Hiển thị kết quả với phân trang

9. **UC009 - Xem chi tiết bài hát**
   - Xem thông tin chi tiết: tên, nghệ sĩ, thời lượng, lượt nghe
   - Hiển thị hình ảnh và metadata

10. **UC010 - Xem danh mục nhạc**
    - Duyệt nhạc theo thể loại: New Music, Trending, Top View, VN LoFi
    - Phân trang và lọc theo tiêu chí

#### **C. Quản lý cá nhân:**
11. **UC011 - Cập nhật profile**
    - Thay đổi thông tin cá nhân: tên, email, avatar
    - Upload và thay đổi ảnh đại diện

12. **UC012 - Xem lịch sử nghe nhạc**
    - Xem danh sách bài hát đã nghe theo thời gian
    - Phát lại bài hát từ lịch sử

13. **UC013 - Quản lý danh sách yêu thích**
    - Thêm bài hát vào danh sách yêu thích
    - Xóa bài hát khỏi danh sách yêu thích
    - Xem tất cả bài hát yêu thích

#### **D. Quản lý Playlist:**
14. **UC014 - Tạo playlist mới**
    - Tạo playlist với tên và mô tả
    - Chọn chế độ public/private

15. **UC015 - Chỉnh sửa playlist**
    - Đổi tên, mô tả playlist
    - Thay đổi chế độ public/private
    - Upload ảnh bìa playlist

16. **UC016 - Thêm nhạc vào playlist**
    - Thêm bài hát vào playlist đã tạo
    - Sắp xếp thứ tự bài hát

17. **UC017 - Xóa nhạc khỏi playlist**
    - Xóa bài hát khỏi playlist
    - Sắp xếp lại thứ tự

18. **UC018 - Xóa playlist**
    - Xóa toàn bộ playlist
    - Xác nhận trước khi xóa

19. **UC019 - Xem playlist công khai**
    - Duyệt playlist public của người dùng khác
    - Sao chép playlist về tài khoản cá nhân

---

### 3.4.2. Danh sách Use Case cho Admin (Quản trị viên)

#### **A. Kế thừa tất cả chức năng của User (UC001-UC019)**

#### **B. Quản lý nhạc:**
20. **UC020 - Upload nhạc mới**
    - Upload file nhạc (MP3, FLAC, WAV)
    - Nhập thông tin: tên, nghệ sĩ, thể loại, hình ảnh
    - Kiểm tra định dạng và chất lượng file

21. **UC021 - Chỉnh sửa thông tin nhạc**
    - Sửa tên bài hát, nghệ sĩ, thể loại
    - Thay đổi hình ảnh bìa
    - Cập nhật metadata

22. **UC022 - Xóa nhạc**
    - Xóa bài hát khỏi hệ thống
    - Xác nhận và backup trước khi xóa
    - Cập nhật playlist có chứa bài hát đó

23. **UC023 - Phân loại nhạc**
    - Gán nhãn: New Music, Trending, Top View, VN LoFi
    - Thay đổi trạng thái hiển thị

#### **C. Quản lý người dùng:**
24. **UC024 - Xem danh sách người dùng**
    - Hiển thị tất cả user với thông tin cơ bản
    - Tìm kiếm và lọc theo tiêu chí

25. **UC025 - Khóa/mở khóa tài khoản**
    - Vô hiệu hóa tài khoản vi phạm
    - Khôi phục tài khoản đã khóa

26. **UC026 - Xem chi tiết hoạt động user**
    - Theo dõi lịch sử đăng nhập
    - Xem thống kê nghe nhạc của user

27. **UC027 - Phân quyền admin**
    - Cấp quyền admin cho user khác
    - Thu hồi quyền admin

#### **D. Quản lý thể loại và nghệ sĩ:**
28. **UC028 - Tạo thể loại nhạc mới**
    - Thêm thể loại mới với tên và mô tả
    - Upload hình ảnh đại diện

29. **UC029 - Chỉnh sửa thể loại**
    - Sửa tên, mô tả thể loại
    - Thay đổi hình ảnh

30. **UC030 - Xóa thể loại**
    - Xóa thể loại không sử dụng
    - Chuyển nhạc sang thể loại khác

31. **UC031 - Quản lý nghệ sĩ**
    - Thêm thông tin nghệ sĩ mới
    - Cập nhật tiểu sử, hình ảnh nghệ sĩ

#### **E. Thống kê và báo cáo:**
32. **UC032 - Xem thống kê tổng quan**
    - Số lượng user, bài hát, lượt nghe
    - Biểu đồ hoạt động theo thời gian

33. **UC033 - Báo cáo bài hát phổ biến**
    - Top bài hát được nghe nhiều nhất
    - Thống kê theo thể loại, nghệ sĩ

34. **UC034 - Thống kê người dùng**
    - User mới đăng ký theo thời gian
    - User hoạt động tích cực

35. **UC035 - Xuất báo cáo**
    - Export dữ liệu thống kê ra Excel/PDF
    - Lập báo cáo định kỳ

#### **F. Quản lý hệ thống:**
36. **UC036 - Quản lý banner/quảng cáo**
    - Thêm, sửa, xóa banner trang chủ
    - Sắp xếp thứ tự hiển thị

37. **UC037 - Backup dữ liệu**
    - Sao lưu database định kỳ
    - Khôi phục dữ liệu khi cần

38. **UC038 - Quản lý file và storage**
    - Kiểm tra dung lượng lưu trữ
    - Dọn dẹp file không sử dụng

39. **UC039 - Xem log hệ thống**
    - Theo dõi hoạt động của user và admin
    - Phát hiện hành vi bất thường

40. **UC040 - Cài đặt hệ thống**
    - Thay đổi cấu hình ứng dụng
    - Quản lý email templates

---

### 3.4.3. Tóm tắt phân quyền:

| **Loại chức năng** | **User** | **Admin** | **Số lượng Use Case** |
|-------------------|:--------:|:---------:|:---------------------:|
| Quản lý tài khoản | ✅ | ✅ | 6 |
| Chức năng nghe nhạc | ✅ | ✅ | 4 |
| Quản lý cá nhân | ✅ | ✅ | 3 |
| Quản lý Playlist | ✅ | ✅ | 6 |
| Quản lý nhạc | ❌ | ✅ | 4 |
| Quản lý người dùng | ❌ | ✅ | 4 |
| Quản lý thể loại & nghệ sĩ | ❌ | ✅ | 4 |
| Thống kê & báo cáo | ❌ | ✅ | 4 |
| Quản lý hệ thống | ❌ | ✅ | 5 |
| **TỔNG CỘNG** | **19** | **40** | **40 Use Cases** |

---

### 3.4.4. Đặc tả chi tiết các Use Case

#### **Hình 3.4: Ca sử dụng đăng ký**

| **Đặc tả ca sử dụng 001: Đăng ký** |  |
|---|---|
| **Mô tả ngắn:** | Người dùng tạo tài khoản mới để sử dụng dịch vụ nghe nhạc Coconut Music |
| **Các tác nhân tham gia:** | • Actor chính: User (Người dùng)<br/>• Actor phụ: Hệ thống email |
| **Điều kiện kích hoạt:** | • Người dùng truy cập trang đăng ký<br/>• Người dùng chưa có tài khoản trong hệ thống |
| **Luồng chính:** | 1. Người dùng truy cập vào trang đăng ký<br/>2. Hệ thống hiển thị form đăng ký (username, email, password, confirm password)<br/>3. Người dùng điền thông tin và bấm "Đăng ký"<br/>4. Hệ thống kiểm tra tính hợp lệ của dữ liệu<br/>5. Hệ thống tạo tài khoản mới với trạng thái chưa xác thực<br/>6. Hệ thống gửi email xác thực đến địa chỉ email đã đăng ký<br/>7. Hệ thống hiển thị thông báo "Đăng ký thành công, vui lòng kiểm tra email" |
| **Luồng phụ:** | **Luồng phụ 4a: Dữ liệu không hợp lệ**<br/>4a.1. Hệ thống hiển thị thông báo lỗi cụ thể<br/>4a.2. Quay lại bước 3<br/><br/>**Luồng phụ 5a: Email/Username đã tồn tại**<br/>5a.1. Hệ thống thông báo "Email/Username đã được sử dụng"<br/>5a.2. Quay lại bước 3 |
| **Điều kiện sau:** | • Tài khoản mới được tạo với trạng thái isVerified = false<br/>• Email xác thực được gửi thành công<br/>• Người dùng có thể đăng nhập nhưng bị hạn chế một số tính năng |
| **Điều kiện ngoại lệ:** | • Lỗi kết nối mạng<br/>• Lỗi server email<br/>• Database không khả dụng |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thường xuyên - mỗi người dùng mới |

---

#### **Đặc tả ca sử dụng 002: Đăng nhập**

| **Đặc tả ca sử dụng 002: Đăng nhập** |  |
|---|---|
| **Mô tả ngắn:** | Người dùng xác thực danh tính để truy cập vào hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: User (Người dùng)<br/>• Actor phụ: Hệ thống xác thực JWT |
| **Điều kiện kích hoạt:** | • Người dùng đã có tài khoản trong hệ thống<br/>• Người dùng muốn truy cập các tính năng cá nhân |
| **Luồng chính:** | 1. Người dùng truy cập trang đăng nhập<br/>2. Hệ thống hiển thị form đăng nhập (username/email, password)<br/>3. Người dùng nhập thông tin đăng nhập<br/>4. Hệ thống xác thực thông tin đăng nhập<br/>5. Hệ thống tạo JWT access token và refresh token<br/>6. Hệ thống lưu token vào localStorage<br/>7. Hệ thống chuyển hướng về trang chủ |
| **Luồng phụ:** | **Luồng phụ 4a: Thông tin đăng nhập sai**<br/>4a.1. Hệ thống hiển thị "Sai username/email hoặc mật khẩu"<br/>4a.2. Quay lại bước 3<br/><br/>**Luồng phụ 4b: Tài khoản bị khóa**<br/>4b.1. Hệ thống hiển thị "Tài khoản đã bị khóa"<br/>4b.2. Kết thúc ca sử dụng |
| **Điều kiện sau:** | • Người dùng được xác thực thành công<br/>• JWT token được lưu trên client<br/>• Người dùng có quyền truy cập các tính năng cá nhân |
| **Điều kiện ngoại lệ:** | • Quá nhiều lần đăng nhập sai (brute force attack)<br/>• Lỗi server xác thực<br/>• Database không khả dụng |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Rất thường xuyên - mỗi lần người dùng truy cập |

---

#### **Đặc tả ca sử dụng 003: Đăng xuất**

| **Đặc tả ca sử dụng 003: Đăng xuất** |  |
|---|---|
| **Mô tả ngắn:** | Người dùng kết thúc phiên làm việc và thoát khỏi hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập |
| **Điều kiện kích hoạt:** | • User đã đăng nhập vào hệ thống<br/>• User muốn kết thúc phiên làm việc |
| **Luồng chính:** | 1. User click nút "Đăng xuất" trên header<br/>2. Hệ thống hiển thị xác nhận "Bạn có chắc muốn đăng xuất?"<br/>3. User xác nhận đăng xuất<br/>4. Hệ thống xóa JWT token khỏi localStorage<br/>5. Hệ thống chuyển hướng về trang chủ<br/>6. Hiển thị thông báo "Đăng xuất thành công" |
| **Luồng phụ:** | **Luồng phụ 3a: User hủy đăng xuất**<br/>3a.1. User click "Hủy"<br/>3a.2. Quay lại trang hiện tại, giữ nguyên trạng thái đăng nhập |
| **Điều kiện sau:** | • JWT token bị xóa khỏi client<br/>• User ở trạng thái chưa đăng nhập<br/>• Không thể truy cập các tính năng cần đăng nhập |
| **Điều kiện ngoại lệ:** | • Lỗi xóa token<br/>• Lỗi chuyển hướng |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 004: Xác thực email**

| **Đặc tả ca sử dụng 004: Xác thực email** |  |
|---|---|
| **Mô tả ngắn:** | Người dùng xác thực địa chỉ email để kích hoạt đầy đủ tài khoản |
| **Các tác nhân tham gia:** | • Actor chính: User chưa xác thực<br/>• Actor phụ: Email Service |
| **Điều kiện kích hoạt:** | • User đã đăng ký tài khoản<br/>• User nhận được email xác thực<br/>• Token xác thực còn hiệu lực |
| **Luồng chính:** | 1. User mở email xác thực từ hệ thống<br/>2. User click vào link xác thực trong email<br/>3. Hệ thống kiểm tra tính hợp lệ của token<br/>4. Hệ thống cập nhật trạng thái isVerified = true<br/>5. Hiển thị trang "Xác thực thành công"<br/>6. User được chuyển đến trang đăng nhập |
| **Luồng phụ:** | **Luồng phụ 3a: Token hết hạn**<br/>3a.1. Hệ thống hiển thị "Link xác thực đã hết hạn"<br/>3a.2. Cung cấp nút "Gửi lại email xác thực"<br/><br/>**Luồng phụ 3b: Token không hợp lệ**<br/>3b.1. Hiển thị "Link xác thực không hợp lệ"<br/>3b.2. Chuyển đến trang đăng ký |
| **Điều kiện sau:** | • Tài khoản được kích hoạt hoàn toàn<br/>• User có thể sử dụng đầy đủ tính năng<br/>• Trạng thái verification được cập nhật |
| **Điều kiện ngoại lệ:** | • Token bị giả mạo<br/>• Database lỗi<br/>• Email service không khả dụng |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Một lần cho mỗi user |

---

#### **Đặc tả ca sử dụng 005: Quên mật khẩu**

| **Đặc tả ca sử dụng 005: Quên mật khẩu** |  |
|---|---|
| **Mô tả ngắn:** | Người dùng yêu cầu đặt lại mật khẩu khi quên mật khẩu cũ |
| **Các tác nhân tham gia:** | • Actor chính: User<br/>• Actor phụ: Email Service, Security Service |
| **Điều kiện kích hoạt:** | • User có tài khoản trong hệ thống<br/>• User quên mật khẩu hiện tại |
| **Luồng chính:** | 1. User click "Quên mật khẩu?" trên trang đăng nhập<br/>2. Hệ thống hiển thị form nhập email<br/>3. User nhập email đã đăng ký<br/>4. Hệ thống kiểm tra email có tồn tại không<br/>5. Hệ thống tạo reset token và gửi email<br/>6. User mở email và click link reset<br/>7. Hệ thống hiển thị form đặt mật khẩu mới<br/>8. User nhập mật khẩu mới và xác nhận<br/>9. Hệ thống cập nhật mật khẩu mới |
| **Luồng phụ:** | **Luồng phụ 4a: Email không tồn tại**<br/>4a.1. Hiển thị "Email không được tìm thấy"<br/>4a.2. Quay lại bước 3<br/><br/>**Luồng phụ 6a: Token reset hết hạn**<br/>6a.1. Hiển thị "Link đã hết hạn"<br/>6a.2. Yêu cầu gửi lại email reset |
| **Điều kiện sau:** | • Mật khẩu được cập nhật thành công<br/>• Reset token bị vô hiệu hóa<br/>• User có thể đăng nhập với mật khẩu mới |
| **Điều kiện ngoại lệ:** | • Email service lỗi<br/>• Token bị giả mạo<br/>• Mật khẩu mới không đủ mạnh |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 006: Đổi mật khẩu**

| **Đặc tả ca sử dụng 006: Đổi mật khẩu** |  |
|---|---|
| **Mô tả ngắn:** | User thay đổi mật khẩu hiện tại khi đã đăng nhập |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập<br/>• Actor phụ: Security Service |
| **Điều kiện kích hoạt:** | • User đã đăng nhập<br/>• User muốn thay đổi mật khẩu |
| **Luồng chính:** | 1. User truy cập trang "Cài đặt tài khoản"<br/>2. Click "Đổi mật khẩu"<br/>3. Nhập mật khẩu hiện tại<br/>4. Nhập mật khẩu mới và xác nhận<br/>5. Hệ thống validate mật khẩu cũ<br/>6. Kiểm tra độ mạnh mật khẩu mới<br/>7. Cập nhật mật khẩu trong database<br/>8. Hiển thị "Đổi mật khẩu thành công" |
| **Luồng phụ:** | **Luồng phụ 5a: Mật khẩu cũ sai**<br/>5a.1. Hiển thị "Mật khẩu hiện tại không đúng"<br/>5a.2. Quay lại bước 3<br/><br/>**Luồng phụ 6a: Mật khẩu mới yếu**<br/>6a.1. Hiển thị yêu cầu độ mạnh<br/>6a.2. Quay lại bước 4 |
| **Điều kiện sau:** | • Mật khẩu được cập nhật thành công<br/>• User tiếp tục đăng nhập bình thường<br/>• Không cần đăng nhập lại |
| **Điều kiện ngoại lệ:** | • User chưa đăng nhập<br/>• Database lỗi<br/>• Mật khẩu mới trùng với cũ |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 009: Xem chi tiết bài hát**

| **Đặc tả ca sử dụng 009: Xem chi tiết bài hát** |  |
|---|---|
| **Mô tả ngắn:** | User xem thông tin chi tiết của bài hát trước khi nghe |
| **Các tác nhân tham gia:** | • Actor chính: User |
| **Điều kiện kích hoạt:** | • User muốn xem thông tin bài hát<br/>• Bài hát có sẵn trong hệ thống |
| **Luồng chính:** | 1. User click vào tên bài hát hoặc icon "info"<br/>2. Hệ thống hiển thị modal/page thông tin chi tiết<br/>3. Hiển thị: tên bài hát, nghệ sĩ, album, thời lượng<br/>4. Hiển thị lượt nghe, ngày tải lên, thể loại<br/>5. Hiển thị hình ảnh bìa lớn và lyrics (nếu có)<br/>6. User có thể phát nhạc từ trang này<br/>7. User có thể thêm vào playlist hoặc yêu thích |
| **Luồng phụ:** | **Luồng phụ 6a: Phát nhạc ngay**<br/>6a.1. User click nút "Play"<br/>6a.2. Music player bắt đầu phát<br/><br/>**Luồng phụ 7a: Thêm vào yêu thích**<br/>7a.1. User click icon heart<br/>7a.2. Thêm/xóa khỏi danh sách yêu thích |
| **Điều kiện sau:** | • Thông tin chi tiết được hiển thị đầy đủ<br/>• User có thể thực hiện các thao tác khác<br/>• Lượt xem chi tiết được tăng |
| **Điều kiện ngoại lệ:** | • Bài hát bị xóa hoặc không tồn tại<br/>• Lỗi load thông tin metadata |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 010: Xem danh mục nhạc**

| **Đặc tả ca sử dụng 010: Xem danh mục nhạc** |  |
|---|---|
| **Mô tả ngắn:** | User duyệt nhạc theo các thể loại và danh mục có sẵn |
| **Các tác nhân tham gia:** | • Actor chính: User |
| **Điều kiện kích hoạt:** | • User muốn khám phá nhạc theo thể loại<br/>• Có danh mục nhạc trong hệ thống |
| **Luồng chính:** | 1. User truy cập trang chủ hoặc "Khám phá"<br/>2. Xem các danh mục: New Music, Trending, Top View, VN LoFi<br/>3. Click vào danh mục muốn xem<br/>4. Hệ thống hiển thị danh sách bài hát theo danh mục<br/>5. User có thể lọc thêm theo nghệ sĩ, thời gian<br/>6. Sắp xếp theo: mới nhất, phổ biến nhất, tên A-Z<br/>7. User phát nhạc trực tiếp từ danh sách |
| **Luồng phụ:** | **Luồng phụ 5a: Lọc nâng cao**<br/>5a.1. User chọn multiple filters<br/>5a.2. Hệ thống áp dụng all filters<br/><br/>**Luồng phụ 6a: Sắp xếp**<br/>6a.1. User chọn tiêu chí sắp xếp<br/>6a.2. Danh sách được render lại |
| **Điều kiện sau:** | • Danh sách bài hát theo danh mục được hiển thị<br/>• User có thể phát nhạc và thao tác<br/>• Pagination hoạt động đúng |
| **Điều kiện ngoại lệ:** | • Danh mục trống<br/>• Lỗi load dữ liệu<br/>• Filter không hợp lệ |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Rất thường xuyên |

---

#### **Đặc tả ca sử dụng 012: Xem lịch sử nghe nhạc**

| **Đặc tả ca sử dụng 012: Xem lịch sử nghe nhạc** |  |
|---|---|
| **Mô tả ngắn:** | User xem lại các bài hát đã nghe theo thời gian |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập |
| **Điều kiện kích hoạt:** | • User đã đăng nhập<br/>• User đã nghe ít nhất 1 bài hát |
| **Luồng chính:** | 1. User truy cập trang "Lịch sử"<br/>2. Hệ thống hiển thị danh sách bài hát đã nghe<br/>3. Sắp xếp theo thời gian nghe (mới nhất trước)<br/>4. Hiển thị: tên bài hát, nghệ sĩ, thời gian nghe<br/>5. User có thể lọc theo ngày/tuần/tháng<br/>6. User có thể phát lại bài hát từ lịch sử<br/>7. User có thể xóa lịch sử cụ thể |
| **Luồng phụ:** | **Luồng phụ 5a: Lọc theo thời gian**<br/>5a.1. User chọn khoảng thời gian<br/>5a.2. Hiển thị lịch sử trong khoảng đó<br/><br/>**Luồng phụ 7a: Xóa lịch sử**<br/>7a.1. User click "Xóa"<br/>7a.2. Xác nhận và xóa khỏi database |
| **Điều kiện sau:** | • Lịch sử được hiển thị theo thời gian<br/>• User có thể replay và thao tác<br/>• Dữ liệu được phân trang |
| **Điều kiện ngoại lệ:** | • User chưa đăng nhập<br/>• Chưa có lịch sử nghe nhạc<br/>• Lỗi load dữ liệu |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 015: Chỉnh sửa playlist**

| **Đặc tả ca sử dụng 015: Chỉnh sửa playlist** |  |
|---|---|
| **Mô tả ngắn:** | User cập nhật thông tin và cài đặt của playlist đã tạo |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập (chủ playlist) |
| **Điều kiện kích hoạt:** | • User đã có playlist<br/>• User muốn chỉnh sửa playlist |
| **Luồng chính:** | 1. User truy cập trang quản lý playlist<br/>2. Click "Chỉnh sửa" trên playlist cần sửa<br/>3. Cập nhật tên playlist, mô tả<br/>4. Thay đổi chế độ public/private<br/>5. Upload ảnh bìa mới (optional)<br/>6. Sắp xếp lại thứ tự bài hát (drag & drop)<br/>7. Click "Lưu thay đổi"<br/>8. Cập nhật database và hiển thị kết quả |
| **Luồng phụ:** | **Luồng phụ 5a: Thay đổi ảnh bìa**<br/>5a.1. User upload file ảnh mới<br/>5a.2. Xóa ảnh cũ khỏi storage<br/>5a.3. Cập nhật đường dẫn ảnh<br/><br/>**Luồng phụ 6a: Sắp xếp bài hát**<br/>6a.1. Drag & drop để thay đổi thứ tự<br/>6a.2. Cập nhật position trong database |
| **Điều kiện sau:** | • Thông tin playlist được cập nhật<br/>• Thay đổi được phản ánh trên UI<br/>• Thứ tự bài hát được lưu |
| **Điều kiện ngoại lệ:** | • User không phải chủ playlist<br/>• Playlist bị xóa<br/>• Lỗi upload ảnh |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 017: Xóa nhạc khỏi playlist**

| **Đặc tả ca sử dụng 017: Xóa nhạc khỏi playlist** |  |
|---|---|
| **Mô tả ngắn:** | User xóa bài hát khỏi playlist để tối ưu danh sách |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập (chủ playlist) |
| **Điều kiện kích hoạt:** | • User có playlist với ít nhất 1 bài hát<br/>• User muốn xóa bài hát khỏi playlist |
| **Luồng chính:** | 1. User mở playlist cần chỉnh sửa<br/>2. Click icon "X" hoặc "Remove" trên bài hát<br/>3. Hệ thống hiển thị xác nhận "Xóa bài hát khỏi playlist?"<br/>4. User xác nhận xóa<br/>5. Hệ thống xóa record trong playlist_music<br/>6. Cập nhật lại thứ tự các bài hát còn lại<br/>7. Hiển thị "Đã xóa khỏi playlist" |
| **Luồng phụ:** | **Luồng phụ 4a: User hủy xóa**<br/>4a.1. User click "Hủy"<br/>4a.2. Giữ nguyên playlist<br/><br/>**Luồng phụ 6a: Sắp xếp lại**<br/>6a.1. Auto reorder position<br/>6a.2. Cập nhật UI real-time |
| **Điều kiện sau:** | • Bài hát bị xóa khỏi playlist<br/>• Thứ tự được cập nhật lại<br/>• Số lượng bài hát giảm |
| **Điều kiện ngoại lệ:** | • User không phải chủ playlist<br/>• Bài hát không có trong playlist<br/>• Lỗi cập nhật database |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 018: Xóa playlist**

| **Đặc tả ca sử dụng 018: Xóa playlist** |  |
|---|---|
| **Mô tả ngắn:** | User xóa toàn bộ playlist không còn cần thiết |
| **Các tác nhân tham gia:** | • Actor chính: User đã đăng nhập (chủ playlist) |
| **Điều kiện kích hoạt:** | • User có ít nhất 1 playlist<br/>• User muốn xóa playlist |
| **Luồng chính:** | 1. User truy cập trang quản lý playlist<br/>2. Click "Xóa" trên playlist cần xóa<br/>3. Hệ thống hiển thị cảnh báo "Xóa playlist sẽ không thể khôi phục"<br/>4. User nhập tên playlist để xác nhận<br/>5. User click "Xác nhận xóa"<br/>6. Hệ thống xóa playlist và tất cả playlist_music<br/>7. Xóa ảnh bìa khỏi storage<br/>8. Hiển thị "Đã xóa playlist thành công" |
| **Luồng phụ:** | **Luồng phụ 4a: User hủy xóa**<br/>4a.1. User click "Hủy" hoặc đóng modal<br/>4a.2. Quay lại trang quản lý<br/><br/>**Luồng phụ 4b: Tên playlist không khớp**<br/>4b.1. Hiển thị "Tên playlist không đúng"<br/>4b.2. Yêu cầu nhập lại |
| **Điều kiện sau:** | • Playlist bị xóa hoàn toàn<br/>• Tất cả bài hát trong playlist bị xóa relation<br/>• File ảnh được dọn dẹp |
| **Điều kiện ngoại lệ:** | • User không phải chủ playlist<br/>• Playlist không tồn tại<br/>• Lỗi xóa file storage |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 019: Xem playlist công khai**

| **Đặc tả ca sử dụng 019: Xem playlist công khai** |  |
|---|---|
| **Mô tả ngắn:** | User khám phá và sao chép playlist public của người khác |
| **Các tác nhân tham gia:** | • Actor chính: User |
| **Điều kiện kích hoạt:** | • Có playlist public trong hệ thống<br/>• User muốn khám phá playlist mới |
| **Luồng chính:** | 1. User truy cập trang "Playlist công khai"<br/>2. Duyệt danh sách playlist public với phân trang<br/>3. Xem thông tin: tên, chủ sở hữu, số bài hát<br/>4. Click vào playlist để xem chi tiết<br/>5. Xem danh sách bài hát trong playlist<br/>6. User có thể phát nhạc từ playlist<br/>7. User có thể fork (sao chép) playlist về tài khoản |
| **Luồng phụ:** | **Luồng phụ 7a: Fork playlist**<br/>7a.1. User click "Sao chép playlist"<br/>7a.2. Nhập tên playlist mới<br/>7a.3. Tạo playlist copy về tài khoản user<br/><br/>**Luồng phụ 6a: Phát playlist**<br/>6a.1. Click "Phát tất cả"<br/>6a.2. Phát từ bài đầu tiên |
| **Điều kiện sau:** | • User xem được playlist public<br/>• Có thể phát nhạc và thao tác<br/>• Playlist được fork thành công (nếu có) |
| **Điều kiện ngoại lệ:** | • Không có playlist public<br/>• User chưa đăng nhập (không thể fork)<br/>• Lỗi sao chép playlist |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 022: Xóa nhạc (Admin)**

| **Đặc tả ca sử dụng 022: Xóa nhạc** |  |
|---|---|
| **Mô tả ngắn:** | Admin xóa bài hát khỏi hệ thống khi vi phạm bản quyền hoặc không phù hợp |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: File Management Service, Backup Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Có bài hát cần xóa khỏi hệ thống |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý nhạc"<br/>2. Tìm bài hát cần xóa<br/>3. Click "Xóa" và nhập lý do xóa<br/>4. Hệ thống hiển thị cảnh báo và danh sách playlist chứa bài hát<br/>5. Admin xác nhận xóa<br/>6. Backup file và metadata trước khi xóa<br/>7. Xóa bài hát khỏi tất cả playlist và favorites<br/>8. Xóa file nhạc và hình ảnh khỏi storage<br/>9. Cập nhật database và ghi log |
| **Luồng phụ:** | **Luồng phụ 4a: Bài hát trong nhiều playlist**<br/>4a.1. Hiển thị cảnh báo số playlist bị ảnh hưởng<br/>4a.2. Đề xuất thay thế bài hát khác<br/><br/>**Luồng phụ 6a: Backup trước khi xóa**<br/>6a.1. Tạo backup file và metadata<br/>6a.2. Lưu vào thư mục deleted_music |
| **Điều kiện sau:** | • Bài hát bị xóa hoàn toàn khỏi hệ thống<br/>• Tất cả reference bị cleanup<br/>• File backup được tạo |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Bài hát đang được phát<br/>• Lỗi xóa file storage |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 023: Phân loại nhạc (Admin)**

| **Đặc tả ca sử dụng 023: Phân loại nhạc** |  |
|---|---|
| **Mô tả ngắn:** | Admin gán nhãn và phân loại bài hát vào các danh mục đặc biệt |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Classification Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Có bài hát cần phân loại |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý phân loại"<br/>2. Chọn bài hát hoặc multiple selection<br/>3. Gán nhãn: New Music, Trending, Top View, VN LoFi<br/>4. Thiết lập thời gian hiệu lực (optional)<br/>5. Chọn vị trí ưu tiên trong danh mục<br/>6. Preview thay đổi trên frontend<br/>7. Click "Áp dụng phân loại"<br/>8. Cập nhật database và cache |
| **Luồng phụ:** | **Luồng phụ 4a: Đặt lịch auto**<br/>4a.1. Chọn ngày bắt đầu và kết thúc<br/>4a.2. Bài hát tự động vào/ra khỏi danh mục<br/><br/>**Luồng phụ 2a: Bulk classification**<br/>2a.1. Chọn nhiều bài hát cùng lúc<br/>2a.2. Áp dụng phân loại hàng loạt |
| **Điều kiện sau:** | • Bài hát được gán nhãn thành công<br/>• Xuất hiện trong danh mục tương ứng<br/>• Cache được refresh |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Bài hát không tồn tại<br/>• Lỗi cập nhật cache |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 026: Xem chi tiết hoạt động user (Admin)**

| **Đặc tả ca sử dụng 026: Xem chi tiết hoạt động user** |  |
|---|---|
| **Mô tả ngắn:** | Admin theo dõi chi tiết hoạt động và thống kê của từng user |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Analytics Service, Audit Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần kiểm tra hoạt động user cụ thể |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý người dùng"<br/>2. Click "Xem chi tiết" trên user cần kiểm tra<br/>3. Hiển thị dashboard user: thống kê nghe nhạc, playlist, favorites<br/>4. Xem lịch sử đăng nhập và IP addresses<br/>5. Thống kê hoạt động theo thời gian (biểu đồ)<br/>6. Danh sách playlist và bài hát yêu thích<br/>7. Log các hoạt động đáng ngờ (nếu có) |
| **Luồng phụ:** | **Luồng phụ 5a: Lọc theo thời gian**<br/>5a.1. Chọn khoảng thời gian cụ thể<br/>5a.2. Cập nhật biểu đồ và thống kê<br/><br/>**Luồng phụ 7a: Phát hiện bất thường**<br/>7a.1. Highlight hoạt động đáng ngờ<br/>7a.2. Đề xuất hành động (cảnh báo, khóa tạm) |
| **Điều kiện sau:** | • Admin có cái nhìn chi tiết về user<br/>• Phát hiện được hành vi bất thường<br/>• Có cơ sở để đưa ra quyết định |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• User không tồn tại<br/>• Lỗi load analytics data |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 027: Phân quyền admin (Admin)**

| **Đặc tả ca sử dụng 027: Phân quyền admin** |  |
|---|---|
| **Mô tả ngắn:** | Admin cấp hoặc thu hồi quyền quản trị cho user khác |
| **Các tác nhân tham gia:** | • Actor chính: Super Admin<br/>• Actor phụ: Role Management Service |
| **Điều kiện kích hoạt:** | • User có quyền Super Admin<br/>• Cần cấp/thu hồi quyền admin |
| **Luồng chính:** | 1. Super Admin truy cập trang "Quản lý quyền"<br/>2. Tìm user cần cấp/thu hồi quyền<br/>3. Click "Phân quyền" để mở modal<br/>4. Chọn role: User, Admin, Super Admin<br/>5. Nhập lý do thay đổi quyền<br/>6. Đặt thời gian hiệu lực (optional)<br/>7. Xác nhận thay đổi<br/>8. Hệ thống cập nhật role và gửi email thông báo |
| **Luồng phụ:** | **Luồng phụ 4a: Cấp quyền admin**<br/>4a.1. Chọn Admin role<br/>4a.2. User có thể truy cập admin panel<br/><br/>**Luồng phụ 4b: Thu hồi quyền**<br/>4b.1. Đổi về User role<br/>4b.2. Mất quyền truy cập admin functions |
| **Điều kiện sau:** | • Role user được cập nhật<br/>• Quyền truy cập thay đổi ngay lập tức<br/>• Email thông báo được gửi |
| **Điều kiện ngoại lệ:** | • Thiếu quyền Super Admin<br/>• Không thể thu hồi quyền của chính mình<br/>• User không tồn tại |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Hiếm khi |

---

#### **Đặc tả ca sử dụng 029: Chỉnh sửa thể loại (Admin)**

| **Đặc tả ca sử dụng 029: Chỉnh sửa thể loại** |  |
|---|---|
| **Mô tả ngắn:** | Admin cập nhật thông tin và hình ảnh của thể loại nhạc |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Category Management Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Có thể loại cần chỉnh sửa |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý thể loại"<br/>2. Click "Chỉnh sửa" trên thể loại cần sửa<br/>3. Cập nhật tên thể loại, mô tả<br/>4. Thay đổi hình ảnh đại diện<br/>5. Cập nhật màu sắc theme<br/>6. Thiết lập thứ tự hiển thị<br/>7. Click "Lưu thay đổi"<br/>8. Cập nhật database và refresh cache |
| **Luồng phụ:** | **Luồng phụ 4a: Thay đổi hình ảnh**<br/>4a.1. Upload file ảnh mới<br/>4a.2. Xóa ảnh cũ khỏi storage<br/>4a.3. Tạo thumbnail mới<br/><br/>**Luồng phụ 3a: Tên bị trùng**<br/>3a.1. Kiểm tra tên đã tồn tại<br/>3a.2. Hiển thị lỗi và đề xuất |
| **Điều kiện sau:** | • Thông tin thể loại được cập nhật<br/>• Thay đổi được phản ánh trên frontend<br/>• Cache được refresh |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Thể loại không tồn tại<br/>• Lỗi upload hình ảnh |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 030: Xóa thể loại (Admin)**

| **Đặc tả ca sử dụng 030: Xóa thể loại** |  |
|---|---|
| **Mô tả ngắn:** | Admin xóa thể loại không sử dụng và migrate bài hát sang thể loại khác |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Category Management Service, Migration Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Có thể loại cần xóa |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý thể loại"<br/>2. Click "Xóa" trên thể loại không cần<br/>3. Hệ thống hiển thị số bài hát đang sử dụng thể loại<br/>4. Admin chọn thể loại thay thế cho các bài hát<br/>5. Xác nhận việc migrate và xóa<br/>6. Hệ thống migrate tất cả bài hát sang thể loại mới<br/>7. Xóa thể loại và hình ảnh khỏi storage<br/>8. Cập nhật cache và hiển thị kết quả |
| **Luồng phụ:** | **Luồng phụ 3a: Thể loại có bài hát**<br/>3a.1. Hiển thị cảnh báo và số lượng bài hát<br/>3a.2. Bắt buộc chọn thể loại thay thế<br/><br/>**Luồng phụ 3b: Thể loại trống**<br/>3b.1. Xóa trực tiếp không cần migrate<br/>3b.2. Chỉ cần xác nhận |
| **Điều kiện sau:** | • Thể loại bị xóa hoàn toàn<br/>• Tất cả bài hát được migrate<br/>• File hình ảnh được cleanup |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Không có thể loại thay thế<br/>• Lỗi migration process |
| **Mức độ ưu tiên:** | Thấp (Nice to have) |
| **Tần suất sử dụng:** | Hiếm khi |

---

#### **Đặc tả ca sử dụng 031: Quản lý nghệ sĩ (Admin)**

| **Đặc tả ca sử dụng 031: Quản lý nghệ sĩ** |  |
|---|---|
| **Mô tả ngắn:** | Admin thêm và cập nhật thông tin nghệ sĩ trong hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Artist Management Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần thêm hoặc cập nhật thông tin nghệ sĩ |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý nghệ sĩ"<br/>2. Click "Thêm nghệ sĩ mới" hoặc "Chỉnh sửa"<br/>3. Nhập thông tin: tên nghệ sĩ, tiểu sử, quốc gia<br/>4. Upload hình ảnh đại diện và cover<br/>5. Thêm link social media (optional)<br/>6. Thiết lập trạng thái active/inactive<br/>7. Click "Lưu thông tin"<br/>8. Cập nhật database và tạo slug URL |
| **Luồng phụ:** | **Luồng phụ 4a: Upload nhiều ảnh**<br/>4a.1. Upload avatar và cover image<br/>4a.2. Tạo thumbnail và resize<br/>4a.3. Lưu tất cả variations<br/><br/>**Luồng phụ 8a: Tạo trang nghệ sĩ**<br/>8a.1. Generate artist page URL<br/>8a.2. Liên kết với các bài hát |
| **Điều kiện sau:** | • Thông tin nghệ sĩ được lưu<br/>• Trang nghệ sĩ được tạo<br/>• Liên kết với bài hát được cập nhật |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Tên nghệ sĩ đã tồn tại<br/>• Lỗi upload hình ảnh |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 033: Báo cáo bài hát phổ biến (Admin)**

| **Đặc tả ca sử dụng 033: Báo cáo bài hát phổ biến** |  |
|---|---|
| **Mô tả ngắn:** | Admin xem báo cáo top bài hát được nghe nhiều nhất theo nhiều tiêu chí |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Analytics Service, Reporting Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần xem báo cáo xu hướng nhạc |
| **Luồng chính:** | 1. Admin truy cập trang "Báo cáo & Thống kê"<br/>2. Chọn tab "Bài hát phổ biến"<br/>3. Thiết lập khoảng thời gian (ngày, tuần, tháng, năm)<br/>4. Lọc theo thể loại, nghệ sĩ (optional)<br/>5. Hệ thống tính toán và hiển thị top charts<br/>6. Xem chi tiết: số lượt nghe, tăng trưởng, ranking<br/>7. Export báo cáo ra Excel/PDF |
| **Luồng phụ:** | **Luồng phụ 4a: Lọc nâng cao**<br/>4a.1. Lọc theo multiple criteria<br/>4a.2. So sánh với kỳ trước<br/><br/>**Luồng phụ 6a: Drill down**<br/>6a.1. Click vào bài hát để xem chi tiết<br/>6a.2. Phân tích demographics nghe nhạc |
| **Điều kiện sau:** | • Báo cáo được hiển thị với biểu đồ<br/>• Admin nắm được xu hướng nhạc<br/>• File báo cáo được export (nếu cần) |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Không có dữ liệu trong khoảng thời gian<br/>• Lỗi tính toán analytics |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 034: Thống kê người dùng (Admin)**

| **Đặc tả ca sử dụng 034: Thống kê người dùng** |  |
|---|---|
| **Mô tả ngắn:** | Admin xem thống kê và phân tích hành vi người dùng |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: User Analytics Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần phân tích user behavior |
| **Luồng chính:** | 1. Admin truy cập trang "Thống kê người dùng"<br/>2. Xem biểu đồ user registration theo thời gian<br/>3. Phân tích user retention và churn rate<br/>4. Thống kê user activity: daily/monthly active users<br/>5. Xem top user có hoạt động tích cực nhất<br/>6. Phân tích demographics: độ tuổi, địa lý<br/>7. So sánh với các kỳ trước |
| **Luồng phụ:** | **Luồng phụ 5a: Phân tích user segments**<br/>5a.1. Chia user thành nhóm theo behavior<br/>5a.2. Heavy users, casual users, inactive<br/><br/>**Luồng phụ 6a: Geographic analysis**<br/>6a.1. Xem user distribution theo quốc gia/thành phố<br/>6a.2. Phân tích listening preferences theo vùng |
| **Điều kiện sau:** | • Admin hiểu rõ user base<br/>• Có insights để improve user experience<br/>• Dữ liệu để đưa ra business decisions |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Dữ liệu user không đủ<br/>• Lỗi analytics service |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 035: Xuất báo cáo (Admin)**

| **Đặc tả ca sử dụng 035: Xuất báo cáo** |  |
|---|---|
| **Mô tả ngắn:** | Admin export các loại báo cáo thống kê ra file để lưu trữ và chia sẻ |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Report Generation Service, File Export Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Có dữ liệu báo cáo cần export |
| **Luồng chính:** | 1. Admin ở trang báo cáo bất kỳ<br/>2. Click "Xuất báo cáo" hoặc "Export"<br/>3. Chọn định dạng: Excel, PDF, CSV<br/>4. Chọn dữ liệu cần export (charts, tables, summary)<br/>5. Thiết lập tên file và metadata<br/>6. Click "Tạo báo cáo"<br/>7. Hệ thống generate file và download<br/>8. Lưu log export activity |
| **Luồng phụ:** | **Luồng phụ 3a: Export Excel với charts**<br/>3a.1. Bao gồm cả biểu đồ và data<br/>3a.2. Format professional layout<br/><br/>**Luồng phụ 4a: Custom export**<br/>4a.1. Chọn specific columns/data<br/>4a.2. Apply filters trước khi export |
| **Điều kiện sau:** | • File báo cáo được tạo thành công<br/>• Auto download về máy admin<br/>• Log export được ghi lại |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Dữ liệu quá lớn để export<br/>• Lỗi generate file |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Thỉnh thoảng |

---

#### **Đặc tả ca sử dụng 037: Backup dữ liệu (Admin)**

| **Đặc tả ca sử dụng 037: Backup dữ liệu** |  |
|---|---|
| **Mô tả ngắn:** | Admin thực hiện sao lưu và khôi phục dữ liệu hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: Super Admin<br/>• Actor phụ: Backup Service, Storage Service |
| **Điều kiện kích hoạt:** | • Super Admin đã đăng nhập<br/>• Cần backup hoặc restore dữ liệu |
| **Luồng chính:** | 1. Super Admin truy cập trang "Backup & Restore"<br/>2. Chọn loại backup: Full, Incremental, Differential<br/>3. Chọn components: Database, Files, Configurations<br/>4. Thiết lập schedule backup tự động (optional)<br/>5. Click "Bắt đầu backup"<br/>6. Hệ thống thực hiện backup và hiển thị progress<br/>7. Backup file được lưu vào secure storage<br/>8. Gửi email thông báo kết quả |
| **Luồng phụ:** | **Luồng phụ 4a: Schedule backup**<br/>4a.1. Thiết lập lịch backup hàng ngày/tuần<br/>4a.2. Auto cleanup old backups<br/><br/>**Luồng phụ 6a: Restore process**<br/>6a.1. Chọn backup file để restore<br/>6a.2. Confirm và thực hiện restore |
| **Điều kiện sau:** | • Backup được tạo thành công<br/>• File backup lưu ở location an toàn<br/>• System hoạt động bình thường |
| **Điều kiện ngoại lệ:** | • Thiếu quyền Super Admin<br/>• Không đủ dung lượng storage<br/>• Lỗi backup process |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Định kỳ |

---

#### **Đặc tả ca sử dụng 038: Quản lý file và storage (Admin)**

| **Đặc tả ca sử dụng 038: Quản lý file và storage** |  |
|---|---|
| **Mô tả ngắn:** | Admin giám sát và quản lý dung lượng lưu trữ file trong hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Storage Management Service, File Cleanup Service |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần kiểm tra và quản lý storage |
| **Luồng chính:** | 1. Admin truy cập trang "Quản lý Storage"<br/>2. Xem tổng quan dung lượng: Used/Available/Total<br/>3. Phân tích theo loại file: Audio, Images, Documents<br/>4. Xem danh sách file lớn và cũ nhất<br/>5. Tìm file orphaned (không có reference)<br/>6. Thực hiện cleanup file không cần thiết<br/>7. Optimize storage và compress files |
| **Luồng phụ:** | **Luồng phụ 5a: Tìm orphaned files**<br/>5a.1. Scan files không có trong database<br/>5a.2. List để admin xem và xóa<br/><br/>**Luồng phụ 6a: Bulk cleanup**<br/>6a.1. Select multiple files để xóa<br/>6a.2. Xác nhận và thực hiện mass delete |
| **Điều kiện sau:** | • Storage được tối ưu<br/>• File không cần thiết bị cleanup<br/>• Dung lượng available tăng |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• File đang được sử dụng<br/>• Lỗi cleanup process |
| **Mức độ ưu tiên:** | Trung bình (Important) |
| **Tần suất sử dụng:** | Định kỳ |

---

#### **Đặc tả ca sử dụng 039: Xem log hệ thống (Admin)**

| **Đặc tả ca sử dụng 039: Xem log hệ thống** |  |
|---|---|
| **Mô tả ngắn:** | Admin theo dõi log hoạt động để phát hiện lỗi và hành vi bất thường |
| **Các tác nhân tham gia:** | • Actor chính: Admin<br/>• Actor phụ: Logging Service, Security Monitoring |
| **Điều kiện kích hoạt:** | • Admin đã đăng nhập<br/>• Cần kiểm tra log hệ thống |
| **Luồng chính:** | 1. Admin truy cập trang "System Logs"<br/>2. Chọn loại log: Application, Security, Database, Error<br/>3. Thiết lập filter: time range, level, user, IP<br/>4. Xem log entries với pagination<br/>5. Tìm kiếm log theo keyword<br/>6. Phân tích pattern và detect anomalies<br/>7. Export log cần thiết để phân tích |
| **Luồng phụ:** | **Luồng phụ 4a: Real-time monitoring**<br/>4a.1. Enable live log streaming<br/>4a.2. Auto refresh every few seconds<br/><br/>**Luồng phụ 6a: Security alerts**<br/>6a.1. Highlight suspicious activities<br/>6a.2. Auto alert via email/SMS |
| **Điều kiện sau:** | • Admin nắm được system health<br/>• Phát hiện được issues và threats<br/>• Log được archive properly |
| **Điều kiện ngoại lệ:** | • Thiếu quyền admin<br/>• Log service không khả dụng<br/>• Quá nhiều log entries |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Thường xuyên |

---

#### **Đặc tả ca sử dụng 040: Cài đặt hệ thống (Admin)**

| **Đặc tả ca sử dụng 040: Cài đặt hệ thống** |  |
|---|---|
| **Mô tả ngắn:** | Super Admin cấu hình các tham số và cài đặt toàn hệ thống |
| **Các tác nhân tham gia:** | • Actor chính: Super Admin<br/>• Actor phụ: Configuration Service, Email Template Service |
| **Điều kiện kích hoạt:** | • Super Admin đã đăng nhập<br/>• Cần thay đổi cấu hình hệ thống |
| **Luồng chính:** | 1. Super Admin truy cập trang "System Settings"<br/>2. Cấu hình general settings: site name, logo, timezone<br/>3. Thiết lập email configurations và SMTP<br/>4. Chỉnh sửa email templates (welcome, reset password, etc.)<br/>5. Cấu hình security settings: password policy, session timeout<br/>6. Thiết lập file upload limits và allowed extensions<br/>7. Click "Lưu cài đặt" và restart services |
| **Luồng phụ:** | **Luồng phụ 4a: Email template editor**<br/>4a.1. WYSIWYG editor cho email templates<br/>4a.2. Preview và test send email<br/><br/>**Luồng phụ 5a: Security hardening**<br/>5a.1. Enable 2FA requirement<br/>5a.2. IP whitelist/blacklist configuration |
| **Điều kiện sau:** | • Cấu hình hệ thống được cập nhật<br/>• Services restart với config mới<br/>• Thay đổi có hiệu lực ngay lập tức |
| **Điều kiện ngoại lệ:** | • Thiếu quyền Super Admin<br/>• Config values không hợp lệ<br/>• Lỗi restart services |
| **Mức độ ưu tiên:** | Cao (Essential) |
| **Tần suất sử dụng:** | Hiếm khi |

---

### 3.5. Mô tả ảnh minh họa cho các Use Case

*Mỗi Use Case cần có 1 ảnh minh họa theo format bảng như đã thấy trong UC001*

### 3.5.1. Template mô tả ảnh cho UC001 - Đăng ký:

**Hình 3.4: Ca sử dụng đăng ký** - Cần ảnh mô tả:
- **Màn hình:** Trang đăng ký với form có các trường: Username, Email, Password, Confirm Password
- **UI Elements:** Logo Coconut Music, form đăng ký, nút "Đăng ký", link "Đã có tài khoản? Đăng nhập"
- **Flow:** Mũi tên chỉ từ form → validation → email xác thực → thông báo thành công
- **Colors:** Theme xanh dương của Coconut Music, nền gradient
- **Style:** Modern, clean UI design

### 3.5.2. Danh sách ảnh cần tạo cho tất cả UC:

#### **A. User Use Cases (UC001-UC019):**

**UC001 - Đăng ký:**
- Màn hình: Form đăng ký + email verification flow
- Elements: Input fields, validation messages, success notification

**UC002 - Đăng nhập:**
- Màn hình: Login form với username/password
- Elements: Login button, "Remember me", "Forgot password" link

**UC003 - Đăng xuất:**
- Màn hình: Confirmation dialog "Bạn có chắc muốn đăng xuất?"
- Elements: Header với user menu, logout confirmation popup

**UC004 - Xác thực email:**
- Màn hình: Email verification page với success/error states
- Elements: Email icon, verification status, resend button

**UC005 - Quên mật khẩu:**
- Màn hình: Reset password flow (email input → email sent → new password)
- Elements: Email input, reset instructions, password strength meter

**UC006 - Đổi mật khẩu:**
- Màn hình: Change password form trong settings page
- Elements: Current password, new password, confirm fields

**UC007 - Nghe nhạc:**
- Màn hình: Music player interface với controls
- Elements: Play/pause, next/prev, volume, progress bar, song info

**UC008 - Tìm kiếm bài hát:**
- Màn hình: Search page với search bar và kết quả
- Elements: Search input, filters, song list, pagination

**UC009 - Xem chi tiết bài hát:**
- Màn hình: Song detail modal/page
- Elements: Large album art, song info, lyrics, action buttons

**UC010 - Xem danh mục nhạc:**
- Màn hình: Category browsing page
- Elements: Category cards (New Music, Trending, etc.), song grids

**UC011 - Cập nhật profile:**
- Màn hình: User profile edit page
- Elements: Avatar upload, profile form, save button

**UC012 - Xem lịch sử nghe nhạc:**
- Màn hình: History page với danh sách bài hát đã nghe
- Elements: Song list with timestamps, clear history option

**UC013 - Quản lý danh sách yêu thích:**
- Màn hình: Favorites page + heart icon interaction
- Elements: Heart button states, favorites list, remove options

**UC014 - Tạo playlist mới:**
- Màn hình: Create playlist modal
- Elements: Playlist name input, description, privacy settings, cover upload

**UC015 - Chỉnh sửa playlist:**
- Màn hình: Edit playlist page với drag & drop
- Elements: Editable fields, song reordering, cover change

**UC016 - Thêm nhạc vào playlist:**
- Màn hình: "Add to playlist" modal
- Elements: Playlist selection, create new playlist option

**UC017 - Xóa nhạc khỏi playlist:**
- Màn hình: Playlist với remove song actions
- Elements: Remove buttons, confirmation dialog

**UC018 - Xóa playlist:**
- Màn hình: Delete playlist confirmation
- Elements: Warning dialog, confirmation input, delete button

**UC019 - Xem playlist công khai:**
- Màn hình: Public playlists discovery page
- Elements: Playlist cards, fork/copy buttons, user info

#### **B. Admin Use Cases (UC020-UC040):**

**UC020 - Upload nhạc mới:**
- Màn hình: Admin upload form
- Elements: File upload area, metadata form, preview player

**UC021 - Chỉnh sửa thông tin nhạc:**
- Màn hình: Edit song admin interface
- Elements: Form fields, image upload, category selection

**UC022 - Xóa nhạc:**
- Màn hình: Delete confirmation với affected playlists
- Elements: Warning dialog, backup info, impact analysis

**UC023 - Phân loại nhạc:**
- Màn hình: Song categorization interface
- Elements: Bulk selection, category tags, priority settings

**UC024 - Xem danh sách người dùng:**
- Màn hình: User management table
- Elements: User list, search/filter, action buttons

**UC025 - Khóa/mở khóa tài khoản:**
- Màn hình: User actions panel
- Elements: Block/unblock buttons, reason input, email notification

**UC026 - Xem chi tiết hoạt động user:**
- Màn hình: User analytics dashboard
- Elements: Charts, activity timeline, statistics

**UC027 - Phân quyền admin:**
- Màn hình: Role management interface
- Elements: Role selection, permissions matrix, confirmation

**UC028 - Tạo thể loại nhạc mới:**
- Màn hình: Create category form
- Elements: Category name, description, image upload, color picker

**UC029 - Chỉnh sửa thể loại:**
- Màn hình: Edit category interface
- Elements: Form updates, image change, preview

**UC030 - Xóa thể loại:**
- Màn hình: Delete category với migration options
- Elements: Impact warning, replacement selection, migration progress

**UC031 - Quản lý nghệ sĩ:**
- Màn hình: Artist management interface
- Elements: Artist form, biography, social links, discography

**UC032 - Xem thống kê tổng quan:**
- Màn hình: Admin dashboard
- Elements: KPI cards, charts, trend analysis

**UC033 - Báo cáo bài hát phổ biến:**
- Màn hình: Popular songs analytics
- Elements: Top charts, trending graphs, export options

**UC034 - Thống kê người dùng:**
- Màn hình: User analytics dashboard
- Elements: User growth charts, demographics, retention metrics

**UC035 - Xuất báo cáo:**
- Màn hình: Report export interface
- Elements: Format selection, date range, download progress

**UC036 - Quản lý banner/quảng cáo:**
- Màn hình: Banner management interface
- Elements: Banner list, drag & drop ordering, preview

**UC037 - Backup dữ liệu:**
- Màn hình: Backup & restore interface
- Elements: Backup options, schedule settings, progress bar

**UC038 - Quản lý file và storage:**
- Màn hình: Storage management dashboard
- Elements: Storage usage charts, file browser, cleanup tools

**UC039 - Xem log hệ thống:**
- Màn hình: System logs viewer
- Elements: Log entries, filters, search, real-time updates

**UC040 - Cài đặt hệ thống:**
- Màn hình: System configuration panel
- Elements: Settings tabs, configuration forms, email templates

### 3.5.3. Công cụ đề xuất để tạo ảnh:

**Option 1: AI Image Generation:**
- **Midjourney** hoặc **DALL-E 3**: Tạo UI mockups với prompt chi tiết
- **Stable Diffusion**: Miễn phí, có thể tạo UI design

**Option 2: Design Tools:**
- **Figma**: Tạo wireframes và UI designs chuyên nghiệp
- **Adobe XD**: Design tool mạnh mẽ cho UI/UX
- **Canva**: Đơn giản, có templates cho app UI

**Option 3: Mockup Tools:**
- **Balsamiq**: Tạo wireframes nhanh
- **MockFlow**: Web-based mockup tool
- **Draw.io**: Miễn phí, tạo flowcharts và UI mockups

### 3.5.4. Mẫu prompt để tạo ảnh với AI:

```
"Modern music streaming app interface for [UC Name], showing [specific screen],
featuring clean design with blue gradient theme, mobile-first responsive layout,
including [specific UI elements], professional UX design, flat design style,
Spotify/Apple Music inspired interface"
```

**Ví dụ cho UC001:**
```
"Modern music streaming app registration screen, showing signup form with username,
email, password fields, Coconut Music logo, blue gradient background, clean material
design, mobile responsive layout, success notification popup, professional UX design"
```

---
