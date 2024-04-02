import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Link } from 'expo-router'

import Icon from './Icon'

const MemoListItem = (): JSX.Element => {
  return (
    <Link href='/memo/detail' asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2024年3月31日 10:00</Text>
        </View>
        <TouchableOpacity>
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
