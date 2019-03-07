import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
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

const {
  RTCView
} = WebRTCLib

class HuntingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otherUser: null,
      isCalling: false,
      randomString: ''
    }
  }

  componentDidMount () {
    this.onPressNext()
    this.startRandomMessage()
  }

  componentWillUnmount = () => {
    clearInterval(this.randomStringInterval)
    clearTimeout(this.timeout)
  }

  onPressNext () {
    this.setState({
      otherUser: null,
      isCalling: false
    })
    setTimeout(() => {
      this.setState({
        otherUser: {
          first_name: 'Anna',
          birth_year: 2000,
          location_country: 'United States',
          location_country_code: 'US',
          profile_video_url: 'https://d2po1euy792wnk.cloudfront.net/uploads/videos/13738f203fbd11e99b2f01c9f830af1f_video.mov',
          profile_photo_url: 'https://d2po1euy792wnk.cloudfront.net/uploads/reports/97f7a7c03e7011e99b88996f621edabc_screenshot.jpg'
        }
      })
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.onPressNext()
      }, 20000)
    }, 5000)
  }

  onPressMeet () {
    clearTimeout(this.timeout)
    this.setState({ isCalling: true })
  }

  onFinish () {
    this.onPressNext()
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

  render () {
    const { otherUser, isCalling } = this.state
    if (isCalling) {
      return (
        <CallingScreen
          localStreamURL={this.props.localStreamURL}
          onTimeout={() => this.onFinish()}
          onFinish={() => this.onFinish()}
        />
      )
    } else if (otherUser) {
      return (
        <MatchingScreen
          otherUser={otherUser}
          onPressNext={() => this.onPressNext()}
          onPressMeet={() => this.onPressMeet()}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HuntingScreen)
