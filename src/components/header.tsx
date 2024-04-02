import { View, Text, StyleSheet } from 'react-native'

const Header = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>Memo App</Text>
        <Text style={styles.headerRight}>ログアウト</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#467fd3',
    height: 120,
    justifyContent: 'flex-end'
  },
  headerInner: {
    alignItems: 'center',
    paddingBottom: 16
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    color: 'rgba(255,255,255,0.7)'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default Header
