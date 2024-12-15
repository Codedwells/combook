import { InputFieldProps } from '@/types'
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'


const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  colorScheme,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='my-2 w-full'>
          {label && (
            <Text
              className={`text-md font-JakartaSemiBold mb-3 ${labelStyle} dark:text-gray-200`}
            >
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center relative rounded-lg border-primary  ${containerStyle} ${colorScheme == 'light' ? 'bg-primary/5 border-primary/50' : 'bg-primary/10 border-primary/50'}`}
          >
            {icon && (
              <Image source={icon} className={`w-4 h-4 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left ${colorScheme == 'light' ? 'text-gray-500' : 'text-gray-200'}`}
              secureTextEntry={secureTextEntry}
              selectionColor='#10b981'
              placeholderTextColor={'#9ca3af'}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField
