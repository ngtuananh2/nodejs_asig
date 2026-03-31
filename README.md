# RESTful Blog API

API blog ca nhan su dung Node.js, Express, MongoDB, JWT.

## Chuc nang chinh

- Dang ky, dang nhap (JWT)
- CRUD bai viet
- Phan quyen sua/xoa: owner hoac admin
- Upload anh bai viet (multer)
- Tim kiem theo tu khoa/tag
- Phan trang danh sach bai viet

## Yeu cau moi truong

- Node.js >= 18
- MongoDB local hoac cloud

## Huong dan chay nhanh

1. Cai dependencies:

```bash
npm install
```

2. Tao file .env (copy tu .env.example):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_api
JWT_SECRET=please-change-this-secret
JWT_EXPIRES_IN=1d
BASE_URL=http://localhost:5000
```

3. Chay server:

```bash
npm run dev
```

## Endpoints bat buoc

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Posts

- GET /api/posts?page=1&limit=10
- GET /api/posts/:id
- POST /api/posts (JWT, image optional)
- PUT /api/posts/:id (JWT, owner/admin)
- DELETE /api/posts/:id (JWT, owner/admin)
- GET /api/posts/my-posts (JWT)
- GET /api/posts/search?q=keyword&tag=Node.js

## Luu y su dung

- Header auth: Authorization: Bearer <token>
- Upload anh: form-data key la image
- Loi tra ve theo dinh dang:

```json
{
  "error": "message"
}
```
