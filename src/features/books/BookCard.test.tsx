import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Book } from '../../types/book'
import { BookCard } from './BookCard'

const book: Book = {
  id: 'b001',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishedYear: 2008,
  availableCopies: 2,
  description: 'A guide to clean code.',
}

function renderBookCard(props: ComponentProps<typeof BookCard>) {
  return render(<MemoryRouter><BookCard {...props} /></MemoryRouter>)
}

describe('BookCard', () => {
  it('shows the book details', () => {
    renderBookCard({ book, isBorrowed: false, onBorrow: jest.fn(), onReturn: jest.fn() })
    expect(screen.getByText('Clean Code')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clean Code' })).toHaveAttribute('href', '/books/b001')
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument()
    expect(screen.getByText('CNTT')).toBeInTheDocument()
    expect(screen.getByText('Xuất bản năm 2008')).toBeInTheDocument()
    expect(screen.getByText('Còn 2 bản')).toBeInTheDocument()
  })

  it('calls the borrow handler with the correct book id', async () => {
    const user = userEvent.setup()
    const onBorrow = jest.fn()
    renderBookCard({ book, isBorrowed: false, onBorrow, onReturn: jest.fn() })
    await user.click(screen.getByRole('button', { name: /Mượn sách/ }))
    expect(onBorrow).toHaveBeenCalledWith('b001')
  })

  it('disables borrowing when there are no copies left', () => {
    renderBookCard({ book: { ...book, availableCopies: 0 }, isBorrowed: false, onBorrow: jest.fn(), onReturn: jest.fn() })
    expect(screen.getByRole('button', { name: /Mượn sách/ })).toBeDisabled()
  })
})
