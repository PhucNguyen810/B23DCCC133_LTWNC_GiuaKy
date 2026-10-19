import { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useDebounce } from '../../hooks/useDebounce'
import { useFilterStore } from '../filters/filterStore'
import { borrowBook, clearNotice, returnBook } from './booksSlice'
import { BookCard } from './BookCard'

export function BookList() {
  const dispatch = useAppDispatch()
  const { books, borrowedBookIds, notice } = useAppSelector((state) => state.books)
  const keyword = useFilterStore((state) => state.keyword)
  const category = useFilterStore((state) => state.category)
  const setKeyword = useFilterStore((state) => state.setKeyword)
  const setCategory = useFilterStore((state) => state.setCategory)
  const [searchInput, setSearchInput] = useState(keyword)
  const debouncedKeyword = useDebounce(searchInput, 300)

  const filteredBooks = useMemo(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLocaleLowerCase()
    return books.filter((book) => {
      const matchesKeyword = !normalizedKeyword ||
        book.title.toLocaleLowerCase().includes(normalizedKeyword) ||
        book.author.toLocaleLowerCase().includes(normalizedKeyword)
      return matchesKeyword && (category === 'Tất cả' || book.category === category)
    })
  }, [books, category, debouncedKeyword])

  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch])
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch])
  const handleSearch = useCallback((value: string) => {
    setSearchInput(value)
    setKeyword(value)
  }, [setKeyword])

  return (
    <section className="catalogue">
      <div className="section-heading">
        <div><p className="eyebrow">KHÁM PHÁ TRI THỨC</p><h2>Kho sách thư viện</h2></div>
        <span className="book-count">{filteredBooks.length} đầu sách</span>
      </div>
      <div className="filters">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input aria-label="Tìm sách" placeholder="Tìm theo tên sách hoặc tác giả..." value={searchInput} onChange={(event) => handleSearch(event.target.value)} />
          {searchInput && <button type="button" className="clear-search" aria-label="Xóa tìm kiếm" onClick={() => handleSearch('')}>×</button>}
        </label>
        <label className="category-select-label">
          <span className="sr-only">Lọc theo thể loại</span>
          <select aria-label="Lọc theo thể loại" value={category} onChange={(event) => setCategory(event.target.value as typeof category)}>
            <option value="Tất cả">Tất cả thể loại</option><option value="CNTT">CNTT</option><option value="Kinh tế">Kinh tế</option><option value="Ngoại ngữ">Ngoại ngữ</option>
          </select>
        </label>
      </div>
      {notice && <div className="notice" role="alert">{notice}<button aria-label="Đóng thông báo" onClick={() => dispatch(clearNotice())}>×</button></div>}
      {filteredBooks.length > 0
        ? <div className="book-grid">{filteredBooks.map((book) => <BookCard key={book.id} book={book} isBorrowed={borrowedBookIds.includes(book.id)} onBorrow={handleBorrow} onReturn={handleReturn} />)}</div>
        : <div className="empty-state"><span aria-hidden="true">⌕</span><h3>Không tìm thấy sách</h3><p>Thử thay đổi từ khóa hoặc bộ lọc thể loại nhé.</p></div>}
    </section>
  )
}
