import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import { Actions } from 'react-native-router-flux'
import styles from './Styles/MatchingScreenStyle'
import Flag from 'react-native-flags'
import Video from 'react-native-video'

class MatchingScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { otherUser } = this.props
    return (
      <View style={styles.container}>
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
            <TouchableOpacity style={styles.buttonNext} onPress={() => this.props.onPressNext()}>
              <Text style={styles.buttonText}>Next ✋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonMeet} onPress={() => this.props.onPressMeet()}>
              <Text style={styles.buttonText}>Meet 🤳</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonReport} onPress={() => this.props.onPressReport()}>
            <Text style={styles.buttonText}>...</Text>
          </TouchableOpacity>
        </View>
      </View>
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
