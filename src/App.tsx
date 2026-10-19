import { lazy, Suspense, useEffect } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useTheme } from './context/useTheme'
import { BookList } from './features/books/BookList'
import { loadBooks } from './features/books/booksSlice'
import BookDetailPage from './pages/BookDetailPage'
import './App.css'

const StatsPage = lazy(() => import('./pages/StatsPage'))

function CataloguePage() {
  const dispatch = useAppDispatch()
  const { status, error, borrowedBookIds } = useAppSelector((state) => state.books)

  useEffect(() => {
    if (status === 'idle') void dispatch(loadBooks(undefined))
  }, [dispatch, status])

  if (status === 'loading' || status === 'idle') return <main className="loading-state" role="status"><span className="spinner" />Đang tải...</main>
  if (status === 'failed') return <main className="error-state" role="alert"><h2>Không thể tải sách</h2><p>{error}</p><button className="button button-borrow" onClick={() => void dispatch(loadBooks(undefined))}>Thử lại</button></main>

  return (
    <main>
      <section className="hero-banner">
        <div className="hero-copy"><p className="eyebrow">GÓC TRI THỨC CỦA BẠN</p><h1>Mỗi cuốn sách,<br />một <em>chân trời mới.</em></h1><p className="hero-description">Khám phá, mượn và cùng nuôi dưỡng niềm đam mê học hỏi mỗi ngày.</p><a className="hero-link" href="#catalogue">Khám phá kho sách <span aria-hidden="true">↓</span></a></div>
        <div className="hero-art" aria-hidden="true"><div className="art-sun" /><div className="art-book art-book-back" /><div className="art-book art-book-front"><i /><i /><i /></div><div className="art-plant">✳</div><div className="art-orbit" /></div>
        <div className="hero-foot"><span>19/10/2026</span><span>ĐỌC ĐỂ MỞ LỐI TƯƠNG LAI</span></div>
      </section>
      <div id="catalogue"><BookList /></div>
      <aside className="borrow-summary"><span className="summary-icon">↗</span><div><strong>Sách của bạn</strong><p>Bạn đang mượn {borrowedBookIds.length}/3 cuốn sách</p></div><div className="summary-progress" aria-label={`${borrowedBookIds.length} trên 3 sách đang mượn`}><span style={{ width: `${borrowedBookIds.length / 3 * 100}%` }} /></div></aside>
    </main>
  )
}

function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="site-wrap">
      <header className="site-header">
        <Link to="/" className="brand"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MINI<span>LIBRARY</span></span></Link>
        <nav aria-label="Điều hướng chính"><NavLink to="/" end>Khám phá</NavLink><NavLink to="/stats">Thống kê</NavLink></nav>
        <div className="header-actions"><span className="header-badge">THƯ VIỆN SINH VIÊN</span><button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? 'Chuyển giao diện tối' : 'Chuyển giao diện sáng'}>{theme === 'light' ? '☾' : '☀'}</button></div>
      </header>
      <Routes>
        <Route path="/" element={<CataloguePage />} />
        <Route path="/stats" element={<Suspense fallback={<main className="loading-state" role="status"><span className="spinner" />Đang tải thống kê...</main>}><StatsPage /></Suspense>} />
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route path="*" element={<main className="error-state"><h2>Không tìm thấy trang</h2><Link to="/">Quay lại kho sách</Link></main>} />
      </Routes>
      <footer className="site-footer"><span>MINI LIBRARY <span className="footer-dot">+</span> TRI THỨC TRONG TẦM TAY</span><span>2026 - THƯ VIỆN SINH VIÊN</span></footer>
    </div>
  )
}

export default App
