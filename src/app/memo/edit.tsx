/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  TextInput, ScrollView, StyleSheet, KeyboardAvoidingView
} from 'react-native'

import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { auth, db } from '../../config'

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [bodyText, setBodyText] = useState('')
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    getDoc(ref)
      .then((docRef) => {
        const RemoteBodyText = docRef.data()?.bodyText
        setBodyText(RemoteBodyText)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => { setBodyText(text) }}
          autoFocus
          >
        </TextInput>
      </ScrollView>
      <CircleButton onPress={() => { handlePress(id, bodyText) }}>
        <Icon name='check' size={40} color="#fff"></Icon>
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 24
  }
})

export default Edit
