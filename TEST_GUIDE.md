# 🧪 RecruitHub - Hướng dẫn Testing

## 🎯 Mục đích

Tài liệu này hướng dẫn cách test toàn bộ tính năng của ứng dụng RecruitHub.

## 🚀 Bước 1: Chuẩn bị

### Khởi động ứng dụng
```bash
npm install    # Nếu chưa cài
npm start      # Chạy dev server
```

App sẽ mở tại `http://localhost:3000`

## 📋 Các test cases

### 1️⃣ Test Trang Chủ (HomePage)

**Test Case 1.1: Hiển thị Trang Chủ**
```
✓ Mở http://localhost:3000
✓ Thấy Header với logo RecruitHub
✓ Thấy navigation: Trang chủ | Việc làm | Công ty
✓ Thấy nút "Đăng nhập" và "Đăng ký"
✓ Thấy hero banner với search bar
✓ Thấy phần thống kê (4 số liệu)
✓ Thấy danh sách công việc nổi bật (6 cards)
✓ Thấy Footer với thông tin
```

**Test Case 1.2: Click vào "Việc làm"**
```
✓ Click menu "Việc làm"
✓ Chuyển hướng tới /jobs
✓ Hiển thị danh sách công việc với filter
```

**Test Case 1.3: Click vào "Công ty"**
```
✓ Click menu "Công ty"
✓ Chuyển hướng tới /companies
✓ Hiển thị grid công ty
```

### 2️⃣ Test Tìm Việc (Jobs Page)

**Test Case 2.1: Filter & Search**
```
✓ Nhập từ khóa tìm kiếm (ví dụ: "React")
✓ Danh sách update chỉ hiển thị "React Developer"
✓ Click "Xóa bộ lọc"
✓ Danh sách quay về ban đầu
```

**Test Case 2.2: Filter theo địa điểm**
```
✓ Chọn "Ho Chi Minh" từ dropdown
✓ Chỉ hiển thị jobs ở Ho Chi Minh
✓ Chọn "Ha Noi"
✓ Chỉ hiển thị jobs ở Ha Noi
```

**Test Case 2.3: Hover và Click Job Card**
```
✓ Hover vào job card
✓ Card có shadow effect
✓ Click "Chi tiết →"
✓ (Có thể phát triển trang chi tiết sau)
```

### 3️⃣ Test Khám Phá Công ty (Companies Page)

**Test Case 3.1: Hiển thị Công ty**
```
✓ Mở /companies
✓ Thấy grid 6 công ty
✓ Mỗi card hiển thị: logo, tên, rating, ngành, địa điểm
✓ Thấy số lượng job đang mở
```

**Test Case 3.2: Search & Filter**
```
✓ Nhập tên công ty (ví dụ: "Tech")
✓ Filter công ty theo tên
✓ Chọn ngành từ dropdown
✓ Filter theo ngành công nghiệp
```

**Test Case 3.3: Action Buttons**
```
✓ Click "Theo dõi" → button style thay đổi
✓ Click "Xem việc làm →" → Chuyển tới /jobs
```

### 4️⃣ Test Đăng Nhập (Login Page)

**Test Case 4.1: Hiển thị Form Đăng nhập**
```
✓ Click "Đăng nhập" trên Header
✓ Chuyển tới /login
✓ Thấy form với các field:
  - Dropdown chọn vai trò
  - Email input
  - Password input
  - "Quên mật khẩu?" link
  - Button "Đăng nhập"
✓ Thấy divider "HOẶC ĐĂNG NHẬP NHANH"
✓ Thấy 4 nút quick login: Ứng viên, Admin, HR, Interviewer
```

**Test Case 4.2: Đăng nhập nhanh - Ứng viên**
```
✓ Click nút "Ứng viên"
✓ Chuyển hướng tới /dashboard
✓ Header thay đổi:
  - Hiển thị "Dashboard" button
  - Hiển thị avatar dropdown
```

**Test Case 4.3: Đăng nhập nhanh - Admin**
```
✓ Quay lại /login
✓ Click nút "Admin"
✓ Chuyển tới /dashboard
✓ Thấy Admin Dashboard với stats (1250 users, 89 jobs, etc)
✓ Thấy 4 management cards: User, Pipeline, Reports, Config
✓ Thấy bảng "Recent Users"
```

