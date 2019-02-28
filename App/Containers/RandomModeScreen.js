import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import io from 'socket.io-client'
// Styles
import styles from './Styles/RandomModeScreenStyle'
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

class RandomModeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otherUser: null,
      videoURL: null,
      connected: false,
      IceConnectionState: '',
      pendingCandidates: []
    }

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
          {!!this.state.otherUser && (
            <View style={styles.matching}>
              <Text style={styles.connect}>
                {this.state.otherUser.name}
              </Text>

              {!this.state.isAccepted
                ? (
                  <TouchableOpacity onPress={this.onPressAccept} disabled={this.state.offerReceived}>
                    <Text style={styles.connect}>
                      Accept
                  </Text>
                  </TouchableOpacity>
                )
                : (
                  <Text style={styles.connect}>
                    Waiting...
                  </Text>
                )
              }

              <TouchableOpacity onPress={this.onPressNext} disabled={this.state.offerReceived}>
                <Text style={styles.connect}>
                  Next
                  </Text>
              </TouchableOpacity>
            </View>
          )}
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
      setTimeout(() => {
        this.socket.emit('_hunting_start')
      }, 1000)
    })
    this.socket.on('message', (message) => console.log(message))
    this.socket.on('disconnect', () => {
      console.log('Socket Closed')
      this.setState({ connected: false })
    })
    this.socket.on('match_new', (data) => {
      console.log('new matching', data)
      this.setState({ otherUser: data.user })
    })
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

  setupMediaStream () {
    // Setup Camera & Audio
    MediaStreamTrack
      .getSources()
      .then(sourceInfos => {
        let videoSourceId
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i]
          if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
            videoSourceId = sourceInfo.id
          }
        }
        return getUserMedia({
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
      })
      .then(stream => {
        this.setState({
          localStreamURL: stream.toURL()
        })
        this.localStream = stream
      })
      .catch(e => {
        console.error('Failed to setup stream:', e.message)
      })
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

  closeMatching () {
    if (this.peer) {
      this.peer.close()
      delete this.peer
      this.remoteStream = null
    }
    this.setState({
      otherUser: null,
      remoteStreamURL: null,
      pendingRemoteIceCandidates: [],
      isAccepted: false
    })
  }

  async onPressAccept (e) {
    !this.peer && this.setupWebRTC()
    console.log('send match accept and to other user')
    this.socket.emit('_match_accept')
    this.setState({ isAccepted: true })
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
      console.error('Failed to setup local offer', e)
    }
  }

  async onOfferReceived (data) {
    console.log('recieved offer', data)
    !this.peer && this.setupWebRTC()
    const { peer } = this

    await peer.setRemoteDescription(new RTCSessionDescription(data.offer))

    // console.log('add pendding remote candidates')
    // if (Array.isArray(data.candidates)) {
    //   data.candidates.forEach((c) => peer.addIceCandidate(new RTCIceCandidate(c)))
    // }

    console.log('create answer')
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    console.log('send answer to server')
    this.socket.emit('_call_answer', { answer })
    this.setState({
      offerAnswered: true
    })
  }

  async onAnswerReceived (data) {
    console.log('recieved answer', data)
    await this.peer.setRemoteDescription(new RTCSessionDescription(data.answer))
    // data.candidates.forEach(c => this.peer.addIceCandidate(new RTCIceCandidate(c)))
    this.setState({
      answerRecevied: true
    })
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
    if (candidate) {
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
      if (this.state.pendingCandidates.length > 1) {
        console.log('sending candidates')
        this.socket.emit('_candidate', {
          user_id: this.state.otherUser._id,
          candidates: this.state.pendingCandidates
        })
      } else {
        console.error('Failed to send an offer/answer: No candidates')
      }
    }
  }

  async onRemoteIceCandidate (data) {
    console.log('recieved candidates', data)
    if (data.candidates) {
      if (this.peer) {
        for (let candidate of data.candidates) {
          await this.peer.addIceCandidate(new RTCIceCandidate(candidate))
        }
      } else {
        console.error('Peer is not ready')
      }
    } else {
      console.log('Remote ICE Candidates Gathered!')
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

export default connect(mapStateToProps, mapDispatchToProps)(RandomModeScreen)
