import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import io from 'socket.io-client'
// Styles
import styles from './Styles/RandomModeScreenStyle'
import DeviceInfo from 'react-native-device-info'
import WebRTCLib from 'react-native-webrtc'
import { Actions } from 'react-native-router-flux'
import Config from '../Config/AppConfig'

const {
  MediaStreamTrack,
  getUserMedia,
  RTCView
} = WebRTCLib

let isFront = true

class RandomModeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videoURL: null,
      connected: false,
      status: ''
    }
  }

  componentDidMount () {
    this.setupMediaStream()
    // Setup Socket
    this.socket = io.connect(Config.socketURL, {
      query: {
        token: this.props.auth.token,
        device_id: DeviceInfo.getUniqueID()
      }
    })
    console.log(this.socket)
    this.socket.removeAllListeners()
    this.socket.on('connect', () => {
      console.log('Socket Connected!')
      this.setState({ connected: true })
    })
    this.socket.on('message', (message) => console.log(message))
    this.socket.on('disconnect', () => {
      console.log('Socket Closed')
      this.setState({ connected: false })
    })
    this.socket.on('ice_server', (data) => {
      this.setState({ ice_servers: data.ice_servers })
    })
  }

  componentWillUnmount () {
    this.closeMatching()
    this.socket && this.socket.close()
  }

  async setupMediaStream () {
    try {
      // Setup Camera & Audio
      const sourceInfos = await MediaStreamTrack.getSources()
      let videoSourceId
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i]
        if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
          videoSourceId = sourceInfo.id
        }
      }
      const stream = await getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 300, // Provide your own width, height and frame rate here
            minHeight: 500,
            minFrameRate: 30
          },
          facingMode: (isFront ? 'user' : 'environment'),
          optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
        }
      })
      this.setState({
        localStreamURL: stream.toURL()
      })
      this.localStream = stream
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  render () {
    console.log(Actions.currentScene)
    return (
      <View style={styles.container}>
        <View style={styles.video}>
          {Actions.currentScene === '_randomMode' && this.state.localStreamURL &&
            <RTCView
              streamURL={this.state.localStreamURL}
              style={styles.rtcView}
              objectFit='cover'
            />
          }
          {/* <View style={this.state.connected ? styles.onlineCircle : styles.offlineCircle} /> */}
        </View>
        {this.state.connected && this.state.localStreamURL
          ? (
            <TouchableOpacity
              style={styles.blackCover}
              activeOpacity={1}
              onPress={() => Actions.hunting({
                localStream: this.localStream,
                localStreamURL: this.state.localStreamURL,
                socket: this.socket,
                ice_servers: this.state.ice_servers
              })}
            >
              <Text style={styles.actionLabel}>Tap to start</Text>
            </TouchableOpacity>
          )
          : <Text style={styles.actionLabel}>Waiting...</Text>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomModeScreen)
