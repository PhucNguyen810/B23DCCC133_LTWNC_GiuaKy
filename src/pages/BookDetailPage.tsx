import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { borrowBook, loadBooks, returnBook } from '../features/books/booksSlice'

export default function BookDetailPage() {
  const { bookId } = useParams()
  const dispatch = useAppDispatch()
  const { books, borrowedBookIds, status, error } = useAppSelector((state) => state.books)
  const book = books.find((item) => item.id === bookId)
  const isBorrowed = book ? borrowedBookIds.includes(book.id) : false

  useEffect(() => {
    if (status === 'idle') void dispatch(loadBooks(undefined))
  }, [dispatch, status])

  if (status === 'idle' || status === 'loading') {
    return <main className="loading-state" role="status"><span className="spinner" />Đang tải thông tin sách...</main>
  }

  if (status === 'failed') {
    return <main className="error-state" role="alert"><h2>Không thể tải thông tin sách</h2><p>{error}</p><button className="button button-borrow" onClick={() => void dispatch(loadBooks(undefined))}>Thử lại</button></main>
  }

  if (!book) {
    return <main className="error-state"><h2>Không tìm thấy sách</h2><Link to="/">Quay lại kho sách</Link></main>
  }

  const categoryClass = book.category === 'CNTT' ? 'it' : book.category === 'Kinh tế' ? 'business' : 'language'
  const initials = book.title.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase()

  return (
    <main className="book-detail-page">
      <Link className="back-link" to="/">← Quay lại kho sách</Link>
      <article className="book-detail">
        <div className="book-detail-cover">
          <span className={`category-tag category-${categoryClass}`}>{book.category}</span>
          <div className="book-cover book-detail-art" aria-hidden="true"><span>{initials}</span></div>
        </div>
        <div className="book-detail-content">
          <p className="eyebrow">CHI TIẾT SÁCH</p>
          <h1>{book.title}</h1>
          <p className="book-detail-author">Tác giả: <strong>{book.author}</strong></p>
          <div className="book-detail-meta">
            <div><span>THỂ LOẠI</span><strong>{book.category}</strong></div>
            <div><span>NĂM XUẤT BẢN</span><strong>{book.publishedYear}</strong></div>
            <div><span>TÌNH TRẠNG</span><strong className={book.availableCopies > 0 ? 'detail-available' : 'detail-unavailable'}>{book.availableCopies > 0 ? `Còn ${book.availableCopies} bản` : 'Đã hết sách'}</strong></div>
          </div>
          <section className="book-description">
            <h2>Giới thiệu sách</h2>
            <p>{book.description}</p>
          </section>
          {isBorrowed
            ? <button className="button button-return detail-action" onClick={() => dispatch(returnBook(book.id))}>Trả sách</button>
            : <button className="button button-borrow detail-action" disabled={book.availableCopies === 0} onClick={() => dispatch(borrowBook(book.id))}>Mượn sách <span aria-hidden="true">→</span></button>}
        </div>
      </article>
    </main>
  )
}
