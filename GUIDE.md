# Recruitment Candidate Tracking System - Frontend

## 🚀 Giới thiệu

Đây là hệ thống quản lý tuyển dụng frontend được xây dựng bằng React. Ứng dụng hỗ trợ 4 vai trò chính:

- **Ứng viên (Candidate)**: Tìm kiếm công việc, nộp đơn, theo dõi trạng thái
- **HR**: Quản lý công việc, ứng viên, phỏng vấn
- **Interviewer**: Quản lý lịch phỏng vấn, đánh giá ứng viên
- **Admin**: Quản lý toàn bộ hệ thống

## 📋 Tính năng chính

### 1. Trang chủ (HomePage)
- Hero banner với banner tìm kiếm
- Hiển thị thống kê tuyển dụng
- Danh sách công việc nổi bật

### 2. Tìm kiếm công việc (Jobs)
- Tìm kiếm theo tiêu đề, công ty
- Lọc theo địa điểm, loại hình
- Xem chi tiết công việc

### 3. Đăng nhập & Đăng ký (Auth)
- Chọn vai trò trước khi đăng nhập
- Đăng nhập nhanh (Quick Login) cho demo
- Tạo tài khoản mới

### 4. Dashboard theo vai trò
- **Admin Dashboard**: Quản lý user, pipeline, phỏng vấn
- **HR Dashboard**: Quản lý job, ứng viên, phỏng vấn
- **Interviewer Dashboard**: Lịch phỏng vấn, đánh giá
- **Candidate Dashboard**: Trạng thái ứng tuyển, offer

### 5. Hồ sơ cá nhân (Profile)
- Xem/sửa thông tin cá nhân
- Thay đổi mật khẩu
- Đăng xuất

## 🎨 Thiết kế

### Màu sắc chính
- **Primary**: #667eea (Xanh)
- **Secondary**: #764ba2 (Tím)
- **Accent**: #10b981 (Xanh lá)
- **Orange**: #ff6b35

### Bố cục
- Header cố định với navigation
- Content chính
- Footer trang

## 🧪 Hướng dẫn sử dụng

### 1. Đăng nhập Demo
1. Click "Đăng nhập" trên Header
2. Chọn vai trò muốn test (Ứng viên/Admin/HR/Interviewer)
3. Dùng nút "Đăng nhập nhanh" để đăng nhập ngay

### 2. Xem Dashboard
Mỗi vai trò có dashboard khác nhau với thống kê và tính năng quản lý riêng

### 3. Điều hướng
- Khi đã đăng nhập, Header sẽ hiển thị nút "Dashboard"
- Click avatar để xem dropdown menu (Hồ sơ cá nhân, Đăng xuất)

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── layouts/
│   │   ├── header/         # Component Header
│   │   ├── footer/         # Component Footer
│   │   └── defaultlayout/  # Layout mặc định
│   └── ...
├── pages/
│   ├── home/              # Trang chủ
│   ├── jobs/              # Tìm việc
│   ├── auth/              # Đăng nhập/Đăng ký
│   ├── admin/             # Admin Dashboard
│   ├── hr/                # HR Dashboard
│   ├── interviewer/       # Interviewer Dashboard
│   ├── candidate/         # Candidate Dashboard
│   └── profile/           # Hồ sơ cá nhân
├── routers/
│   ├── AppRouter.js       # Router chính
│   └── routes.js          # Route configuration
├── utils/
│   └── auth.js            # Helper auth
└── assets/
    ├── css/               # Global styles
    ├── fonts/             # Font files
    └── imgs/              # Images
```

## 🔑 Các vai trò và Route tương ứng

### Admin Routes
- `/dashboard` - Admin Dashboard
- `/users` - Quản lý User
- `/pipeline` - Cấu hình Pipeline
- `/interviews` - Lịch phỏng vấn
- `/interviews/:id` - Chi tiết phỏng vấn
- `/profile` - Hồ sơ

### HR Routes
- `/dashboard` - HR Dashboard
- `/interviews` - Lịch phỏng vấn
- `/interviews/:id` - Chi tiết
- `/profile` - Hồ sơ

### Interviewer Routes
- `/dashboard` - Interviewer Dashboard
- `/interviews` - Lịch phỏng vấn
- `/interviews/:id` - Chi tiết
- `/profile` - Hồ sơ

### Candidate Routes
- `/dashboard` - Candidate Dashboard
- `/profile` - Hồ sơ

### Public Routes
- `/` - Trang chủ
- `/jobs` - Tìm việc
- `/login` - Đăng nhập
- `/register` - Đăng ký
- `/forgot-password` - Quên mật khẩu

## 💾 Lưu trữ Local Storage

Ứng dụng sử dụng localStorage để lưu:
- `user` - Thông tin user (JSON)
- `userRole` - Vai trò: admin, hr, interviewer, candidate

Ví dụ:
```javascript
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'User',
  email: 'user@example.com',
  role: 'admin'
}));
localStorage.setItem('userRole', 'admin');
```

## 🚀 Chạy ứng dụng

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm start

# App sẽ mở tại http://localhost:3000
```

## 🎯 Các tính năng có thể phát triển tiếp

- [ ] Tích hợp API backend
- [ ] JWT Authentication
- [ ] Pagination cho danh sách dài
- [ ] Advanced search & filter
- [ ] File upload (CV, avatar)
- [ ] Real-time notifications
- [ ] Video interview integration
- [ ] Export reports (PDF)
- [ ] Email notifications
- [ ] Mobile responsive optimization

## 📝 Ghi chú phát triển

### Styling
- Sử dụng SCSS Modules cho component-level styling
- Global styles trong `src/assets/css/`
- Font từ `src/assets/fonts/`

### Navigation
- Dùng `react-router-dom` v6 với `<Link>` components
- AppRouter.js xử lý routing dựa vào user role
- Header component tự động cập nhật dựa vào login state

### State Management
- Hiện tại: Local state (useState)
- Có thể upgrade sang Redux/Context API khi phức tạp hơn

## 👨‍💻 Tác giả
Xây dựng cho hệ thống tuyển dụng hiện đại

---
**Trạng thái**: Đang phát triển
**Phiên bản**: 1.0.0
