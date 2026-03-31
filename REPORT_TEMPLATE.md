# Bao cao ngan - RESTful Blog API

## 1. Thong tin chung

- Ho ten:
- MSSV:
- Lop:
- Tieu de bai: Xay dung RESTful Blog API voi Authentication & Authorization
- Thoi han nop: [dien ngay]
- Link GitHub repository:

## 2. Mo ta thiet ke he thong

- Kien truc: routes -> controllers -> services -> repositories/models
- Cong nghe su dung:
  - Node.js + Express
  - MongoDB + Mongoose
  - JWT + bcryptjs
  - Multer, Joi, express-rate-limit

## 3. Danh sach endpoint

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Post

- GET /api/posts?page=1&limit=10
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id
- GET /api/posts/my-posts
- GET /api/posts/search?q=keyword&tag=Node.js

## 4. Mo ta Authentication va Authorization

- Authentication: su dung JWT trong header Authorization: Bearer <token>
- Authorization:
  - user: chi sua/xoa bai cua chinh minh
  - admin: co the sua/xoa bai bat ky

## 5. Validation va Error handling

- Validation bang Joi
- Error middleware tra ve JSON:
  {
  "error": "message"
  }

## 6. Upload anh

- Su dung multer
- Thu muc luu: public/uploads
- URL tra ve: /uploads/<filename>

## 7. Tim kiem va phan trang

- Phan trang: page, limit
- Tim kiem: q (title/content), tag

## 8. Kho khan gap phai

- [Mo ta ngan gon]

## 9. Ket qua test Postman

- Dinh kem screenshot:
  - Register/Login thanh cong
  - Tao post (co va khong co anh)
  - Update/Delete dung quyen
  - Search/Pagination

## 10. Tu danh gia theo rubric

- Authentication & JWT:
- Authorization owner/admin:
- CRUD + upload:
- Validation + error handling:
- Search + pagination:
- Code structure:
- README + huong dan:
