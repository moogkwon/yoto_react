import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import WebRTCLib from 'react-native-webrtc'
// import { Actions } from 'react-native-router-flux'
import styles from './Styles/HuntingScreenStyle'
import LottieView from 'lottie-react-native'
import MatchingScreen from './MatchingScreen'
import CallingScreen from './CallingScreen'
import { Actions } from 'react-native-router-flux'
import randomStrings from '../Fixtures/randomStrings.json'
import PaymentScreen from './PaymentScreen'
import { ActionSheetCustom } from 'react-native-actionsheet'

const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView
} = WebRTCLib

class HuntingScreen extends Component {
  constructor (props) {
    super(props)
    this.localStream = props.localStream
    this.socket = props.socket
    this.state = {
      otherUser: null,
      isCalling: false,
      isConnecting: false,
      isShowPurchase: false,
      randomString: ''
    }
  }

  componentDidMount () {
    this.setupSocket()
    this.onPressNext()
    this.startRandomMessage()
  }

  componentWillUnmount () {
    clearInterval(this.randomStringInterval)
    clearTimeout(this.connectingTimeout)
    // this.closeMatching()
    if (this.socket) {
      this.socket.emit('hunting_stop')
      this.socket.removeAllListeners('match_new')
      this.socket.removeAllListeners('match_close')
      this.socket.removeAllListeners('call_start')
      this.socket.removeAllListeners('call_offer')
      this.socket.removeAllListeners('call_answer')
      this.socket.removeAllListeners('candidate')
    }
  }

  setupSocket () {
    // Setup Socket
    this.socket.emit('_hunting_start')
    this.socket.on('match_new', (data) => this.onNewMaching(data))
    this.socket.on('match_close', () => this.closeMatching())
    this.socket.on('call_start', (data) => this.sendOffer(data))
    this.socket.on('call_offer', (data) => this.onOfferReceived(data))
    this.socket.on('call_answer', (data) => this.onAnswerReceived(data))
    this.socket.on('candidate', (data) => this.onRemoteIceCandidate(data))
    this.socket.on('call_unlocked', (data) => this.onCallUnlocked(data))
    this.socket.on('become_friend', (data) => this.onBecomeFriend(data))
  }

  onPressNext () {
    this.socket.emit('_match_next')
    this.closeMatching()
  }

  onNewMaching (data) {
    console.log('new matching', data)
    this.setState({ otherUser: data.user, isConnecting: false })
    this.machingTimout = setTimeout(() => {
      if (this.state.otherUser) {
        this.setupWebRTC()
        this.socket.emit('_match_accept')
        this.setState({ isConnecting: true })
      }
    }, 2000)
  }

