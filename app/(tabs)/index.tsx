import { useRouter } from 'expo-router'
import { Text, View } from '@/components/Themed'
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigation, { TopNav } from '@/components/layout/navigation'
import { useAppStore } from '@/store/store'
import { useState } from 'react'

type availableRoutes = 'chat' | 'calendar' | 'notes'

export default function TabOneScreen() {
  const router = useRouter()
  const { notes } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')

  const handlePress = (route: availableRoutes) => {
    router.push(`/${route}`)
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 flex flex-col h-full bg-gray-200 p-4'>
        <TopNav />

        <View className='flex flex-row items-center bg-slate-200 border border-slate-400 py-3 px-6 rounded-full gap-2 mt-8'>
          <Ionicons name='search' size={24} color='black' />
          <TextInput
            className='flex-1'
            placeholder='Search'
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Pressable
            className='border rounded-full border-slate-400 p-0.5'
            onPress={() => setSearchTerm('')}
          >
            <MaterialIcons name='clear' size={18} color='gray' />
          </Pressable>
        </View>

        <CategoryList />

        <View className='mt-8'>
          <View className='flex flex-row items-center  w-full justify-between px-2 mb-4'>
            <Text className='text-lg font-JakartaSemiBold text-gray-800'>
              Notes highlight
            </Text>

            <Pressable onPress={() => handlePress('notes')}>
              <Text className='text-sm text-gray-500 font-Jakarta'>
                See all
              </Text>
            </Pressable>
          </View>

          <ScrollView className='h-[550px]'>
                                                                                                                                                                                                                                                                                                                                                                                                              {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <View
                  key={note.id}
                  className='border bg-[#8B501F] border-primary/50 rounded-lg p-4 mb-4 shadow-sm'
                >
                  <Text className='text-lg font-semibold mb-2'>{note.title}</Text>
                  <Text className='text-gray-600 mb-3'>{note.summary}</Text>
                  <View className='flex-row justify-between items-center'>
                    <Text className='text-xs text-gray-400'>{note.date}</Text>
                    <TouchableOpacity className='hidden flex-row items-center'>
                      <MaterialIcons name='share' size={20} color='#4A90E2' />
                      <Text className='text-blue-500 ml-1'>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View className='flex items-center justify-center h-full'>
                <Text className='text-gray-500'>No notes found</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <Navigation />
      </View>
    </SafeAreaView>
  )
}

const categories = [
  { id: '1', name: 'Physics', image: 'https://img.icons8.com/clouds/100/physics.png' },
  { id: '2', name: 'Calclus', image: 'https://img.icons8.com/pulsar-gradient/100/cosine.png' },
  { id: '3', name: 'Chemistry', image: 'https://img.icons8.com/clouds/100/test-tube.png' },
  { id: '4', name: 'Algebra', image: 'https://img.icons8.com/pulsar-gradient/100/square-root.png' },
  { id: '5', name: 'Programming', image: 'https://img.icons8.com/pulsar-gradient/100/goto.png' },
]

type CategoryType = {
  id: string
  name: string
  image: string
}

const CategoryList = () => {
  const renderItem = ({ item }: { item: CategoryType }) => (
    <View className='flex items-center mx-2'>
      <Image source={{ uri: item.image }} className='w-20 h-20 rounded-full' />
      <Text className='mt-2 text-sm text-gray-800 font-Jakarta'>
        {item.name}
      </Text>
    </View>
  )

  return (
    <View className='mt-8 hidden'>
      <View className='flex flex-row items-center  w-full justify-between px-2 mb-4'>
        <Text className='text-lg font-JakartaSemiBold text-gray-800'>
          Categories
        </Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  )
}
