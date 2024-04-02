import { View, StyleSheet } from 'react-native'
import Header from '../../components/header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
// import { Feather } from '@expo/vector-icons'
import Icon from '../../components/Icon'

const Index = (): JSX.Element => {
  return (
    <View style = {styles.container}>

      <Header></Header>

      <View style={styles.memoList}>
        <MemoListItem></MemoListItem>
        <MemoListItem></MemoListItem>
        <MemoListItem></MemoListItem>
      </View>

      <CircleButton>
        <Icon name='check' size={40} color='#fff' />
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
