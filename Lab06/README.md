# Lab 06 – Xây dựng frontend với ReactJS (tt)

Họ và tên: Nguyễn Trọng Nhân

MSSV: 22521004

Môn học: IE213.Q21

---

## Thông tin ứng dụng

Lab 06 tiếp tục hoàn thiện ứng dụng Movie Reviews theo mô hình MERN stack.

Các chức năng đã thực hiện:

- Đăng nhập người dùng.
- Thêm review cho một movie.
- Sửa review của chính người dùng đang đăng nhập.
- Xóa review của chính người dùng đang đăng nhập.
- Phân trang danh sách phim.
- Tìm kiếm phim theo title hoặc rating kết hợp với phân trang.

---

## Tài khoản test

```txt
Username: nhan22521004
Email: 22521004@gm.uit.edu.vn
Password: nhan123456
```

---

## Bài 1: Thêm và sửa review

### 1.1 Tạo login component

Người dùng có thể đăng nhập bằng tài khoản trong file `mock-data/users.js`. Sau khi đăng nhập thành công, người dùng được chuyển về trang Home.

![alt text](./images/image-01.png)
![alt text](./images/image-02.png)
![alt text](./images/image-03.png)
![alt text](./images/image-04.png)

---

### 1.2 Hiển thị chức năng thêm review sau khi đăng nhập

Khi người dùng đã đăng nhập, trang chi tiết movie sẽ hiển thị liên kết `Add Review`.

![alt text](./images/image-00.png)

---

### 1.3 Thêm review

Component `AddReview` sử dụng các biến trạng thái:

- `editing`
- `initialReviewState`
- `review`
- `submitted`

Các hàm xử lý:

- `onChangeReview()`
- `saveReview()`

Trong `saveReview()`, tạo object `data` chứa thông tin review, `movie_id`, `user_id` và `name`, sau đó gọi `MovieDataService.createReview(data)`.

![alt text](./images/image-05.png)
![alt text](./images/image-06.png)

---

### 1.4 Review mới được hiển thị trong trang chi tiết movie

Sau khi thêm review thành công, người dùng quay lại trang movie để xem review vừa tạo.

![Review submitted](./images/image-07.png)
![Review displayed](./images/image-08.png)

---

### 1.5 Sửa review

Khi nhấn nút `Edit`, component `Movie` truyền `currentReview` sang component `AddReview` thông qua `state`.

Nếu `state` chứa `currentReview`, biến `editing` có giá trị `true` và `initialReviewState` được thiết lập bằng nội dung review hiện tại.

![Edit review](./images/image-09.png)
![Edit review](./images/image-10.png)
![Edit review](./images/image-11.png)

---

### 1.6 Cập nhật review thành công

Khi đang ở chế độ edit, `saveReview()` gọi `MovieDataService.updateReview()`.

![Review updated](./images/image-12.png)

---

## Bài 2: Xóa review

### 2.1 Hiển thị nút Delete cho review của người dùng đang đăng nhập

Người dùng chỉ thấy nút `Edit` và `Delete` trên review do chính mình tạo.

![Edit delete buttons](./images/image-13.png)
![Edit delete buttons](./images/image-14.png)

---

### 2.2 Xóa review

Khi nhấn nút `Delete`, component `Movie` truyền `review id` và `index` vào hàm `deleteReview()`.

Sau khi gọi `MovieDataService.deleteReview()` thành công, mảng `reviews` trong state được cập nhật bằng `splice(index, 1)`.

![Delete review](./images/image-15.png)
![Delete review](./images/image-16.png)
![Delete review](./images/image-17.png)
![Review deleted](./images/image-18.png)

---

## Bài 3: Lấy dữ liệu cho trang tiếp theo

### 3.1 Phân trang với getAll()

Trong component `MoviesList`, thêm các biến trạng thái:

- `currentPage`
- `entriesPerPage`
- `totalResults`

Khi `currentPage` thay đổi, ứng dụng gọi lại API để lấy danh sách phim của trang tương ứng.

![Movies pagination](./images/image-19.png)
![Movies pagination](./images/image-20.png)
![Movies pagination](./images/image-21.png)
![Movies pagination](./images/image-22.png)
![Movies pagination](./images/image-23.png)
! [Movies pagination](./images/image-24.png)

---

### 3.2 Tìm kiếm kết hợp phân trang

Thêm biến trạng thái `currentSearchMode` để xác định chế độ tìm kiếm hiện tại:

- `findByTitle`
- `findByRating`

Khi nhấn `Next` hoặc `Previous`, hàm `retrieveNextPage()` dựa trên `currentSearchMode` để gọi đúng API:

- Lấy toàn bộ phim.
- Tìm theo title.
- Tìm theo rating.

![Search with pagination](./images/image-25.png)
![Search with pagination](./images/image-26.png)
![Search with pagination](./images/image-27.png)
