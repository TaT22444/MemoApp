import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Link, router } from 'expo-router'

import { useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'

import Btn from '../../components/btn'
import { auth } from '../../config'

const handlePress = (email: string, password: string): void => {
  // login
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user.uid)
      router.replace('/memo/list')
    })
    .catch((error) => {
      const { code, message } = error
      console.log(code, message)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Alert.alert(message)
    })
}

const LogIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text) }}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='Email Address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          autoCapitalize='none'
          secureTextEntry
          placeholder='Password'
          textContentType='password'
        />
        <Btn label='Submit' onPress={ () => { handlePress(email, password) }} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not resustered</Text>
          <Link href='/auth/signup' asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
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

export default LogIn
