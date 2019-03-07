import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    flex: 1,
    flexDirection: 'column'
  },
  videoWidget: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: '#ccc'
  },
  rtcView: {
    flex: 1,
    width: Metrics.screenWidth
  },
  clockButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 70,
    height: 70
  },
  clock: {
    width: 70,
    height: 70
  },
  unlock: {
    position: 'absolute',
    top: -23,
    right: -22,
    width: 200,
    height: 200
  },
  becomeFriend: {
    position: 'absolute'
  },
  instagramButton: {
    position: 'absolute',
    top: (Metrics.screenHeight - Metrics.statusBarHeight - 36) / 2,
    height: 36,
    borderRadius: 18,
    alignSelf: 'center',
    overflow: 'hidden'
  },
  instagramBackground: {
    // width: '100%',
    height: '100%',
    borderRadius: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  instagramText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 17,
    color: '#fff'
  },
  bottomView: {
    position: 'absolute',
    bottom: 20,
    width: Metrics.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  reportButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF00D5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reportIcon: {
    width: 30,
    height: 30
  },
  followButton: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 28,
    color: '#fff'
  },
  peaceOutButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F6FF00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  peaceOutIcon: {
    width: 34,
    height: 34
  }
})
