import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  video: {
    width: Metrics.screenWidth / 3 * 2,
    height: Metrics.screenHeight / 3 * 2,
    backgroundColor: '#ccc',
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  avatarView: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10
  },
  title: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 15,
    color: '#0080FF',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 5
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 1,
    height: 44,
    paddingHorizontal: 20
  },
  rowLabel: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 17,
    color: '#000000'
  },
  iconArrow: {
    width: 10,
    height: 10
  },
  buttonLogout: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 40,
    height: 44
  }
})
