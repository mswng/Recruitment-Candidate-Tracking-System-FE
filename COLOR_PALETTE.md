# Bảng Màu Sắc Hệ Thống - Recruitment Candidate Tracking System

## Bảng Màu Chính (Primary Colors)

| Mục đích | Màu | Mã Hex | Ghi chú |
|----------|-----|--------|---------|
| Primary | Xanh dương | `#2563EB` | Màu chính cho button, link, active state |
| Primary Hover | Xanh dương đậm | `#1D4ED8` | Màu khi hover button primary |
| Secondary | Xanh ngọc | `#10B981` | Màu phụ để tạo gradient hoặc highlight |

## Bảng Màu Nền (Background Colors)

| Mục đích | Màu | Mã Hex | Ghi chú |
|----------|-----|--------|---------|
| Background | Xám nhạt | `#F8FAFC` | Màu nền chính của page |
| Card / Box | Trắng | `#FFFFFF` | Màu nền card, modal, form |

## Bảng Màu Text (Text Colors)

| Mục đích | Màu | Mã Hex | Ghi chú |
|----------|-----|--------|---------|
| Text chính | Đen xám | `#111827` | Màu text chính cho heading, body text |
| Text phụ | Xám | `#6B7280` | Màu cho placeholder, secondary text |

## Bảng Màu Border (Border Colors)

| Mục đích | Màu | Mã Hex | Ghi chú |
|----------|-----|--------|---------|
| Border | Xám nhạt | `#E5E7EB` | Màu border mặc định cho input, card |

## Bảng Màu Trạng Thái (Status Colors)

| Mục đích | Màu | Mã Hex | Ghi chú |
|----------|-----|--------|---------|
| Error | Đỏ | `#EF4444` | Màu lỗi, danger action |
| Warning | Vàng | `#F59E0B` | Màu cảnh báo |
| Success | Xanh ngọc | `#10B981` | Màu thành công |

## CSS Variables

Các biến CSS được định nghĩa trong `src/assets/css/globalStyles/globalStyles.scss`:

```scss
:root {
    /* Primary Colors */
    --primary-c: #2563EB;
    --primary-hover: #1D4ED8;
    --secondary-c: #10B981;
    
    /* Background Colors */
    --bgr-c: #F8FAFC;
    --section-bgr: #FFFFFF;
    --card-bgr: #FFFFFF;
    
    /* Text Colors */
    --text-c: #111827;
    --text-secondary: #6B7280;
    
    /* Border Colors */
    --border-c: #E5E7EB;
    
    /* Status Colors */
    --error-c: #EF4444;
    --warning-c: #F59E0B;
    --success-c: #10B981;
}
```

## Hướng dẫn Sử Dụng

### 1. Cho các thành phần chính
- Sử dụng `#2563EB` cho button primary, link active, icon
- Sử dụng `#1D4ED8` cho hover state

### 2. Cho background
- Sử dụng `#F8FAFC` cho background page
- Sử dụng `#FFFFFF` cho card, modal, form

### 3. Cho text
- Sử dụng `#111827` cho tiêu đề và text chính
- Sử dụng `#6B7280` cho placeholder và text phụ

### 4. Cho border
- Sử dụng `#E5E7EB` cho tất cả các border

### 5. Cho gradient
- Primary: `linear-gradient(135deg, #2563EB 0%, #10B981 100%)`
- Hover: `linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)`

## Tương thích với CSS Variables

Thay vì sử dụng màu cố định, ưu tiên sử dụng CSS variables:

```scss
// Tốt
color: var(--text-c);
background-color: var(--bgr-c);
border-color: var(--border-c);

// Tránh
color: #111827;
background-color: #F8FAFC;
border-color: #E5E7EB;
```

---

**Cập nhật**: 14/01/2026 - Bảng màu chuyên nghiệp hiện đại
