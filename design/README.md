# Tài liệu thiết kế Wireframe & UI/UX - EmeraldStay

- **Sinh viên thực hiện:** 6651071013
- **Môn học:** Thiết kế Web (Thực hành Buổi 2)
- **Đề tài cá nhân hóa:**
  - MSSV: `6651071013`
  - $S = 6 + 6 + 5 + 1 + 0 + 7 + 1 + 0 + 1 + 3 = 30$
  - $D = 30 \pmod{15} = 0 \rightarrow$ **Đặt phòng khách sạn/homestay**
  - $F = 13 \pmod{10} = 3 \rightarrow$ **Biểu đồ thống kê (Chart.js) · Lọc theo khoảng giá/ngày · Animation chuyển trang**
  - $C = 6 \pmod{5} = 1 \rightarrow$ **Màu chủ đạo: Emerald (`#059669`)**

---

## 1. Cấu trúc giao diện & Breakpoints Responsive
Hệ thống tuân thủ nghiêm ngặt 3 breakpoint theo yêu cầu:
1. **Mobile (< 640px):**
   - Danh sách phòng hiển thị 1 cột (`grid-cols-1`).
   - Thanh bộ lọc dạng dọc, menu thu gọn vào biểu tượng hamburger.
2. **Tablet (640px – 1024px):**
   - Danh sách phòng hiển thị 2 cột (`sm:grid-cols-2`).
   - Bộ lọc hiển thị dạng lưới 2 cột.
3. **Desktop (> 1024px):**
   - Danh sách phòng hiển thị 3 - 4 cột (`lg:grid-cols-3 xl:grid-cols-4`).
   - Thanh điều hướng đầy đủ, hiển thị song song các biểu đồ thống kê thị trường.

---

## 2. Các trang chính trong hệ thống
1. **Trang danh sách (`ListPage.tsx` - Route `/`):**
   - Hero banner với khẩu hiệu và thông tin đề tài.
   - Thanh tìm kiếm từ khóa với kỹ thuật **Debounce 300ms** giúp tối ưu hiệu năng.
   - Bộ lọc đa tiêu chí: Lọc theo tỉnh thành, loại hình (Khách sạn, Homestay, Resort, Villa), khoảng giá (min - max) và ngày nhận/trả phòng.
   - Lưới thẻ card (`HotelCard.tsx`) hiển thị hình ảnh có alt text thật, huy hiệu, đánh giá sao, và giá tiền chuẩn định dạng VND.
2. **Trang chi tiết (`DetailPage.tsx` - Route `/item/:id`):**
   - Hình ảnh không gian phòng chất lượng cao.
   - Danh mục tiện ích đầy đủ (Wifi, bể bơi, lò sưởi, BBQ...).
   - Thông tin liên hệ và chính sách hủy phòng.
   - Nút mở Modal đặt phòng (`BookingModal.tsx`) với bẫy focus (focus trap) và phím tắt ESC.
   - Gợi ý các điểm lưu trú tương tự trong cùng địa phương.
3. **Trang biểu đồ thống kê (`StatsPage.tsx` - Route `/stats`):**
   - Biểu đồ cột (Bar Chart) chi phí lưu trú trung bình giữa các thành phố du lịch.
   - Biểu đồ Doughnut cơ cấu các loại hình lưu trú.
   - Biểu đồ đường (Line Chart) phân bố phòng theo phân khúc ngân sách.

---

## 3. Tiêu chuẩn Accessibility (Chuẩn WCAG 2.1 AA)
- Toàn bộ ảnh `<img>` đều có thuộc tính `alt` mô tả chân thực.
- Mọi nút bấm chỉ có icon đều có thuộc tính `aria-label`.
- Hộp thoại Modal có `role="dialog"`, `aria-modal="true"`, bẫy tiêu điểm Tab/Shift+Tab và tự động đóng khi nhấn phím `Escape`.
- Độ tương phản chữ/nền đạt chuẩn AA (Emerald 600/700/800 trên nền sáng, Slate 900 cho tiêu đề).
