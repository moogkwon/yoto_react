import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  card: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingBottom: 80,
    alignItems: 'center'
  },
  profileContainner: {
    marginTop: 40,
    width: 280,
    height: 400,
    borderRadius: 25,
    overflow: 'hidden'
  },
  profilePhoto: {
    width: 280,
    height: 400
  },
  chooseButton: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff4280',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  chooseText: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 21,
    color: Colors.yellow
  },
  continueButton: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  continueText: {
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
