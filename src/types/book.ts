export const BOOK_CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const

export type BookCategory = (typeof BOOK_CATEGORIES)[number]

export interface Book {
  id: string
  title: string
  author: string
  category: BookCategory
  publishedYear: number
  availableCopies: number
  description: string
}

export type NewBook = Omit<Book, 'id'>
export type BookSummary = Pick<Book, 'id' | 'title' | 'category'>

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export function isApiSuccess<T>(
  result: ApiResult<T>,
): result is { ok: true; data: T } {
  return result.ok
}
