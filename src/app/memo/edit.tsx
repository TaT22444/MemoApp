import {
  TextInput, ScrollView, StyleSheet, KeyboardAvoidingView
} from 'react-native'

import Header from '../../components/header'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'

const Edit = (): JSX.Element => {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Header></Header>
      <ScrollView style={styles.inputContainer}>
        <TextInput multiline style={styles.input} value={'買い物\nリスト'}>
        </TextInput>
      </ScrollView>
      <CircleButton>
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

export default Edit
