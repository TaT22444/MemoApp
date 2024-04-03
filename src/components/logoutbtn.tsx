import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'

import { auth } from '../config'

const handlePress = (): void => {
  signOut(auth)
    .then(() => {
      router.replace('/auth/login')
    })
    .catch(() => {
      Alert.alert('失敗')
    })
}

const LogOutBtn = (): JSX.Element => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.7)'
  }
})

export default LogOutBtn
