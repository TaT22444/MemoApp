import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Link, router } from 'expo-router'

import { useState } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../config'

import Btn from '../../components/btn'
import Guest from './guest'

const handlePress = (email: string, password: string): void => {
  // signin
  console.log(email, password)
  createUserWithEmailAndPassword(auth, email, password)
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

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('User signed up with UID:', userCredential.user.uid)

      // ゲストログイン時に保存されたゲストUIDを取得
      const guestUID = localStorage.getItem('guestUID')

      // ゲストUIDが存在する場合は、ゲストログイン時のデータを移行する処理をここに記述
      if (guestUID) {
        console.log('Guest UID:', guestUID)
        // ゲストログイン時のデータの移行処理を行う
      }

      // サインアップ成功後、リダイレクト
      router.replace('/memo/list')
    } catch (error) {
      console.error('Sign up error:', error)
      Alert.alert('Sign up error:', error.message)
    }
  }

  // ボタンが押された時の処理を定義
  const handleUp = (): void => {
    handleSignUp(email, password)
      .then(() => {
        // サインアップ成功時の処理
      })
      .catch((error) => {
        // サインアップ失敗時の処理
        console.error('Sign up error:', error)
        Alert.alert('Sign up error:', error.message)
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
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
        <Btn label="signIn" onPress={handleUp} />
        <Btn label='Submit' onPress={() => { handlePress(email, password) }} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <Link href='/auth/login' asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Guest />
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
