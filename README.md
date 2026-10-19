# Mini Library

Ứng dụng tra cứu, mượn/trả sách dành cho sinh viên, xây dựng bằng React, TypeScript, Redux Toolkit, Zustand và React Router.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

Ứng dụng tải danh mục sách giả lập với độ trễ 500 ms. Có thể mô phỏng phản hồi lỗi bằng `fetchBooks(true)` trong `src/api/booksApi.ts`.

## Kiểm tra

```sh
npm test
npm run build
npm run lint
```

## Cấu trúc chính

- `src/api`: API giả lập và kiểu kết quả generic có type guard.
- `src/features/books`: Redux slice, danh sách sách, thẻ sách và reducer/component tests.
- `src/features/filters`: Zustand store cho từ khóa và thể loại.
- `src/context`: theme provider và custom hook.
- `src/hooks`: custom hooks dùng chung và kiểm thử debounce.
- `src/pages/StatsPage.tsx`: trang thống kê tải lười.

Trạng thái danh mục và sách đang mượn thuộc Redux; middleware Redux chặn mượn khi sinh viên đã có ba cuốn.
