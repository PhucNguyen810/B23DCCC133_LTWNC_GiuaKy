import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchBooks } from '../../api/booksApi'
import { isApiSuccess, type Book } from '../../types/book'

export type BooksStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface BooksState {
  books: Book[]
  borrowedBookIds: string[]
  status: BooksStatus
  error: string | null
  notice: string | null
}

const initialState: BooksState = {
  books: [],
  borrowedBookIds: [],
  status: 'idle',
  error: null,
  notice: null,
}

export const loadBooks = createAsyncThunk<Book[], { shouldFail?: boolean } | undefined>(
  'books/loadBooks',
  async (options, { rejectWithValue }) => {
    const result = await fetchBooks(options?.shouldFail ?? false)
    if (isApiSuccess(result)) return result.data
    return rejectWithValue(result.error)
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.books.find(({ id }) => id === action.payload)
      if (!book || book.availableCopies < 1 || state.borrowedBookIds.includes(book.id)) return
      book.availableCopies -= 1
      state.borrowedBookIds.push(book.id)
      state.notice = null
    },
    returnBook(state, action: PayloadAction<string>) {
      const borrowedIndex = state.borrowedBookIds.indexOf(action.payload)
      const book = state.books.find(({ id }) => id === action.payload)
      if (borrowedIndex < 0 || !book) return
      book.availableCopies += 1
      state.borrowedBookIds.splice(borrowedIndex, 1)
      state.notice = null
    },
    borrowLimitReached(state) {
      state.notice = 'Bạn chỉ có thể mượn tối đa 3 cuốn sách cùng lúc.'
    },
    clearNotice(state) {
      state.notice = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = typeof action.payload === 'string' ? action.payload : action.error.message ?? 'Đã xảy ra lỗi khi tải sách.'
      })
  },
})

export const { borrowBook, returnBook, borrowLimitReached, clearNotice } = booksSlice.actions
export default booksSlice.reducer
