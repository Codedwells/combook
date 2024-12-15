import { useEffect } from 'react'
import { router } from 'expo-router'
import { StudeyStorage } from '@/lib/utils'
import { useUserStore } from '@/store/store'

const Page = () => {
  const {} = useUserStore((state) => state)

  async function handleInit() {
    let { isStored: hasAuthInfo, value: authInfo } =
      await StudeyStorage.retrieve('auth.info')
    let { isStored: hasOnboarded, value: onBoardState } =
      await StudeyStorage.retrieve('hasOnboarded')

    if (onBoardState === 'true' && hasAuthInfo) {
      let auth = JSON.parse(authInfo)

      if (auth.expiry && auth.expiry < new Date().toISOString()) {
        router.replace('/(auth)/sign-in')
        await StudeyStorage.remove('auth.info')
      }

      // Some action
    }

    router.replace('/(auth)/welcome')
  }

  useEffect(() => {
    handleInit()
  }, [])
}

export default Page