**Test Case 4.4: Đăng nhập nhanh - HR**
```
✓ Quay lại /login
✓ Click nút "HR"
✓ Chuyển tới /dashboard
✓ Thấy HR Dashboard với stats khác nhau
✓ Thấy các tính năng quản lý HR
```

**Test Case 4.5: Đăng nhập nhanh - Interviewer**
```
✓ Quay lại /login
✓ Click nút "Interviewer"
✓ Chuyển tới /dashboard
✓ Thấy Interviewer Dashboard
✓ Thấy lịch phỏng vấn sắp tới
✓ Thấy các stats phỏng vấn
```

### 5️⃣ Test Form Đăng nhập Thủ công

**Test Case 5.1: Chọn vai trò**
```
✓ Mở /login
✓ Click dropdown "Chọn vai trò"
✓ Thấy 4 option: Ứng viên, Admin, HR, Interviewer
✓ Chọn "Admin"
✓ Dropdown shows "Admin" đã chọn
```

**Test Case 5.2: Điền form**
```
✓ Nhập email: admin@example.com
✓ Nhập password: password123
✓ Điền đầy đủ không có lỗi
```

**Test Case 5.3: Click Đăng nhập**
```
✓ Click button "Đăng nhập"
✓ Chuyển tới /dashboard
✓ Vai trò được áp dụng (check via Header)
```

### 6️⃣ Test Admin Dashboard

**Test Case 6.1: Hiển thị Dashboard**
```
✓ Đăng nhập với Admin
✓ Thấy header gradient (#667eea → #764ba2)
✓ Title "Dashboard Admin"
✓ Subtitle "Quản lý tuyển dụng"
```

**Test Case 6.2: Stats Cards**
```
✓ Thấy 4 stat cards:
  - 👥 1250 Tổng người dùng
  - 💼 89 Tổng jobs
  - 📊 543 Tổng applications
  - 📅 234 Tổng interviews
✓ Card có hover effect (shadow, translateY)
```

**Test Case 6.3: Stat Cards Links**
```
✓ Click vào card "Tổng người dùng"
✓ Chuyển hướng tới /users
✓ Quay lại /dashboard
✓ Click vào card "Tổng jobs"
✓ (Nếu có route) chuyển hướng
```

**Test Case 6.4: Management Cards**
```
✓ Thấy 6 management cards:
  - User Management
  - Pipeline Config
  - Reports
  - System Config
  - (các card khác)
✓ Click "User Management"
✓ Chuyển tới /users
✓ Quay lại, click "Pipeline Config"
✓ Chuyển tới /pipeline
```

### 7️⃣ Test Candidate Dashboard

**Test Case 7.1: Hiển thị Dashboard**
```
✓ Đăng nhập với "Ứng viên"
✓ Thấy Candidate Dashboard
✓ Stats khác Admin (Đã ứng tuyển, Chờ xử lý, etc)
```

**Test Case 7.2: Application List**
```
✓ Thấy danh sách đơn ứng tuyển
✓ Mỗi card hiển thị:
  - Vị trí công việc
  - Công ty
  - Trạng thái (Chờ xử lý / Phỏng vấn / Offer)
  - Ngày ứng tuyển
  - "Xem chi tiết →" link
```

**Test Case 7.3: Status Badge Colors**
```
✓ Status "Chờ xử lý" → Màu vàng (#ffc107)
✓ Status "Phỏng vấn" → Màu xanh da trời (#17a2b8)
✓ Status "Nhận Offer" → Màu xanh (#28a745)
```

### 8️⃣ Test Header & Navigation

**Test Case 8.1: Header khi chưa đăng nhập**
```
✓ Thấy 2 nút: "Đăng nhập" và "Đăng ký"
✓ Navigation links: Trang chủ, Việc làm, Công ty
```

**Test Case 8.2: Header khi đã đăng nhập**
```
✓ Thấy "Dashboard" button (gradient)
✓ Thấy avatar dropdown (👤 + role)
✓ Click dropdown
✓ Thấy 2 option:
  - Hồ sơ cá nhân
  - Đăng xuất
```

**Test Case 8.3: Click Dashboard**
```
✓ Click "Dashboard" button
✓ Chuyển tới /dashboard
✓ Hiển thị dashboard của role hiện tại
```

**Test Case 8.4: Click Hồ sơ cá nhân**
```
✓ Click dropdown → "Hồ sơ cá nhân"
✓ Chuyển tới /profile
```

