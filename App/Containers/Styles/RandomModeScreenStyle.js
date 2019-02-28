import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView: {
    // height: 80,
    // bottom: 80,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center'
  },
  matching: {
    width: Metrics.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  connect: {
    fontSize: 30
  },
  video: {
    flexDirection: 'row',
    // position: 'relative',
    backgroundColor: '#eee'
    // alignSelf: 'stretch',
    // borderWidth: 1
  },
  onlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1e1',
    // position: 'absolute',
    top: 10,
    left: 10
  },
  offlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333'
  },
  callerVideo: {
    flex: 0.5,
    backgroundColor: '#faa',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  calleeVideo: {
    flex: 0.5,
    backgroundColor: '#aaf',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  videoWidget: {
    // position: 'relative',
    // flex: 0.5,
    backgroundColor: '#fff',
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
    borderWidth: 1,
    borderColor: '#eee'
  },
  rtcView: {
    flex: 1,
    width: Metrics.screenWidth / 2,
    backgroundColor: '#f00'
    // position: 'relative'
  }
})
