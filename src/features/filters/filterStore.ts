import { create } from 'zustand'
import type { BookCategory } from '../../types/book'

interface FilterState {
  keyword: string
  category: BookCategory | 'Tất cả'
  setKeyword: (keyword: string) => void
  setCategory: (category: BookCategory | 'Tất cả') => void
}

export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'Tất cả',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
}))
