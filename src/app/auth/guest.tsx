import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { signInAnonymously, getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { router } from 'expo-router'

const Guest = (): JSX.Element => {
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user !== null) {
        // ゲストログイン成功時の処理
        console.log('Guest is signed in with UID:', user.uid)
        // リダイレクト
        router.replace('/memo/list')
      } else {
        // ゲストログイン失敗時の処理は不要
        console.log('Guest is signed out')
      }
    })

    return () => {
      // コンポーネントがアンマウントされる時にunsubscribe
      unsubscribe()
    }
  }, []) // useEffectの第二引数に空の配列を渡して初回レンダリング時のみ実行されるようにする

  const handleGuestPress = (): void => {
    const auth = getAuth()
    signInAnonymously(auth)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        localStorage.setItem('guestUID', uid)
      })
      .catch((error) => {
        // ゲストログイン失敗時の処理
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Guest sign in error:', errorCode, errorMessage)
        Alert.alert(String(errorCode), String(errorMessage)) // エラーメッセージを表示
      })
  }

  return (
    <View>
      <TouchableOpacity onPress={handleGuestPress}>
        <Text>ゲストログイン</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Guest
