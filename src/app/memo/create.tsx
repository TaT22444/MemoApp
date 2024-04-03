import {
  TextInput, View, StyleSheet, KeyboardAvoidingView
} from 'react-native'

import { router } from 'expo-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { db, auth } from '../../config'

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) {
    return
  }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then((docRef) => {
      console.log('s', docRef.id)
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const Create = (): JSX.Element => {
  const [bodyText, setBofyText] = useState('')
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          autoCapitalize='none'
          onChangeText={(text) => { setBofyText(text) }}
        />
      </View>
      <CircleButton onPress={ () => { handlePress(bodyText) }}>
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
    paddingVertical: 32,
    paddingHorizontal: 24,
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})

export default Create
