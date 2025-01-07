import React from 'react'
import { Stack } from 'expo-router'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: useClientOnlyValue(false, false),
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='chat'
        options={{
          title: 'Chats',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='notes'
        options={{
          title: 'Notes',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
