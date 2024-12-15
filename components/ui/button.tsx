import { TouchableOpacity, Text, View } from 'react-native'

import { ButtonProps } from '@/types'
import { cn } from '@/lib/utils'

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-500'
    case 'danger':
      return 'bg-red-500'
    case 'success':
      return 'bg-green-500'
    case 'outline':
      return 'bg-transparent border-neutral-300 border-[0.5px]'
    default:
      return 'bg-[#10b981]'
  }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return 'text-black'
    case 'secondary':
      return 'text-gray-100'
    case 'danger':
      return 'text-red-100'
    case 'success':
      return 'text-green-100'
    default:
      return 'text-white'
  }
}

const CustomButton = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  className,
  textClassName,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'w-full rounded-lg p-3 flex flex-row justify-center items-center',
        getBgVariantStyle(bgVariant),
        { 'opacity-50': props.disabled },
        className,
      )}
      {...props}
    >
      {IconLeft && (
        <View className='mr-1.5'>
          <IconLeft />
        </View>
      )}
      <Text
        className={`text-sm font-JakartaMedium -mt-1 ${getTextVariantStyle(textVariant)} ${textClassName}`}
      >
        {title}
      </Text>
      {IconRight && (
        <View className='ml-1.5'>
          <IconRight />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
