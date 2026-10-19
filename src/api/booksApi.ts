import type { ApiResult, Book } from '../types/book'

const initialBooks: Book[] = [
  { id: 'b001', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', publishedYear: 2008, availableCopies: 3, description: 'Hướng dẫn viết mã nguồn rõ ràng, dễ đọc và dễ bảo trì, với những ví dụ thực tế dành cho lập trình viên.' },
  { id: 'b002', title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', publishedYear: 1994, availableCopies: 2, description: 'Giới thiệu các mẫu thiết kế hướng đối tượng phổ biến để giải quyết những vấn đề thường gặp khi xây dựng phần mềm.' },
  { id: 'b003', title: 'Lập trình TypeScript', author: 'Boris Cherny', category: 'CNTT', publishedYear: 2021, availableCopies: 1, description: 'Khám phá cách sử dụng hệ thống kiểu của TypeScript để phát triển ứng dụng JavaScript an toàn và hiệu quả.' },
  { id: 'b004', title: 'The Pragmatic Programmer', author: 'David Thomas', category: 'CNTT', publishedYear: 2019, availableCopies: 4, description: 'Tập hợp những kinh nghiệm và nguyên tắc thực hành giúp lập trình viên làm việc linh hoạt, chủ động và chuyên nghiệp.' },
  { id: 'b005', title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', category: 'Kinh tế', publishedYear: 2011, availableCopies: 2, description: 'Khám phá hai hệ thống tư duy ảnh hưởng đến cách con người đưa ra quyết định và nhìn nhận thế giới.' },
  { id: 'b006', title: 'Kinh tế học căn bản', author: 'Thomas Sowell', category: 'Kinh tế', publishedYear: 2014, availableCopies: 3, description: 'Giải thích những nguyên lý kinh tế nền tảng và cách chúng tác động đến lựa chọn của cá nhân cũng như xã hội.' },
  { id: 'b007', title: 'Đắc nhân tâm', author: 'Dale Carnegie', category: 'Kinh tế', publishedYear: 1936, availableCopies: 0, description: 'Chia sẻ những nguyên tắc giao tiếp và xây dựng mối quan hệ tích cực trong công việc lẫn cuộc sống.' },
  { id: 'b008', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', publishedYear: 2019, availableCopies: 5, description: 'Sách tự học ngữ pháp tiếng Anh với bài học ngắn gọn, ví dụ rõ ràng và bài tập thực hành.' },
  { id: 'b009', title: 'Oxford Word Skills', author: 'Ruth Gairns', category: 'Ngoại ngữ', publishedYear: 2018, availableCopies: 2, description: 'Mở rộng vốn từ tiếng Anh qua các chủ đề gần gũi và hoạt động luyện tập theo từng cấp độ.' },
  { id: 'b010', title: 'Complete IELTS', author: 'Guy Brook-Hart', category: 'Ngoại ngữ', publishedYear: 2016, availableCopies: 1, description: 'Giáo trình luyện IELTS tích hợp kỹ năng ngôn ngữ, chiến lược làm bài và bài tập theo cấu trúc kỳ thi.' },
]

export async function fetchBooks(
  shouldFail = false,
): Promise<ApiResult<Book[]>> {
  await new Promise<void>((resolve) => setTimeout(resolve, 500))
  if (shouldFail) return { ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' }
  return { ok: true, data: initialBooks.map((book) => ({ ...book })) }
}
