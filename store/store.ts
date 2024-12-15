import { create } from 'zustand'

interface IUserStore {
  name: string
  email: string
  isLoggedIn: boolean
  loginUser: (name: string, email: string) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  name: '',
  email: '',
  isLoggedIn: false,
  loginUser: (name, email) => set({ name, email, isLoggedIn: true }),
}))