### 9️⃣ Test Hồ sơ Cá nhân (Profile)

**Test Case 9.1: Hiển thị Profile**
```
✓ Mở /profile (hoặc qua Header dropdown)
✓ Thấy sections:
  - Thông tin cá nhân
  - Thay đổi mật khẩu
✓ Form edit được enable/disable
```

**Test Case 9.2: Edit Thông tin**
```
✓ Click "Edit" button
✓ Form fields trở thành editable
✓ Nhập thông tin mới
✓ Click "Save"
✓ Thông tin được cập nhật
```

### 🔟 Test Đăng xuất (Logout)

**Test Case 10.1: Logout qua Header**
```
✓ Click avatar dropdown
✓ Click "Đăng xuất"
✓ Chuyển hướng tới trang chủ (/)
✓ Header trở về trạng thái chưa đăng nhập
✓ Hiển thị 2 nút: "Đăng nhập" và "Đăng ký"
```

**Test Case 10.2: Check localStorage**
```
✓ Đăng nhập (bất kỳ role nào)
✓ Mở DevTools (F12)
✓ Application → LocalStorage
✓ Thấy keys: 'user' và 'userRole'
✓ Đăng xuất
✓ Keys bị xoá
```

## 🔗 Responsive Design Test

**Test Case R1: Desktop (1920x1080)**
```
✓ Tất cả elements hiển thị đúng
✓ Grid layout 3-4 columns
✓ Không có horizontal scroll
```

**Test Case R2: Tablet (768x1024)**
```
✓ Grid layout thay đổi (2 columns)
✓ Filter section responsive
✓ Sidebar collapse nếu có
```

**Test Case R3: Mobile (375x667)**
```
✓ Menu toggle (hamburger)
✓ Grid layout 1 column
✓ Touch-friendly buttons
✓ Font size readable
```

## ✅ Test Checklist

### Routing
- [ ] HomePage loads at /
- [ ] Jobs page at /jobs
- [ ] Companies at /companies
- [ ] Login at /login
- [ ] Register at /register
- [ ] Dashboard at /dashboard
- [ ] Profile at /profile
- [ ] Not found returns 404 or home

### Components
- [ ] Header renders correctly
- [ ] Footer renders correctly
- [ ] Navigation links work
- [ ] Dropdown menus work
- [ ] Buttons are clickable
- [ ] Forms are functional

### Styling
- [ ] Colors match design (#667eea, #764ba2, etc)
- [ ] Hover effects work
- [ ] Responsive layouts
- [ ] No console errors
- [ ] No SCSS warnings

### State Management
- [ ] Login state persists
- [ ] Logout clears state
- [ ] Role affects dashboard shown
- [ ] Redirect works based on role

### Performance
- [ ] Page loads quickly
- [ ] No unnecessary re-renders
- [ ] Smooth animations
- [ ] Optimized images

## 🐛 Common Issues & Solutions

### Issue: Page doesn't load
**Solution:**
```bash
npm install
npm start
```

### Issue: Styles not applying
**Solution:**
```bash
# Clear cache
rm -rf node_modules/.cache
npm start
```

### Issue: SCSS error
**Solution:**
```
Check SCSS syntax:
✓ Closing braces matched
✓ No orphaned properties
✓ Proper nesting
```

### Issue: Route not working
**Solution:**
```
✓ Check routes.js has the path
✓ Check component import path
✓ Restart dev server
```

## 📊 Test Results Template

```
┌─────────────────────────────────────┐
│ TEST REPORT - RecruitHub            │
├─────────────────────────────────────┤
│ Date: __________                    │
│ Tester: __________                  │
├─────────────────────────────────────┤
│ RESULTS:                            │
│ ✓ HomePage             [PASS/FAIL]  │
│ ✓ Jobs Page            [PASS/FAIL]  │
│ ✓ Companies Page       [PASS/FAIL]  │
│ ✓ Login/Register       [PASS/FAIL]  │
│ ✓ Dashboard            [PASS/FAIL]  │
│ ✓ Navigation           [PASS/FAIL]  │
│ ✓ Responsive Design    [PASS/FAIL]  │
│ ✓ Performance          [PASS/FAIL]  │
├─────────────────────────────────────┤
│ Issues Found: ___                   │
│                                     │
│ Notes: _______________              │
└─────────────────────────────────────┘
```

---

**Happy Testing! 🚀**
