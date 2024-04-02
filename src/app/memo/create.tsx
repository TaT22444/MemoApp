import {
  TextInput, ScrollView, StyleSheet, KeyboardAvoidingView
} from 'react-native'

import { router } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'

const handlePress = (): void => {
  // login
  router.back()
}

const Create = (): JSX.Element => {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        <TextInput multiline style={styles.input} value=''>
        </TextInput>
      </ScrollView>
      <CircleButton onPress={handlePress}>
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
