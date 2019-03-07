import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 19,
    color: '#000000',
    alignSelf: 'center',
    marginTop: 20
  },
  search: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 19,
    color: '#000000',
    padding: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 9,
    marginHorizontal: 20,
    marginTop: 20
  },
  list: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    height: 44,
    paddingHorizontal: 20
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc'
  },
  name: {
    fontFamily: Fonts.type.alteBold,
    fontSize: 19,
    color: '#000000',
    marginLeft: 10
  },
  country: {
    fontFamily: Fonts.type.alte,
    fontSize: 14,
    color: '#C1C1C1',
    marginLeft: 10
  },
  buttonFollow: {
    height: 25,
    width: 100,
    backgroundColor: '#FFFC00',
    borderRadius: 12.5,
    borderWidth: 3,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonFollowText: {
    fontFamily: Fonts.type.alte,
    fontSize: 16,
    color: '#0080FF'
  }
})
