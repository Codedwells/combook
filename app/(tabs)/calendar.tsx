import React, { useEffect, useState } from 'react'
import * as Calendar from 'expo-calendar'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from 'react-native'
import Navigation, { TopNav } from '@/components/layout/navigation'
import { generateRandomId } from '@/lib/utils'
import { useAppStore } from '@/store/store'

type EventType = {
  title: string
  date: string
  time: string
  location: string
  id: string
}

export default function CalendarScreen() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppStore()
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newEvent, setNewEvent] = useState<EventType>({
    title: '',
    date: '',
    time: '',
    location: '',
    id: generateRandomId(),
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        )
      }
    })()
  }, [])

  const handleAddEvent = () => {
    if (editMode) {
      updateEvent(newEvent)
      setEditMode(false)
    } else {
      addEvent(newEvent)
    }
    setModalVisible(false)
    setNewEvent({ title: '', date: '', time: '', location: '', id: generateRandomId() })
  }

  const handleEditEvent = (event: EventType) => {
    setNewEvent(event)
    setEditMode(true)
    setModalVisible(true)
  }

  return (
    <SafeAreaView className='flex-1 p-4 bg-gray-100'>
      <TopNav />

      <ScrollView className='flex-1'>
        {events.map((event) => (
          <View key={event.id} className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-lg font-semibold'>{event.title}</Text>
              <Text className='text-blue-500'>{event.time}</Text>
            </View>
            <Text className='text-gray-600 mb-1'>{event.date}</Text>
            <Text className='text-gray-400'>{event.location}</Text>
            <View className='flex-row justify-end gap-2'>
              <Button title='Edit' onPress={() => handleEditEvent(event)} />
              <Button title='Delete' onPress={() => deleteEvent(event.id)} />
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className='flex-row items-center justify-center bg-blue-500 p-4 mx-4 mb-4 rounded-lg'
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name='add' size={24} color='white' />
        <Text className='text-white text-base font-semibold ml-2'>
          Add New Event
        </Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-80'>
            <Text className='text-lg font-semibold mb-4'>{editMode ? 'Edit Event' : 'New Event'}</Text>
            <TextInput
              placeholder='Title'
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              className='border-b border-gray-300 mb-4 p-2'
            />
            <TextInput
              placeholder='Date'
              value={newEvent.date}
              onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
              className='border-b border-gray-300 mb-4 p-2'
            />
            <TextInput
              placeholder='Time'
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
              className='border-b border-gray-300 mb-4 p-2'
            />
            <TextInput
              placeholder='Location'
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
              className='border-b border-gray-300 mb-4 p-2'
            />
            <View className='flex gap-2 items-center'>
              <Button title={editMode ? 'Save Changes' : 'Add Event'} onPress={handleAddEvent} />
              <Button title='Cancel' onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Navigation />
    </SafeAreaView>
  )
}
