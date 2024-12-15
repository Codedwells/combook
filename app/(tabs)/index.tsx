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
import { dummyNotes } from '@/constants/data'
import Navigation, { TopNav } from '@/components/layout/navigation'

type availableRoutes = 'chat' | 'calendar' | 'notes'

export default function TabOneScreen() {
  const router = useRouter()

  const handlePress = (route: availableRoutes) => {
    router.push(`/${route}`)
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 flex flex-col h-full bg-gray-200 p-4'>
        <TopNav />

        <View className='flex flex-row items-center bg-slate-200 border border-slate-400 py-3 px-6 rounded-full gap-2 mt-8'>
          <Ionicons name='search' size={24} color='black' />
          <TextInput className='flex-1' placeholder='Search' />
          <Pressable className='border rounded-full border-slate-400 p-0.5'>
            <MaterialIcons name='clear' size={18} color='gray' />
          </Pressable>
        </View>

        <CategoryList />

        <View className='mt-8'>
          <View className='flex flex-row items-center  w-full justify-between px-2 mb-4'>
            <Text className='text-lg font-JakartaSemiBold text-gray-800'>
              Notes
            </Text>

            <Pressable onPress={() => handlePress('notes')}>
              <Text className='text-sm text-gray-500 font-Jakarta'>
                See all
              </Text>
            </Pressable>
          </View>

          <ScrollView className='h-[370px]'>
            {dummyNotes.map((note, index) => (
              <View
                key={index}
                className='border bg-[#8B501F] border-primary/50 rounded-lg p-4 mb-4 shadow-sm'
              >
                <Text className='text-lg font-semibold mb-2'>{note.title}</Text>
                <Text className='text-gray-600 mb-3'>{note.summary}</Text>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-xs text-gray-400'>{note.date}</Text>
                  <TouchableOpacity className='flex-row items-center'>
                    <MaterialIcons name='share' size={20} color='#4A90E2' />
                    <Text className='text-blue-500 ml-1'>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <Navigation />
      </View>
    </SafeAreaView>
  )
}
const categories = [
  { id: '1', name: 'Physics', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Chemistry', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Calclus', image: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Programming', image: 'https://via.placeholder.com/100' },
  { id: '5', name: 'Algebra', image: 'https://via.placeholder.com/100' },
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
    <View className='mt-8'>
      <View className='flex flex-row items-center  w-full justify-between px-2 mb-4'>
        <Text className='text-lg font-JakartaSemiBold text-gray-800'>
          Categories
        </Text>

        <Pressable>
          <Text className='text-sm text-gray-500 font-Jakarta'>See all</Text>
        </Pressable>
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
