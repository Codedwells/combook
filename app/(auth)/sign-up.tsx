import { useState } from 'react'
import { Link, router } from 'expo-router'
import { icons, images } from '@/constants/images'
import InputField from '@/components/ui/input'
import CustomButton from '@/components/ui/button'
import Octicons from '@expo/vector-icons/Octicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native'
import { cn } from '@/lib/utils'

export default function SignUp() {
  const colorScheme = useColorScheme()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  return (
    <SafeAreaView className='pt-6 px-4 flex flex-col h-full'>
      <View className='flex gap-4'>
        <TouchableOpacity
          onPress={() => {
            router.replace('/(auth)/sign-in')
          }}
          className='flex items-center justify-center bg-gray-200 w-[40px] h-[40px] rounded-full dark:bg-primary/20'
        >
          <Octicons
            name='chevron-left'
            size={25}
            color={colorScheme == 'dark' ? 'gray' : 'black'}
          />
        </TouchableOpacity>

        <View className='flex flex-row items-center justify-center w-full'>
          <Text className='text-4xl font-JakartaBold w-full text-center text-[#6E5036]'>
            Studeey
          </Text>
        </View>

        <View className='w-[300px] h-[300px] mx-auto mt-4 rounded-md'>
          <Image
            source={images.onBoarding}
            className={cn('w-[300px] h-full mx-auto')}
            resizeMode={'cover'}
          />
        </View>
      </View>

      <View className='mt-6'>
        <InputField
          label='Name'
          placeholder='Enter name'
          icon={icons.person}
          value={form.name}
          colorScheme={colorScheme ?? 'light'}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        <InputField
          label='Email'
          placeholder='Enter email'
          icon={icons.mail}
          textContentType='emailAddress'
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          colorScheme={colorScheme ?? 'light'}
          keyboardType='email-address'
        />
        <InputField
          label='Password'
          placeholder='Enter password'
          icon={icons.lock}
          secureTextEntry={true}
          textContentType='password'
          value={form.password}
          colorScheme={colorScheme ?? 'light'}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        <CustomButton
          title={'Sign Up'}
          onPress={() => router.replace('/(tabs)')}
          className='w-11/12 mt-8 bg-primary'
          textClassName='text-lg font-JakartaSemiBold'
        />

        <View className='mt-4 flex flex-row'>
          <Text className='text-sm text-center mx-auto font-JakartaMedium dark:text-gray-200'>
            Already have an account?&nbsp;
            <Link href='/(auth)/sign-in' className='font-JakartaSemiBold'>
              Login
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
