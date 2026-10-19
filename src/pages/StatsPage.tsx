import { useAppSelector } from '../app/hooks'
import { BOOK_CATEGORIES } from '../types/book'

export default function StatsPage() {
  const { books, borrowedBookIds } = useAppSelector((state) => state.books)
  return (
    <main className="stats-page">
      <p className="eyebrow">TỔNG QUAN THƯ VIỆN</p>
      <h1>Thống kê sách</h1>
      <p className="stats-intro">Thông tin tổng quan về kho sách và hoạt động mượn hiện tại.</p>
      <div className="stats-grid">
        {BOOK_CATEGORIES.map((category) => {
          const count = books.filter((book) => book.category === category).length
          return <article className="stat-card" key={category}><span>{category}</span><strong>{count}</strong><small>đầu sách</small></article>
        })}
        <article className="stat-card stat-card-highlight"><span>Đang được mượn</span><strong>{borrowedBookIds.length}</strong><small>cuốn sách</small></article>
      </div>
    </main>
  )
}
