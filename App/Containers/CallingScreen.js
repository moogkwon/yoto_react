import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/CallingScreenStyle'
import WebRTCLib from 'react-native-webrtc'
import LottieView from 'lottie-react-native'
import { Images } from '../Themes'

const {
  RTCView
} = WebRTCLib

class CallingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isUnlocked: false,
      isFriend: false,
      isRequested: false
    }
  }

  componentDidMount () {
    this.clock.play()
  }

  onUnlock () {
    this.props.onRequestUnlock()
  }

  unlock () {
    this.setState({ isUnlocked: true }, () => this.unlock.play())
  }

  onPressFinish () {
    this.props.onFinish()
  }

  onPressFollow () {
    this.setState({ isRequested: true }, () => {
      if (Math.random() > 0.5) {
        this.becomeFriend.play()
      } else {
        this.becomeFriendLgbtq.play()
      }
      this.setState({ isUnlocked: true })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.video}>
          <View style={styles.videoWidget}>
            {this.props.remoteStreamURL
              ? <RTCView streamURL={this.props.remoteStreamURL} style={styles.rtcView} objectFit='cover' />
              : <LottieView
                source={require('../Fixtures/lotties/penguin_loading.json')}
                autoPlay
                loop
                style={styles.lottie}
                resizeMode='cover'
              />
            }
          </View>
          <View style={styles.videoWidget}>
            {this.props.localStreamURL &&
              <RTCView streamURL={this.props.localStreamURL} style={styles.rtcView} objectFit='cover' />
            }
          </View>
        </View>

        {this.state.isRequested && !this.state.isFriend && (
          <LottieView
            imageAssetsFolder={'lottie'}
            source={require('../Fixtures/lotties/add_friend.json')}
            ref={becomeFriend => (this.becomeFriend = becomeFriend)}
            style={styles.becomeFriend}
            loop={false}
            onAnimationFinish={() => this.setState({ isFriend: true })}
          />
        )}
        {this.state.isRequested && !this.state.isFriend && (
          <LottieView
            imageAssetsFolder={'lottie'}
            source={require('../Fixtures/lotties/add_friend_LGBTQ.json')}
            ref={becomeFriendLgbtq => (this.becomeFriendLgbtq = becomeFriendLgbtq)}
            style={styles.becomeFriend}
            loop={false}
            onAnimationFinish={() => this.setState({ isFriend: true })}
          />
        )}

        {this.state.isFriend && (
          <TouchableOpacity style={styles.instagramButton}>
            <ImageBackground style={styles.instagramBackground} source={Images.instagramButton}>
              <Text style={styles.instagramText}>{'123456789012345678901234567890'}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.reportButton} onPress={() => this.props.onReport()}>
            <Image source={Images.icReport} style={styles.reportIcon} resizeMode='contain' />
          </TouchableOpacity>
          {this.state.isRequested
            ? <View style={{ width: 150 }} />
            : <TouchableOpacity style={styles.followButton} onPress={() => this.onPressFollow()}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={styles.peaceOutButton} onPress={() => this.onPressFinish()}>
            <Image source={Images.icPeaceOut} style={styles.peaceOutIcon} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        {!this.state.isUnlocked
          ? <TouchableOpacity style={styles.clockButton} onPress={() => this.onUnlock()}>
            <LottieView
              imageAssetsFolder={'lottie'}
              source={require('../Fixtures/lotties/clock.json')}
              ref={clock => (this.clock = clock)}
              style={styles.clock}
              loop={false}
              onAnimationFinish={() => this.props.onTimeout()}
            />
          </TouchableOpacity>
          : <LottieView
            imageAssetsFolder={'lottie'}
            source={require('../Fixtures/lotties/unlock.json')}
            ref={unlock => (this.unlock = unlock)}
            style={styles.unlock}
            loop={false}
          />
        }
      </View>
    )
  }
}

export default CallingScreen
