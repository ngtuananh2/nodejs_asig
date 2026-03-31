# Bao cao ngan - RESTful Blog API (ban toi thieu)

## 1. Thong tin chung

- Ho ten: Nguyen Tuan Anh
- Lop: WD1113
- Link GitHub repository: https://github.com/ngtuananh2/nodejs_asig

## 2. API endpoints (tom tat)

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

## 3. Thiet ke 3 lop

- Routes: khai bao endpoint
- Controllers: nhan request, tra response
- Services: xu ly nghiep vu (auth, owner/admin, pagination, search)
- Repositories/Models: truy van MongoDB
 