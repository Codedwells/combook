import { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { cn, StudeyStorage } from '@/lib/utils'
import CustomButton from '@/components/ui/button'
import { images } from '@/constants/images'

const Home = () => {
  async function setHasOnboarded() {
    await StudeyStorage.store('hasOnboarded', 'true')
  }

  useEffect(() => {
    setHasOnboarded()
  }, [])

  return (
    <SafeAreaView className='flex bg-white h-full items-center justify-between'>
      <View className='flex items-center flex-1 justify-center p-5'>

        <View className='flex flex-row items-center justify-center w-full'>
          <Text className='text-3xl font-JakartaBold w-full text-center text-[#6E5036]'>
            Studeey
          </Text>
        </View>

        <View className='w-[500px] h-[320px] mt-4 rounded-md'>
          <Image
            source={images.onBoarding}
            className={cn('w-[300px] h-full mx-auto')}
            resizeMode={'cover'}
          />
        </View>
        <Text className='text-2xl mb-8 font-JakartaSemiBold text-center text-gray-500 mx-10 dark:text-gray-300'>
        Asking Question Improves Your Learning
        </Text>
      </View>

      <CustomButton
        title={'Get Started'}
        onPress={() => router.replace('/(auth)/sign-in')}
        className='w-11/12 mb-14 bg-primary'
        textClassName='text-lg font-JakartaSemiBold'
      />
    </SafeAreaView>
  )
}

export default Home
