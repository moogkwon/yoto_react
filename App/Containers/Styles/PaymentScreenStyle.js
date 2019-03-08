import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center'
  },
  imageBackground: {
    alignSelf: 'center',
    marginTop: -120
  },
  button: {
    width: 260,
    height: 70,
    borderRadius: 35,
    marginTop: 5,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPurchase2: {
    justifyContent: 'flex-end',
    paddingBottom: 7
  },
  buttonPurchase3: {
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginTop: 10
  },
  buttonText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 22,
    color: '#474646',
    marginBottom: 5
  },
  saveText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 10,
    color: '#fff'
  },
  buttonBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  description1: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 14,
    color: '#fff'
  },
  description2: {
    fontFamily: Fonts.type.alte,
    fontSize: 12,
    color: '#fff',
    marginHorizontal: 10,
    textAlign: 'center'
  }
})
