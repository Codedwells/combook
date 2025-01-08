import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import Navigation, { TopNav } from '@/components/layout/navigation'
import { useAppStore } from '@/store/store'
import axios from 'axios'

type MessageType = {
  text: string
  isBot: boolean
}

export default function ChatScreen() {
  const { messages, addMessage } = useAppStore()
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (message.trim() === '') return

    const userMessage: MessageType = { text: message, isBot: false }
    addMessage(userMessage)
    setMessage('')

    try {
      const response = await axios.post('http://192.168.1.100:8001/api/v1/ai/chat', {
        question: message,
      })
      const botMessage: MessageType = { text: response.data.answer, isBot: true }
      addMessage(botMessage)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <TopNav />
      <ScrollView className='p-4'>
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`max-w-[80%] p-3 rounded-2xl mb-2 ${
              msg.isBot ? 'bg-white self-start' : 'bg-blue-500 self-end'
            }`}
          >
            <Text className={msg.isBot ? 'text-gray-800' : 'text-white'}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className='flex-row p-4 bg-white border-t border-gray-200'>
        <TextInput
          className='flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2'
          value={message}
          onChangeText={setMessage}
          placeholder='Type your message...'
          placeholderTextColor='#999'
        />
        <TouchableOpacity
          className='w-10 h-10 bg-blue-500 rounded-full items-center justify-center'
          onPress={handleSendMessage}
        >
          <MaterialIcons name='send' size={24} color='white' />
        </TouchableOpacity>
      </View>

      <Navigation className='m-4' />
    </SafeAreaView>
  )
}
