import { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { icons, images } from '@/constants/images'
import InputField from '@/components/ui/input'
import CustomButton from '@/components/ui/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, useColorScheme, Image } from 'react-native'
import { cn } from '@/lib/utils'

export default function SignIn() {
  const colorScheme = useColorScheme()
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  return (
    <ScrollView className='flex-1'>
      <SafeAreaView className='pt-14 px-4'>
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

        <View className='mt-6 flex flex-col items-center'>
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
            title={'Login'}
            onPress={() => router.replace('/(tabs)')}
            className='w-11/12 mt-8 bg-primary'
            textClassName='text-lg font-JakartaSemiBold'
          />

          <View className='mt-4 flex items-start pt-2 gap-2'>
            <Text className='text-sm text-center font-JakartaMedium dark:text-gray-200'>
              Don't have an account?&nbsp;&nbsp;
              <Link href='/sign-up' className='font-JakartaSemiBold'>
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
