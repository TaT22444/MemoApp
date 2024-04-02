import { View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
// import { Feather } from '@expo/vector-icons'
import Icon from '../../components/Icon'
import LogOutBtn from '../../components/logoutbtn'

const handlePress = (): void => {
  // login
  router.push('/memo/create')
}

const Index = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutBtn /> }
    })
  }, [])
  return (
    <View style = {styles.container}>
      <View style={styles.memoList}>
        <MemoListItem></MemoListItem>
        <MemoListItem></MemoListItem>
        <MemoListItem></MemoListItem>
      </View>

      <CircleButton onPress={handlePress}>
        <Icon name='plus' size={40} color='#fff' />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff'
  },

  memoList: {
    marginTop: 8,
    marginHorizontal: 16
  }
})

export default Index
