# RecruitHub - Hệ thống Quản lý Tuyển dụng

## 📱 Giới thiệu dự án

**RecruitHub** là một nền tảng tuyển dụng hiện đại được xây dựng với React, cho phép:

- **Ứng viên** tìm kiếm và nộp đơn xin việc
- **HR** quản lý công việc, ứng viên, phỏng vấn
- **Interviewer** quản lý lịch phỏng vấn và đánh giá ứng viên
- **Admin** quản lý toàn bộ hệ thống

## ✨ Tính năng chính

### 🏠 Trang Chủ (HomePage)
```
- Hero banner với search bar tìm kiếm
- Thống kê tuyển dụng (tổng công việc, ứng viên, phỏng vấn)
- Danh sách công việc nổi bật
- Call-to-action đăng ký/đăng nhập
```

### 💼 Tìm Việc Làm (Jobs Page)
```
Tính năng:
✓ Tìm kiếm theo từ khóa (vị trí, công ty)
✓ Lọc theo địa điểm
✓ Lọc theo loại hình (Full-time, Part-time, etc)
✓ Xem chi tiết công việc
✓ Ứng tuyển công việc (cho candidate)

Dữ liệu hiển thị:
- Tiêu đề việc làm
- Công ty & logo
- Mức lương
- Kinh nghiệm yêu cầu
- Địa điểm làm việc
```

### 🏢 Khám Phá Công Ty (Companies Page)
```
Tính năng:
✓ Duyệt danh sách công ty
✓ Lọc theo ngành công nghiệp
✓ Xem thông tin công ty
✓ Theo dõi công ty
✓ Xem các việc làm của công ty

Dữ liệu hiển thị:
- Tên & logo công ty
- Ngành công nghiệp
- Số lượng nhân viên
- Địa điểm
- Rating công ty
- Số lượng việc làm đang mở
```

### 🔐 Đăng Nhập & Đăng Ký (Auth)
```
Tính năng:
✓ Chọn vai trò trước đăng nhập
✓ Đăng nhập nhanh (Quick Login) - cho demo
✓ Đăng ký tài khoản mới
✓ Quên mật khẩu

Vai trò có sẵn:
- 👤 Ứng viên (Candidate)
- 👨‍💼 Admin
- 👥 HR Manager
- 🎤 Interviewer
```

### 📊 Dashboard theo Vai trò

#### Admin Dashboard
```
Hiển thị:
- Tổng users: 1250
- Tổng jobs: 89
- Tổng applications: 543
- Tổng interviews: 234

Tính năng:
✓ Quản lý User (/users)
✓ Cấu hình Pipeline (/pipeline)
✓ Xem lịch phỏng vấn (/interviews)
✓ Xem chi tiết phỏng vấn (/interviews/:id)
```

#### HR Dashboard
```
Hiển thị:
- Việc làm đang mở: 12
- Đơn chờ xử lý: 87
- Phỏng vấn lên lịch: 25
- Offer đang mở: 3

Tính năng:
✓ Quản lý Job
✓ Quản lý Ứng viên
✓ Pipeline Ứng tuyển
✓ Quản lý Phỏng vấn
✓ Đánh giá & Offer
✓ Báo cáo
```

#### Interviewer Dashboard
```
Hiển thị:
- Tổng phỏng vấn: 15
- Sắp phỏng vấn: 5
- Đã hoàn thành: 9
- Chưa đánh giá: 2

Tính năng:
✓ Xem lịch phỏng vấn sắp tới
✓ Vào phòng họp (Google Meet)
✓ Xem lịch phỏng vấn của mình
✓ Lịch sử đánh giá
✓ Thống kê phỏng vấn
```

#### Candidate Dashboard
```
Hiển thị:
- Đã ứng tuyển: 12
- Chờ xử lý: 5
- Phỏng vấn: 2
- Nhận Offer: 1

Tính năng:
✓ Xem trạng thái ứng tuyển
✓ Xem chi tiết đơn ứng tuyển
✓ Các việc làm được lưu
✓ Thống kê ứng tuyển
✓ Cập nhật hồ sơ
```

