import { Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  label: string
  onPress?: () => void
}

const Btn = (props: Props): JSX.Element => {
  const { label, onPress } = props
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#467fd3',
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 24,
    alignSelf: 'flex-start'
  },
  btnLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 40
  }
})

export default Btn
