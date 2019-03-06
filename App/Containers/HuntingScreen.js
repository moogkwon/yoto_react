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

const {
  RTCView
} = WebRTCLib

class HuntingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otherUser: null,
      isCalling: false
    }
  }

  componentDidMount () {
    this.onPressNext()
  }

  onPressNext () {
    this.setState({ otherUser: null })
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
      setTimeout(() => {
        this.onPressNext()
      }, 20000)
    }, 5000)
  }

  onPressMeet () {
    this.setState({ isCalling: true })
  }

  render () {
    const { otherUser, isCalling } = this.state
    return isCalling
      ? <CallingScreen
        localStreamURL={this.props.localStreamURL}
      />
      : otherUser
        ? <MatchingScreen
          otherUser={otherUser}
          onPressNext={() => this.onPressNext()}
          onPressMeet={() => this.onPressMeet()}
        />
        : (
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
                {/* {'some text to show'} */}
              </Text>
            </View>
          </View >
        )
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