### 👤 Hồ sơ Cá nhân (Profile)
```
Tính năng:
✓ Xem/chỉnh sửa thông tin cá nhân
✓ Thay đổi mật khẩu
✓ Cập nhật avatar
✓ Quản lý CV
✓ Đăng xuất
```

## 🎨 Thiết kế & Giao diện

### Màu sắc
```
Primary (Xanh):        #667eea
Secondary (Tím):       #764ba2
Accent (Xanh lá):      #10b981
Orange:                #ff6b35
Background:            #f5f5f5
White:                 #ffffff
Text:                  #333333
Muted:                 #999999
```

### Bố cục chủ yếu
```
┌─────────────────────────────────────┐
│          HEADER (Fixed)             │
│  Logo  │  Nav  │  Auth/Dashboard    │
├─────────────────────────────────────┤
│                                     │
│         MAIN CONTENT                │
│                                     │
├─────────────────────────────────────┤
│              FOOTER                 │
└─────────────────────────────────────┘
```

## 🔄 Luồng Điều hướng

```
Người dùng chưa đăng nhập:
┌─────────────────────────────────────────┐
│ Trang Chủ → Tìm Việc → Công Ty         │
│    ↓                                     │
│ Đăng Nhập/Đăng Ký                      │
│    ↓                                     │
└─────────────────────────────────────────┘

Sau khi đăng nhập:
┌─────────────────────────────────────────┐
│ Header: Trang chủ | Việc làm | Công ty │
│         Dashboard | Profile              │
│    ↓                                     │
│ Dashboard theo vai trò                  │
│    ↓                                     │
│ Các trang quản lý (/users, /pipeline)   │
│    ↓                                     │
│ Hồ sơ cá nhân → Đăng xuất               │
└─────────────────────────────────────────┘
```

## 📁 Cấu trúc thư mục

```
src/
├── assets/
│   ├── css/
│   │   └── globalStyles/
│   │       └── globalStyles.scss
│   ├── fonts/
│   │   └── Inter/
│   └── imgs/
├── components/
│   └── layouts/
│       ├── header/
│       │   ├── Header.js
│       │   ├── Header.module.scss
│       │   └── headerComp/
│       ├── footer/
│       │   ├── Footer.js
│       │   └── Footer.module.scss
│       ├── defaultlayout/
│       │   └── DefaultLayout.js
│       └── Sidebar/
├── pages/
│   ├── home/
│   │   ├── HomePage.js
│   │   └── HomePage.module.scss
│   ├── jobs/
│   │   ├── Jobs.js
│   │   └── Jobs.module.scss
│   ├── companies/
│   │   ├── Companies.js
│   │   └── Companies.module.scss
│   ├── auth/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ForgotPassword.js
│   │   └── Auth.module.scss
│   ├── admin/
│   │   ├── AdminDashboard.js
│   │   ├── users.js
│   │   ├── pipeline.js
│   │   └── Dashboard.module.scss
│   ├── hr/
│   │   └── HRDashboard.js
│   ├── interviewer/
│   │   ├── InterviewerDashboard.js
│   │   ├── MyInterviews.js
│   │   └── InterviewDetail.js
│   ├── candidate/
│   │   └── CandidateDashboard.js
│   └── profile/
│       └── Profile.js
├── routers/
│   ├── AppRouter.js
│   └── routes.js
├── utils/
│   ├── auth.js
│   └── testHelpers.js
├── App.js
└── index.js
```

## 🚀 Cách sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm start
```

App sẽ mở tại `http://localhost:3000`

### 3. Test các vai trò khác nhau

**Phương pháp 1: Đăng nhập nhanh**
1. Click "Đăng nhập" trên Header
2. Click một trong 4 nút "Đăng nhập nhanh":
   - Ứng viên
   - Admin
   - HR
   - Interviewer