  async sendOffer () {
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
        isCalling: true,
        isConnecting: false
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
        isCalling: true,
        isConnecting: false
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
        console.log('webrtc connection failed')
        this.socket && this.socket.emit('_match_next')
        this.closeMatching()
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
      this.setState({ pendingCandidates: [] })
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

  closeMatching () {
    this.setState({
      otherUser: null,
      remoteStreamURL: null,
      pendingRemoteIceCandidates: [],
      isCalling: false,
      isConnecting: false
    })
    if (this.peer) {
      this.peer.close()
      delete this.peer
      this.remoteStream = null
    }
    clearTimeout(this.connectingTimeout)
    setTimeout(() => {
      console.log('send: _hunting_start')
      this.socket.emit('_hunting_start')
    }, 5000)
  }

  onFinish () {
    console.log('send: _call_hangup')
    this.socket.emit('_call_hangup')
    this.closeMatching()
  }

  onPressClose () {
    Actions.pop()
  }

  startRandomMessage () {
    this.setState({ randomString: randomStrings[Math.floor(Math.random() * randomStrings.length)] })
    this.randomStringInterval = setInterval(() => {
      this.setState({ randomString: randomStrings[Math.floor(Math.random() * randomStrings.length)] })
    }, 5000)
  }

  onRequestUnlock () {
    console.log('sendL: _call_unlock')
    // if purchased
    this.socket && this.socket.emit('_call_unlock')
    this.calling && this.calling.unlock()
    // else show purchase
    // this.setState({ isShowPurchase: true })
  }

  onCallUnlocked () {
    console.log('recieve: call_unlocked')
    this.calling && this.calling.unlock()
  }

  onRequestFriend () {
    console.log('send: _add_friend')
    this.socket && this.socket.emit('_add_friend')
  }

  onBecomeFriend (data) {
    console.log('recieve: become_friend', data)
    this.calling && this.calling.becomeFriend(this.props.user.lgbtq && data.user.lgbtq, data.user.instagram)
  }

  onPressPurcase () {
    this.setState({ isShowPurchase: false }, () => this.calling.unlock())
  }

  onReportActionsheetPress () {

  }

  onReportProfileActionsheetPress () {

  }

  setupWebRTC () {
    const configuration = { 'iceServers': this.props.ice_servers }
    console.log('configuration', configuration)
    const peer = new RTCPeerConnection(configuration)
    peer.oniceconnectionstatechange = e => this.onIceConnectionStateChange(e)
    peer.onaddstream = e => this.onAddStream(e)
    peer.onicecandidate = e => this.onIceCandiate(e)
    console.log('localStream:', this.localStream)
    peer.addStream(this.localStream)
    this.peer = peer
    console.log('setup webrtc done!')
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        <PaymentScreen
          visible={this.state.isShowPurchase}
          onClose={() => this.setState({ isShowPurchase: false })}
          onPressPurchase={productId => this.onPressPurcase(productId)}
        />

        <ActionSheetCustom
          ref={o => { this.reportActionSheet = o }}
          title='Would you like to report this user?'
          message="Our goal is to create a respectful community. We review the reoirts very seriously. please don't hesitate to report. We will take care of the situation 👮‍"
          options={[
            'Person is nude 🔞',
            'Person is mean 😤',
            'Cancel'
          ]}
          cancelButtonIndex={2}
          onPress={(index) => this.onReportActionsheetPress(index)}
        />
        <ActionSheetCustom
          ref={o => { this.reportProfileActionSheet = o }}
          title='Would you like to report this profile?'
          options={[
            'Report inapporopriate profile 👮‍',
            'Cancel'
          ]}
          cancelButtonIndex={1}
          onPress={(index) => this.onReportProfileActionsheetPress(index)}
        />
      </View>
    )
  }

  renderContent () {
    const { otherUser, isCalling } = this.state
    if (isCalling) {
      return (
        <CallingScreen
          ref={ref => (this.calling = ref)}
          localStreamURL={this.props.localStreamURL}
          remoteStreamURL={this.state.remoteStreamURL}
          onTimeout={() => this.onFinish()}
          onFinish={() => this.onFinish()}
          onRequestUnlock={() => this.onRequestUnlock()}
          onRequestFriend={() => this.onRequestFriend()}
          onReport={(photo) => this.reportActionSheet.show()}
        />
      )
    } else if (otherUser) {
      return (
        <MatchingScreen
          otherUser={otherUser}
          onPressNext={() => this.onPressNext()}
          onPressMeet={() => this.onPressMeet()}
          onPressReport={() => this.reportProfileActionSheet.show()}
          isConnecting={this.state.isConnecting}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.video}>
            <RTCView
              streamURL={this.props.localStreamURL}
              style={styles.rtcView}
              objectFit='cover'
            />
          </View>
          <View style={styles.blackCover}>
            <LottieView
              source={require('../Fixtures/lotties/random_loading.json')}
              autoPlay
              loop
              style={styles.lottie}
              resizeMode='cover'
            />
            <Text style={styles.actionLabel}>
              {this.state.randomString}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => this.onPressClose()}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </View >
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HuntingScreen)
