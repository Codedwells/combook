import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

type availableRoutes = 'chat' | 'calendar' | 'notes' | ''

interface NavigationProps {
  className?: string
}

export default function Navigation({ className }: NavigationProps) {
  const menuItems = [
    { title: 'Home', icon: '🏠', route: '' },
    { title: 'Notes', icon: '📝', route: 'notes' },
    { title: 'AI Chat', icon: '🤖', route: 'chat' },
    { title: 'Calendar', icon: '📅', route: 'calendar' },
  ]

  const router = useRouter()

  const handlePress = (route: availableRoutes) => {
    router.push(`/${route}`)
  }
  return (
    <View
      className={cn('flex flex-row gap-4 mt-auto justify-center', className)}
    >
      {menuItems.map((item) => (
        <Pressable
          key={item.route}
          onPress={() => handlePress(item.route as availableRoutes)}
          className='w-20 h-20 bg-white border-2 border-primary shadow-md'
        >
          <View className='items-center justify-center h-full'>
            <Text className='text-3xl mb-2'>{item.icon}</Text>
            <Text className='text-sm font-JakartaSemiBold text-gray-800'>
              {item.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  )
}

interface TopNavProps {
  className?: string
}
export function TopNav({ className }: TopNavProps) {
  return (
    <View className={cn('flex flex-col p-4', className)}>
      <View className='flex flex-row items-center justify-between'>
          <Text className='text-2xl font-JakartaBold text-[#6E5036]'>
            Studeey
          </Text>

        <Pressable className='bg-slate-100 p-1.5 rounded-full border border-gray-300'>
          <Ionicons name='notifications-outline' size={24} color='black' />
        </Pressable>
      </View>
    </View>
  )
}
