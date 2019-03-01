import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.primaryColor
  },
  containerContent: {
    paddingTop: 80,
    height: Metrics.screenHeight - Metrics.statusBarHeight
  },
  inputGroup: {
    backgroundColor: '#003E7C',
    width: 310,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center'
  },
  inputIcon: {
    width: 28,
    height: 28
  },
  input: {
    color: '#fff',
    fontFamily: Fonts.type.alteBold,
    fontSize: 20,
    marginLeft: 10,
    flex: 1
  },
  atText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: Fonts.type.alteBold,
    fontSize: 20,
    marginLeft: 10
  },
  emoji: {
    color: '#fff',
    fontSize: 20
  },
  genderLabels: {
    marginTop: 10,
    flexDirection: 'row',
    width: 310,
    alignSelf: 'center'
  },
  genderTitle: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'center'
  },
  genderLabel: {
    fontFamily: Fonts.type.alte,
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'center'
  },
  genderGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 260
  },
  genderSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 72,
    width: 168,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  genderButton: {
    margin: 3,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  genderIcon: {
    width: 40,
    height: 40
  },
  privacyButton: {
    width: 310,
    alignSelf: 'center'
  },
  privacyText: {
    textAlign: 'center',
    fontFamily: Fonts.type.alte,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)'
  },
  signupButton: {
    width: 310,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 80,
    alignSelf: 'center'
  },
  signupText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 21,
    color: Colors.disabledText
  }
})
