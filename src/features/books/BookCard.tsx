import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../../types/book'

interface BookCardProps {
  book: Book
  isBorrowed: boolean
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

function BookCardComponent({ book, isBorrowed, onBorrow, onReturn }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-card-top">
        <span className={`category-tag category-${book.category === 'CNTT' ? 'it' : book.category === 'Kinh tế' ? 'business' : 'language'}`}>{book.category}</span>
        <span className={book.availableCopies > 0 ? 'availability' : 'availability unavailable'}>
          {book.availableCopies > 0 ? `Còn ${book.availableCopies} bản` : 'Đã hết'}
        </span>
      </div>
      <Link className="book-detail-link" to={`/books/${book.id}`} aria-label={`Xem chi tiết ${book.title}`}>
        <div className="book-cover" aria-hidden="true"><span>{book.title.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase()}</span></div>
      </Link>
      <div className="book-details">
        <h3><Link className="book-title-link" to={`/books/${book.id}`}>{book.title}</Link></h3>
        <p className="book-author">{book.author}</p>
        <p className="book-year">Xuất bản năm {book.publishedYear}</p>
      </div>
      {isBorrowed
        ? <button className="button button-return" onClick={() => onReturn(book.id)}>Trả sách</button>
        : <button className="button button-borrow" onClick={() => onBorrow(book.id)} disabled={book.availableCopies === 0}>Mượn sách <span aria-hidden="true">→</span></button>}
    </article>
  )
}

export const BookCard = memo(BookCardComponent)
