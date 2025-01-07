import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Make data simply readable e.g 2nd January 2023 at 2:30 PM
export function formatDate(
  date: string,
  formatLayout: string = "MMMM dd, yyyy 'at' hh:mm a",
) {
  const createdAtDate = new Date(date)

  if (isNaN(createdAtDate.getTime())) {
    return '----'
  }

  return format(createdAtDate, formatLayout)
}

// Get simple data distance e.g about 4 hours ago
export function dateDistance(date: string) {
  const createdAtDate = new Date(date)

  const result = formatDistanceToNow(createdAtDate, { addSuffix: true })

  // Check if it says 2023 years ago
  if (result.includes('over 2023 years ago')) {
    return 'Never'
  }

  return result
}

// converts days to months
export function daysToMonths(days: number) {
  if (days < 30) {
    return days + ' days'
  }

  const months = Math.floor(days / 30)
  const remainingDays = days % 30

  return `${months} months ${remainingDays} days`
}

// Formats amounts e.g 1500 => 1,500
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Async storage
export const StudeyStorage = {
  store: async (key: string, value: string): Promise<{ isStored: boolean }> => {
    try {
      await AsyncStorage.setItem(key, value)
      return { isStored: true }
    } catch (e) {
      return { isStored: false }
    }
  },
  retrieve: async (
    key: string,
  ): Promise<{ isStored: boolean; value: string }> => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value == null) {
        throw new Error('Value not found')
      }
      return { isStored: true, value: value }
    } catch (e) {
      return { isStored: false, value: '' }
    }
  },
  remove: async (key: string): Promise<{ isRemoved: boolean }> => {
    try {
      await AsyncStorage.removeItem(key)
      return { isRemoved: true }
    } catch (e) {
      return { isRemoved: false }
    }
  },
}

// Generate user Icon
const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A8',
  '#33FFF6',
  '#FF9633',
  '#33FFAB',
  '#8B33FF',
]
export function getUserIconData(name: string): {
  initials: string
  color: string
} {
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return {
    initials,
    color: randomColor,
  }
}

// Generate random ID
export function generateRandomId() {
  return Math.random().toString(36).substr(2, 9)
}
