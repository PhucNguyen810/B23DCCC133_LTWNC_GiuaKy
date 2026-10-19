import reducer, { borrowBook, loadBooks, returnBook, type BooksState } from './booksSlice'
import type { Book } from '../../types/book'

const cleanCode: Book = {
  id: 'clean-code',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishedYear: 2008,
  availableCopies: 2,
  description: 'A guide to clean code.',
}

const populatedState: BooksState = {
  books: [cleanCode],
  borrowedBookIds: [],
  status: 'idle',
  error: null,
  notice: null,
}

describe('booksSlice reducer', () => {
  it('sets loading status when the load thunk is pending', () => {
    const state = reducer(undefined, loadBooks.pending('request-1', undefined))
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  it('stores loaded books when the load thunk succeeds', () => {
    const state = reducer(undefined, loadBooks.fulfilled([cleanCode], 'request-1', undefined))
    expect(state.status).toBe('succeeded')
    expect(state.books).toEqual([cleanCode])
  })

  it('stores a readable error when the load thunk fails', () => {
    const state = reducer(undefined, loadBooks.rejected(
      new Error('Network unavailable'),
      'request-1',
      undefined,
      'API unavailable',
    ))
    expect(state.status).toBe('failed')
    expect(state.error).toBe('API unavailable')
  })

  it('decreases available copies when a book is borrowed', () => {
    const state = reducer(populatedState, borrowBook(cleanCode.id))
    expect(state.books[0].availableCopies).toBe(1)
    expect(state.borrowedBookIds).toEqual([cleanCode.id])
  })

  it('restores a copy when a borrowed book is returned', () => {
    const borrowedState = reducer(populatedState, borrowBook(cleanCode.id))
    const state = reducer(borrowedState, returnBook(cleanCode.id))
    expect(state.books[0].availableCopies).toBe(2)
    expect(state.borrowedBookIds).toEqual([])
  })
})
