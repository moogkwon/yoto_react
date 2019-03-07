import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    backgroundColor: 'transparent',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight,
    position: 'absolute',
    top: 0,
    left: 0
  },
  rtcView: {
    backgroundColor: '#000',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight
    // position: 'relative'
  },
  blackCover: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blurCover: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight,
    justifyContent: 'flex-end'
  },
  actionLabel: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 29,
    color: '#fff'
  },
  lottie: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight,
    position: 'absolute',
    top: 0,
    left: 0
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  incommingCall: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 23,
    color: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    top: '10%',
    backgroundColor: '#4CD964',
    padding: 10,
    borderRadius: 12
  },
  textName: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 23,
    color: '#fff',
    marginLeft: 40
  },
  textDescription: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 20,
    color: '#fff',
    marginLeft: 40
  },
  buttons: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrics.screenWidth - 80,
    marginLeft: 40
  },
  buttonNext: {
    height: 50,
    width: (Metrics.screenWidth - 100) / 2,
    backgroundColor: '#65E4FD',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonMeet: {
    height: 50,
    width: (Metrics.screenWidth - 100) / 2,
    backgroundColor: '#FF428E',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 28,
    color: '#fff'
  }
})
