import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { onSnapshot, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

// import { Feather } from '@expo/vector-icons'
import Icon from '../../components/Icon'
import CircleButton from '../../components/CircleButton'
import { auth, db } from '../../config'
import { type Memo } from '../../../types/memo'

const handlePress = (id: string): void => {
  // login
  router.push({ pathname: '/memo/edit', params: { id } })
}

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  console.log(id)
  const [memo, setMemo] = useState<Memo | null>(null)
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, String(id))
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo
      setMemo({
        id: memoDoc.id,
        bodyText,
        updatedAt
      })
    })
    return unsubscribe
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
        <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          {memo?.bodyText}
        </Text>
      </ScrollView>
      <CircleButton onPress={() => { handlePress(id) }} style={{ top: 50, bottom: 'auto' }}>
        <Icon name='pen' size={40} color='#fff' />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  memoHeader: {
    height: 96,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#467fd3'
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16
  },
  memoBody: {
    paddingHorizontal: 24
  },
  memoBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    paddingVertical: 32
  }
})

export default Detail
