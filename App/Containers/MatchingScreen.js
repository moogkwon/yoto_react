import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import WebRTCLib from 'react-native-webrtc'
// import { Actions } from 'react-native-router-flux'
import styles from './Styles/MatchingScreenStyle'
import LottieView from 'lottie-react-native'
import Flag from 'react-native-flags'
import Video from 'react-native-video'

const {
  RTCView
} = WebRTCLib

class MatchingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      otherUser: {
        first_name: 'Anna',
        birth_year: 2000,
        location_country: 'United States',
        location_country_code: 'US',
        profile_video_url: 'https://coolfriend.s3.amazonaws.com/uploads/videos/13738f203fbd11e99b2f01c9f830af1f_video.mov',
        profile_photo_url: 'https://coolfriend.s3.amazonaws.com/uploads/photos/c47f67c03f2311e999dffd82ceb9fd92_pic.jpg'
      }
    }
  }

  render () {
    const { otherUser } = this.state
    return otherUser
      ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.video}>
            {otherUser.profile_video_url
              ? (
                <Video source={{ uri: otherUser.profile_video_url }}
                  autoPlay
                  repeat
                  resizeMode='cover'
                  ref={(ref) => {
                    this.player = ref
                  }}                                      // Store reference
                  // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                  // onError={this.videoError}               // Callback when video cannot be loaded
                  onLoadStart={() => this.setState({ isVideoLoading: true })}
                  onVideoLoad={() => this.setState({ isVideoLoading: false })}
                  style={styles.backgroundVideo}
                />
              )
              : otherUser.profile_photo_url
                ? <Image source={{ uri: otherUser.profile_photo_url }} style={styles.backgroundVideo} resizeMode='cover' />
                : <Text>No profile available</Text>
            }
          </View>
          <View style={styles.blurCover}>
            <Text style={styles.incommingCall}>The person wants to meet u!</Text>
            <Text style={styles.textName}>{otherUser.first_name}</Text>
            <Text style={styles.textDescription}>{otherUser.first_name} was made in <Text style={{ textDecorationLine: 'underline' }}>{otherUser.birth_year}</Text></Text>
            <Text style={styles.textDescription}>designed in {otherUser.location_country} <Flag code={otherUser.location_country_code} size={24} /></Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.buttonNext}>
                <Text style={styles.buttonText}>Next ✋</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMeet}>
                <Text style={styles.buttonText}>Meet 🤳</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchingScreen)
