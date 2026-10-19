import { configureStore, type Middleware } from '@reduxjs/toolkit'
import booksReducer, { borrowBook, borrowLimitReached } from '../features/books/booksSlice'

export const borrowLimitMiddleware: Middleware = (store) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = store.getState() as RootState
    if (state.books.borrowedBookIds.length >= 3) {
      store.dispatch(borrowLimitReached())
      return action
    }
  }
  return next(action)
}

export const store = configureStore({
  reducer: { books: booksReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(borrowLimitMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
