import React, { useState } from 'react'
import { dummyNotes } from '@/constants/data'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigation, { TopNav } from '@/components/layout/navigation'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from 'react-native'
import { generateRandomId } from '@/lib/utils'
import dayjs from 'dayjs'

type NoteType = {
  title: string
  summary: string
  date: string
  id: string
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null)
  const [newNote, setNewNote] = useState<NoteType>({
    title: '',
    summary: '',
    date: dayjs().format('MMMM D, YYYY'),
    id: generateRandomId(),
  })

  const handleAddNote = () => {
    if (editMode) {
      setNotes(notes.map(note => note.id === newNote.id ? newNote : note))
      setEditMode(false)
    } else {
      setNotes([...notes, newNote])
    }
    setModalVisible(false)
    setNewNote({ title: '', summary: '', date: dayjs().format('MMMM D, YYYY'), id: generateRandomId() })
  }

  const handleEditNote = (note: NoteType) => {
    setNewNote(note)
    setEditMode(true)
    setModalVisible(true)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleViewNote = (note: NoteType) => {
    setCurrentNote(note)
    setViewModalVisible(true)
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-4'>
      <TopNav />
      <ScrollView className='mt-4'>
        {notes.map((note) => (
          <TouchableOpacity key={note.id} onPress={() => handleViewNote(note)}>
            <View className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
              <Text className='text-lg font-semibold mb-2'>{note.title}</Text>
              <Text className='text-gray-600 mb-3'>{note.summary}</Text>
              <View className='flex-row justify-between items-center'>
                <Text className='text-xs text-gray-400'>{note.date}</Text>
                <View className='flex-row gap-2'>
                  <Button title='Edit' onPress={() => handleEditNote(note)} />
                  <Button title='Delete' onPress={() => handleDeleteNote(note.id)} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        className='flex-row items-center justify-center bg-blue-500 p-4 rounded-lg mb-4'
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name='upload-file' size={24} color='white' />
        <Text className='text-white text-base font-semibold ml-2'>
          Upload New Note
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
            <Text className='text-lg font-semibold mb-4'>{editMode ? 'Edit Note' : 'New Note'}</Text>
            <TextInput
              placeholder='Title'
              value={newNote.title}
              onChangeText={(text) => setNewNote({ ...newNote, title: text })}
              className='border-b border-gray-300 mb-4 p-2'
            />
            <TextInput
              placeholder='Summary'
              value={newNote.summary}
              multiline
              onChangeText={(text) => setNewNote({ ...newNote, summary: text })}
              className='border rounded h-[100px] border-gray-300 mb-4 p-2'
            />
            <View className='flex flex-row justify-center gap-2 items-center'>
              <Button title={editMode ? 'Save Changes' : 'Add Note'} onPress={handleAddNote} />
              <Button title='Cancel' onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={viewModalVisible}
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-80'>
            {currentNote && (
              <>
                <Text className='text-lg font-semibold mb-4'>{currentNote.title}</Text>
                <Text className='text-gray-600 mb-3'>{currentNote.summary}</Text>
                <Text className='text-xs text-gray-400'>{currentNote.date}</Text>
                <Button title='Close' onPress={() => setViewModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      <Navigation />
    </SafeAreaView>
  )
}
