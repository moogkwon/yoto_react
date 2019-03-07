import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import io from 'socket.io-client'
// Styles
import styles from './Styles/CallingExampleScreenStyle'
import DeviceInfo from 'react-native-device-info'
import WebRTCLib from 'react-native-webrtc'

const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} = WebRTCLib

let isFront = true
const configuration = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] }

class CallingExampleScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otherUser: null,
      videoURL: null,
      connected: false,
      IceConnectionState: '',
      pendingCandidates: [],
      status: ''
    }

    this.startHunting = this.startHunting.bind(this)
    this.stopHunting = this.stopHunting.bind(this)
    this.onPressAccept = this.onPressAccept.bind(this)
    this.onPressNext = this.onPressNext.bind(this)
    this.onIceConnectionStateChange = this.onIceConnectionStateChange.bind(this)
    this.onAddStream = this.onAddStream.bind(this)
    this.onIceCandiate = this.onIceCandiate.bind(this)
    this.onAnswerReceived = this.onAnswerReceived.bind(this)
    this.onOfferReceived = this.onOfferReceived.bind(this)
    this.setupWebRTC = this.setupWebRTC.bind(this)
    this.onRemoteIceCandidate = this.onRemoteIceCandidate.bind(this)
    this.sendOffer = this.sendOffer.bind(this)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.video}>
          <View style={styles.callerVideo}>
            <View style={styles.videoWidget}>
              {this.state.localStreamURL &&
                <RTCView streamURL={this.state.localStreamURL} style={styles.rtcView} />
              }
            </View>
          </View>
          <View style={styles.calleeVideo}>
            <View style={styles.videoWidget}>
              {this.state.remoteStreamURL &&
                <RTCView streamURL={this.state.remoteStreamURL} style={styles.rtcView} />
              }
            </View>
          </View>
        </View>
        <View style={this.state.connected ? styles.onlineCircle : styles.offlineCircle} />
        <View style={styles.bottomView}>
          <View style={styles.matching}>
            {!!this.state.otherUser && (
              <Text style={styles.connect}>{this.state.otherUser.name}</Text>
            )}

            {this.state.status === 'matching' && (
              <TouchableOpacity onPress={this.onPressAccept}>
                <Text style={styles.connect}>Accept</Text>
              </TouchableOpacity>
            )}
            {this.state.status === 'waiting' && (
              <Text style={styles.connect}>Waiting...</Text>
            )}
            {this.state.status === 'calling' && (
              <Text style={styles.connect}>Calling...</Text>
            )}
            {this.state.status === '' && this.state.connected && (
              <TouchableOpacity onPress={this.startHunting}>
                <Text style={styles.connect}>Tap to begin</Text>
              </TouchableOpacity>
            )}
            {this.state.status === 'hunting' && (
              <TouchableOpacity onPress={this.stopHunting}>
                <Text style={styles.connect}>Stop hunting</Text>
              </TouchableOpacity>
            )}

            {!!this.state.otherUser && (
              <TouchableOpacity onPress={this.onPressNext}>
                <Text style={styles.connect}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    )
  }

  componentDidMount () {
    // Setup Socket
    this.socket = io.connect(`ws://3.93.63.217:3333/chat?token=${this.props.auth.token}&device_id=${DeviceInfo.getUniqueID()}`)
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
    this.socket.on('match_new', (data) => this.onNewMaching(data))
    this.socket.on('match_close', () => this.closeMatching())
    this.socket.on('call_start', (data) => this.sendOffer(data))
    this.socket.on('call_offer', (data) => this.onOfferReceived(data))
    this.socket.on('call_answer', (data) => this.onAnswerReceived(data))
    this.socket.on('candidate', (data) => this.onRemoteIceCandidate(data))

    this.setupMediaStream()
  }

  componentWillUnmount () {
    this.closeMatching()
    this.socket && this.socket.close()
  }

  startHunting () {
    this.socket.emit('_hunting_start')
    this.setState({ status: 'hunting' })
  }

  stopHunting () {
    this.socket.emit('_stop_start')
    this.setState({ status: '' })
  }

  onNewMaching (data) {
    console.log('new matching', data)
    this.setState({ otherUser: data.user, status: 'matching' })
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

  setupWebRTC () {
    const peer = new RTCPeerConnection(configuration)
    peer.oniceconnectionstatechange = this.onIceConnectionStateChange
    peer.onaddstream = this.onAddStream
    peer.onicecandidate = this.onIceCandiate
    console.log('localStream:', this.localStream)
    peer.addStream(this.localStream)
    this.peer = peer
    console.log('setup webrtc done!')
  }

  onPressNext () {
    console.log('user press next')
    this.socket.emit('_match_next')
    this.closeMatching()
  }

  closeMatching (exit) {
    if (this.peer) {
      this.peer.close()
      delete this.peer
      this.remoteStream = null
    }
    this.setState({
      otherUser: null,
      remoteStreamURL: null,
      pendingRemoteIceCandidates: [],
      status: ''
    })
  }

  async onPressAccept (e) {
    !this.peer && this.setupWebRTC()
    console.log('send match accept and to other user')
    this.socket.emit('_match_accept')
    this.setState({ isAccepted: true, status: 'waiting' })
  }

  async sendOffer (e) {
    !this.peer && this.setupWebRTC()
    const { peer } = this
    try {
      // Create Offer
      const offer = await peer.createOffer()
      console.log('Offer Created:', offer)
      this.offer = offer

      await peer.setLocalDescription(offer)
      console.log('localDescription set!')

      // For now send localDescription
      console.log('send offer to other user')
      this.socket.emit('_call_offer', { offer })
    } catch (e) {
      console.log('Failed to setup local offer', e)
      this.closeMatching()
    }
  }

  async onOfferReceived (data) {
    console.log('recieved offer', data)
    try {
      !this.peer && this.setupWebRTC()
      const { peer } = this

      await peer.setRemoteDescription(new RTCSessionDescription(data.offer))

      console.log('create answer')
      const answer = await peer.createAnswer()
      await peer.setLocalDescription(answer)
      console.log('send answer to server')
      this.socket.emit('_call_answer', { answer })
      this.setState({
        offerAnswered: true,
        status: 'calling'
      })
    } catch (error) {
      console.log(error)
      this.closeMatching()
    }
  }

  async onAnswerReceived (data) {
    console.log('recieved answer', data)
    try {
      await this.peer.setRemoteDescription(new RTCSessionDescription(data.answer))
      this.setState({
        answerRecevied: true,
        status: 'calling'
      })
    } catch (error) {
      console.log(error)
      this.closeMatching()
    }
  }

  onIceConnectionStateChange (e) {
    console.log('ICE Connection State Changed:', e.target.iceConnectionState)
    this.setState({
      IceConnectionState: e.target.iceConnectionState
    })

    switch (e.target.iceConnectionState) {
      case 'closed':
      case 'disconnected':
      case 'failed':
        this.closeMatching()
        this.socket.emit('_match_next')
        break
    }
  }

  onIceCandiate (event) {
    const { candidate } = event
    console.log('ICE Candidate Found:', candidate)
    if (candidate) { // push candidate to stack
      let pendingRemoteIceCandidates = this.state.pendingCandidates
      if (Array.isArray(pendingRemoteIceCandidates)) {
        this.setState({
          pendingCandidates: [...pendingRemoteIceCandidates, candidate]
        })
      } else {
        this.setState({
          pendingCandidates: [candidate]
        })
      }
    } else { // Candidate gathering complete
      if (this.state.pendingCandidates.length > 1 && this.state.otherUser) {
        console.log('sending candidates')
        this.socket.emit('_candidate', {
          user_id: this.state.otherUser._id,
          candidates: this.state.pendingCandidates
        })
      } else {
        console.log('Failed to send an offer/answer: No candidates')
      }
    }
  }

  async onRemoteIceCandidate (data) {
    console.log('recieved candidates', data)
    try {
      if (data.candidates) {
        if (this.peer) {
          for (let candidate of data.candidates) {
            await this.peer.addIceCandidate(new RTCIceCandidate(candidate))
          }
        } else {
          console.log('Peer is not ready')
        }
      } else {
        console.log('Remote ICE Candidates Gathered!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  onAddStream (e) {
    console.log('Remote Stream Added:', e.stream)
    this.setState({
      remoteStreamURL: e.stream.toURL()
    })
    this.remoteStream = e.stream
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

export default connect(mapStateToProps, mapDispatchToProps)(CallingExampleScreen)
