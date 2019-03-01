import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80
  },
  lottie: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    top: -50,
    position: 'absolute'
  },
  phoneLoginButton: {
    width: 310,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  phoneLoginText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 21,
    color: Colors.primaryColor
  },
  bottomView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 150
  }
})
