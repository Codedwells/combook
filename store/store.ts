import { create } from 'zustand'

interface IUserStore {
  name: string
  email: string
  isLoggedIn: boolean
  loginUser: (name: string, email: string) => void
} 

interface EventType {
  title: string
  date: string
  time: string
  location: string
  id: string
}

interface NoteType {
  title: string
  summary: string
  date: string
  id: string
}

interface MessageType {
  text: string
  isBot: boolean
}

interface IAppStore {
  events: EventType[]
  notes: NoteType[]
  messages: MessageType[]
  addEvent: (event: EventType) => void
  updateEvent: (event: EventType) => void
  deleteEvent: (id: string) => void
  addNote: (note: NoteType) => void
  updateNote: (note: NoteType) => void
  deleteNote: (id: string) => void
  addMessage: (message: MessageType) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  name: '',
  email: '',
  isLoggedIn: false,
  loginUser: (name, email) => set({ name, email, isLoggedIn: true }),
}))

export const useAppStore = create<IAppStore>((set) => ({
  events: [],
  notes: [],
  messages: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) => set((state) => ({
    events: state.events.map(e => e.id === event.id ? event : e)
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(e => e.id !== id)
  })),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (note) => set((state) => ({
    notes: state.notes.map(n => n.id === note.id ? note : n)
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(n => n.id !== id)
  })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}))
