# Website cá nhân Nguyễn Đình Luyện

Website thương hiệu cá nhân song ngữ Việt – Anh kèm blog, viết bằng Next.js (Node.js) và build ra file tĩnh.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000/vi/ để xem. Build bản chính thức và xem thử:

```bash
npm run build
npm run preview
```

Kết quả build nằm trong thư mục `out/`.

## Sửa nội dung

| Muốn sửa | Sửa ở đâu |
| --- | --- |
| Hồ sơ, kinh nghiệm, báo chí, mọi câu chữ | `src/content/site.ts` |
| Email, LinkedIn, ảnh chân dung, tên miền | phần `site` ở đầu `src/content/site.ts` |
| Bài blog | thư mục `content/posts/` |
| Màu sắc, font | `src/app/globals.css` và `src/app/[locale]/layout.tsx` |

Ảnh chân dung: đặt file vào `public/portrait.jpg`, rồi điền `portrait: "/portrait.jpg"` trong `site`.

## Viết bài blog mới

Tạo một file `.md` trong `content/posts/`. Tên file là đường dẫn của bài (không dấu, nối bằng gạch ngang).

```markdown
---
title: "Tiêu đề bài viết"
date: 2026-11-20
category: dieu-hanh        # cong-nghe | dieu-hanh | cuoc-song
lang: vi                   # vi | en
excerpt: "Một hai câu tóm tắt hiện ở trang danh sách."
---

Nội dung viết bằng Markdown.
```

Bài có cả hai ngôn ngữ: tạo hai file, đặt cùng một giá trị `key:` ở cả hai. Mỗi bản sẽ hiện đúng ở trang ngôn ngữ của nó. Bài chỉ có tiếng Việt vẫn hiện ở trang tiếng Anh, kèm nhãn "In Vietnamese".

Thêm chủ đề mới: thêm một dòng vào `categories` (cả `vi` và `en`) trong `src/content/site.ts`.

## Đưa lên GitHub

Tạo một repository trống trên GitHub, rồi:

```bash
git add -A
git commit -m "Initial site"
git remote add origin git@github.com:<tài-khoản>/<tên-repo>.git
git push -u origin main
```

Mỗi lần push lên `main`, GitHub Actions (`.github/workflows/deploy.yml`) tự build và đẩy bản tĩnh sang nhánh `deploy`.

Khai báo tên miền để SEO đúng: GitHub > Settings > Secrets and variables > Actions > Variables, thêm `SITE_URL` (ví dụ `https://tenmien.com`).

## Deploy lên Hostinger

Cách này chạy được trên mọi gói hosting của Hostinger, kể cả gói shared.

1. hPanel > Websites > chọn website > **Advanced > Git**.
2. Repository: địa chỉ repo GitHub. Branch: `deploy`. Directory: để trống (tức `public_html`, thư mục phải đang rỗng).
3. Repo private: sao chép SSH key Hostinger hiển thị, thêm vào GitHub > repo > Settings > Deploy keys.
4. Bấm **Deploy**. Sau đó bật **Auto deployment**: sao chép Webhook URL của Hostinger, thêm vào GitHub > repo > Settings > Webhooks (sự kiện push).

Từ đó, viết bài xong chỉ cần `git push`, website tự cập nhật sau vài phút.

Nếu dùng gói có Node.js Web App (Business/Cloud) hoặc VPS và muốn chạy Next.js dạng server, bỏ dòng `output: "export"` trong `next.config.ts` rồi chạy `npm run build && npm start`.
