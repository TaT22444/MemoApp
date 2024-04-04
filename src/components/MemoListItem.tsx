import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Link } from 'expo-router'
import { deleteDoc, doc } from 'firebase/firestore'

import Icon from './Icon'
import { type Memo } from '../../types/memo'
import { auth, db } from '../config'

interface Props {
  memo: Memo
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  Alert.alert('いい？', '本当に', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
          .catch(() => {
            Alert.alert('削除に失敗')
          })
      }
    }
  ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props
  const { bodyText, updatedAt } = memo
  if (bodyText === null || updatedAt === null) { return null }
  const dateString = updatedAt.toDate().toLocaleString('ja-JP')
  return (
    <Link
      href={{ pathname: '/memo/detail', params: { id: memo.id } }}
      asChild
    >
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>
        <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
          <Icon name='check' size={32} color='#b0b0b0' />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 24
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: 'gray'
  }
})

export default MemoListItem
