import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 115,
    height: 115
  }
})
