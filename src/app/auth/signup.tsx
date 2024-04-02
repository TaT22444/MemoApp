import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import Header from '../../components/header'
import Btn from '../../components/btn'

const SignUp = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.input} value='Email'></TextInput>
        <TextInput style={styles.input} value='Password'></TextInput>
        <Btn label='Submit' />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  inner: {
    paddingVertical: 40,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddddd',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
    color: '#7b7b7b'
  },
  footer: {
    flexDirection: 'row',
    gap: 8
  },
  footerText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 16,
    color: '#467fd3',
    borderBottomWidth: 1,
    borderBottomColor: '#467fd3'
  }
})

export default SignUp
