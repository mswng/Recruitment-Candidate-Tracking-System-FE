# ⚡ Quick Start - RecruitHub

Bắt đầu nhanh với RecruitHub trong 5 phút!

## 1️⃣ Cài đặt (1 phút)

```bash
# Di chuyển tới thư mục dự án
cd c:\Projects\Recruitment-Candidate-Tracking-System-Fe

# Cài đặt dependencies
npm install

# Chạy dev server
npm start
```

✅ App sẽ tự mở tại: **http://localhost:3000**

## 2️⃣ Explore (2 phút)

### Trang Chủ
```
URL: http://localhost:3000
Tính năng:
  ✓ Xem hero banner
  ✓ Xem thống kê tuyển dụng
  ✓ Xem công việc nổi bật
```

### Tìm Việc Làm
```
URL: http://localhost:3000/jobs
Tính năng:
  ✓ Tìm kiếm công việc
  ✓ Lọc theo địa điểm
  ✓ Lọc theo loại hình
```

### Khám Phá Công ty
```
URL: http://localhost:3000/companies
Tính năng:
  ✓ Duyệt danh sách công ty
  ✓ Lọc theo ngành
  ✓ Xem thông tin công ty
```

## 3️⃣ Đăng Nhập Demo (1 phút)

### Phương pháp 1: Đăng nhập nhanh ⚡
```
1. Click "Đăng nhập" trên Header
2. Click một trong 4 nút:
   👤 Ứng viên
   👨‍💼 Admin
   👥 HR
   🎤 Interviewer
3. Chuyển tới Dashboard ngay!
```

### Phương pháp 2: Form đăng nhập
```
1. Click "Đăng nhập"
2. Chọn vai trò từ dropdown
3. Nhập email & password (bất kỳ giá trị)
4. Click "Đăng nhập"
```

## 4️⃣ Test các Dashboard (1 phút)

### Admin Dashboard
```
✓ Thấy stats: 1250 users, 89 jobs, 543 applications, 234 interviews
✓ Click card → /users hoặc /pipeline
✓ Xem bảng recent users
```

### HR Dashboard
```
✓ Thấy stats: 12 jobs, 87 applications, 25 interviews, 3 offers
✓ Menu quản lý: Job, Candidates, Pipeline, Interviews, Offers, Reports
```

### Interviewer Dashboard
```
✓ Thấy stats: 15 interviews, 5 upcoming, 9 completed, 2 pending
✓ Xem lịch phỏng vấn sắp tới
✓ Xem liên kết để vào phòng họp
```

### Candidate Dashboard
```
✓ Thấy stats: 12 ứng tuyển, 5 chờ, 2 phỏng vấn, 1 offer
✓ Xem danh sách ứng tuyển với status badges
✓ Status colors: vàng (chờ), xanh da (phỏng vấn), xanh (offer)
```

## 5️⃣ Test Features (1 phút)

### Header Navigation
```
✓ Click "Đăng xuất" → Quay về trang chủ
✓ Click "Hồ sơ cá nhân" → /profile
✓ Click logo → /home
✓ Click "Việc làm" → /jobs
✓ Click "Công ty" → /companies
```

### User Roles Switch
```
✓ Đăng xuất
✓ Đăng nhập với role khác (Admin → HR)
✓ Dashboard thay đổi tương ứng
✓ Header updates vai trò hiện tại
```

## 🎯 Quick Links

| Trang | URL | Notes |
|-------|-----|-------|
| Trang Chủ | `/` | Hero + Stats + Jobs |
| Việc Làm | `/jobs` | Search + Filter |
| Công Ty | `/companies` | Company cards |
| Đăng Nhập | `/login` | 4 quick login buttons |
| Đăng Ký | `/register` | New account creation |
| Dashboard | `/dashboard` | Role-based |
| Quản Lý User | `/users` | Admin only |
| Pipeline | `/pipeline` | Admin only |
| Phỏng Vấn | `/interviews` | Interviewer/Admin |
| Hồ Sơ | `/profile` | User profile |

## 💡 Tips & Tricks

### Switch Role Nhanh
```
1. Click avatar dropdown
2. Click "Đăng xuất"
3. Click nút role mới trên /login
4. Done! ✅
```

### Test Responsive Design
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Chọn:
  - Desktop (1920x1080)
  - Tablet (768x1024)
  - Mobile (375x667)
```

### Check LocalStorage
```
F12 → Application → LocalStorage → http://localhost:3000
Thấy 2 keys:
  user     - {"id": 1, "name": "User", ...}
  userRole - "admin" | "hr" | "interviewer" | "candidate"
```

### Clear Data
```
Nếu cần reset:
  F12 → Application → LocalStorage
  Delete 'user' key
  Delete 'userRole' key
  Refresh page
```

## 📚 Tài Liệu Thêm

- **GUIDE.md** - Hướng dẫn chi tiết cho users
- **README_FEATURES.md** - Danh sách tất cả tính năng
- **TEST_GUIDE.md** - 30+ test cases
- **CHANGELOG.md** - Lịch sử thay đổi
- **README.md** - Main documentation

## 🚨 Troubleshooting

### Port 3000 đã được sử dụng
```bash
# Kill process trên port 3000
npx kill-port 3000

# Hoặc chỉ định port khác
PORT=3001 npm start
```

### SCSS errors
```bash
npm install -D sass
npm start
```

### Module not found
```bash
rm -rf node_modules
npm install
npm start
```

### Styles không apply
```bash
# Clear cache
rm -rf node_modules/.cache
npm start
```

## ✨ Highlights

| Feature | Status | Test |
|---------|--------|------|
| Multi-role dashboards | ✅ | Try all 4 roles |
| Navigation links | ✅ | Click all menus |
| Responsive design | ✅ | Toggle device |
| Search & filter | ✅ | Filter jobs/companies |
| Quick login | ✅ | 4 role buttons |
| Profile page | ✅ | Edit info & password |
| Hover effects | ✅ | Hover cards |

## 🎓 Learning Path

```
Beginner:
1. Explore HomePage
2. Check Jobs & Companies
3. Try quick login

Intermediate:
4. Switch between roles
5. Explore each dashboard
6. Test navigation

Advanced:
7. Check console (F12)
8. View localStorage
9. Read GUIDE.md
10. Run full test suite (TEST_GUIDE.md)
```

## 🔐 Demo Accounts

Không cần credentials - chỉ cần click role button!

```
Button 1: Ứng viên
Button 2: Admin
Button 3: HR
Button 4: Interviewer
```

## 📱 Browsers

Tested & supported on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Next Steps

Sau khi xem xét:

1. **Backend Integration** - Kết nối với API
2. **JWT Auth** - Thay thế localStorage
3. **Database** - Persistent data
4. **Real Features** - Upload, email, etc
5. **Testing** - Unit & E2E tests

## 💬 Questions?

Xem:
- TEST_GUIDE.md - Cách test
- GUIDE.md - Cách sử dụng
- README_FEATURES.md - Các tính năng

---

**Ready? Let's go! 🚀**

```
npm start
```

Enjoy exploring RecruitHub! 🎉
