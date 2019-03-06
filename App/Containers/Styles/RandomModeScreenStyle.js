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
    left: 0,
    right: 0
  },
  rtcView: {
    backgroundColor: '#000',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight
  },
  blackCover: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})