**Phương pháp 2: Form đăng nhập**
1. Click "Đăng nhập"
2. Chọn vai trò từ dropdown
3. Nhập email & password
4. Click "Đăng nhập"

### 4. Điều hướng sau đăng nhập
- Mỗi vai trò sẽ được điều hướng tới `/dashboard` của role đó
- Header sẽ hiển thị nút "Dashboard"
- Click avatar để xem Profile & Đăng xuất

## 💾 Lưu trữ dữ liệu

### LocalStorage Keys
```javascript
// Thông tin user (JSON)
localStorage.getItem('user')
// {"id": 1, "name": "User", "email": "user@example.com", "role": "admin"}

// Vai trò hiện tại
localStorage.getItem('userRole')
// "admin" | "hr" | "interviewer" | "candidate"
```

### Helper Functions

```javascript
// Import từ src/utils/auth.js
import { loginUser, logoutUser, isLoggedIn, getUserRole } from '../utils/auth';

// Đăng nhập
loginUser('admin'); // 'admin', 'hr', 'interviewer', 'candidate'

// Đăng xuất
logoutUser();

// Check đăng nhập
if (isLoggedIn()) { ... }

// Lấy vai trò
const role = getUserRole();
```

## 🔐 Bảo mật (Lưu ý)

⚠️ **Hiện tại đây là demo frontend - chỉ sử dụng localStorage**

Khi phát triển production:
- [ ] Xoá localStorage authentication
- [ ] Tích hợp JWT tokens từ backend
- [ ] Lưu tokens trong httpOnly cookies
- [ ] Implement proper logout
- [ ] Add CSRF protection
- [ ] Validate permissions trên backend

## 📝 Các tính năng có thể phát triển

### Phase 1 (Hiện tại)
✅ Giao diện UI/UX
✅ Routing & Navigation
✅ Local authentication (Demo)
✅ Multiple role dashboards

### Phase 2
- [ ] Backend API integration
- [ ] Real database
- [ ] JWT Authentication
- [ ] File upload (CV, Avatar)
- [ ] Search & Advanced filters
- [ ] Pagination

### Phase 3
- [ ] Real-time notifications
- [ ] Video interview (Zoom/Google Meet integration)
- [ ] Email notifications
- [ ] Analytics & Reports
- [ ] Mobile app (React Native)

### Phase 4
- [ ] AI-powered job matching
- [ ] Chatbot support
- [ ] Payment integration
- [ ] Subscription plans
- [ ] Multi-language support

## 🛠 Tech Stack

```
Frontend:
- React 18
- React Router DOM v6
- SCSS/SCSS Modules
- Axios (sẵn sàng)

Build Tool:
- Create React App
- Webpack (via CRA)
- Babel

Optional (sẵn sàng):
- Redux/Context API (State management)
- React Query (Data fetching)
- Material-UI / Ant Design (Component library)
```

## 👥 Các vai trò & Quyền hạn

| Tính năng | Candidate | Interviewer | HR | Admin |
|-----------|-----------|-------------|-------|-------|
| Browse Jobs | ✅ | ❌ | ✅ | ✅ |
| Apply Jobs | ✅ | ❌ | ❌ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |
| Manage Jobs | ❌ | ❌ | ✅ | ✅ |
| Conduct Interviews | ❌ | ✅ | ✅ | ✅ |
| View Reports | ❌ | ❌ | ✅ | ✅ |

## 🎯 Hướng phát triển

1. **API Integration**: Kết nối với backend API
2. **State Management**: Nâng cấp từ useState sang Redux/Context
3. **Authentication**: Thay thế localStorage bằng JWT
4. **Real-time**: Thêm WebSocket cho notifications
5. **Testing**: Unit tests & E2E tests
6. **Performance**: Code splitting, lazy loading
7. **SEO**: Meta tags, sitemap, robots.txt

## 📞 Liên hệ & Support

Dự án này được phát triển cho hệ thống tuyển dụng hiện đại.

---

**Phiên bản**: 1.0.0  
**Status**: 🚀 In Development  
**Last Updated**: 2024
