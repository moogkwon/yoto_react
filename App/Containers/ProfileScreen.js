import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import Video from 'react-native-video'
import { Images } from '../Themes'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
// import { VideoPlayer } from 'react-native-video-processing'
import { bindActionCreators } from 'redux'
import { AuthActions } from '../Redux/Actions'

class ProfileScreen extends Component {
  async _handlerActionSheetPhoto (index) {
    try {
      if (index === 0) {
        const result = await ImagePicker.openPicker({
          mediaType: 'video',
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(result)
        this.props.uploadProfile('video', result.path)
      }

      if (index === 1) {
        const result = await ImagePicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(result)
        this.props.uploadProfile('photo', result.path)
      }

      if (index === 2) {
        const result = await ImagePicker.openCamera({
          mediaType: 'photo',
          cropping: true,
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(result)
        this.props.uploadProfile('photo', result.path)
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount = () => {
    ImagePicker.clean()
  };

  onLogoutPress () {
    Alert.alert('Yoto', 'Do you want to logout?', [
      {
        text: 'Logout',
        onPress: () => this.props.logout()
      },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
    ])
  }

  render () {
    const user = this.props.user
    return !!user && (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.video} onPress={() => this.actionSheetUpload.show()}>
          {user.profile_video_url
            ? (
              <Video source={{ uri: user.profile_video_url }}
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
            : user.profile_photo_url
              ? <Image source={{ uri: user.profile_photo_url }} style={styles.backgroundVideo} resizeMode='cover' />
              : <Text style={styles.tapToChange}>Tap to change</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarView}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        </TouchableOpacity>

        <Text style={styles.title}>Community</Text>
        <TouchableOpacity style={styles.buttonRow}>
          <Text style={styles.rowLabel}>What's Yoto?</Text>
          <Image source={Images.icChevron} style={styles.iconArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow}>
          <Text style={styles.rowLabel}>Community Guidelines</Text>
          <Image source={Images.icChevron} style={styles.iconArrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Legal note</Text>
        <TouchableOpacity style={styles.buttonRow}>
          <Text style={styles.rowLabel}>Privacy Policy</Text>
          <Image source={Images.icChevron} style={styles.iconArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow}>
          <Text style={styles.rowLabel}>Terms of Service</Text>
          <Image source={Images.icChevron} style={styles.iconArrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogout} onPress={() => this.onLogoutPress()}>
          <Text style={styles.rowLabel}>Logout</Text>
        </TouchableOpacity>

        <ActionSheet
          ref={o => { this.actionSheetUpload = o }}
          options={[
            'Choose video 🎬',
            // 'Record video 📹',
            'Choose photo 📸',
            'Take photo 🤳',
            'Cancel'
          ]}
          cancelButtonIndex={3}
          onPress={(index) => this._handlerActionSheetPhoto(index)}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
