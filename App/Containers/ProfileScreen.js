import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import Video from 'react-native-video'
import { Images } from '../Themes'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
import { VideoPlayer } from 'react-native-video-processing'

class ProfileScreen extends Component {
  _handlerActionSheetPhoto (index) {
    if (index === 0) {
      ImagePicker.openPicker({
        mediaType: 'video',
        width: 720,
        height: 1280
      }).then(image => {
        __DEV__ && console.log(image)
        this.setState({ media: image })
        // this.props.uploadAvatar(image.path)
      })
    }

    if (index === 1) {
      ImagePicker.openCamera({
        mediaType: 'video',
        width: 720,
        height: 1280
      }).then(image => {
        __DEV__ && console.log(image)
        this.setState({ media: image })
        // this.props.uploadAvatar(image.path)
      })
    }
    if (index === 2) {
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        width: 720,
        height: 1280
      }).then(image => {
        __DEV__ && console.log(image)
        this.setState({ media: image })
        // this.props.uploadAvatar(image.path)
      })
    }

    if (index === 3) {
      ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        width: 720,
        height: 1280
      }).then(image => {
        __DEV__ && console.log(image)
        this.setState({ media: image })
        // this.props.uploadAvatar(image.path)
      })
    }
  }

  componentWillUnmount = () => {
    ImagePicker.clean()
  };

  render () {
    const user = {

    }
    return (
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

        <TouchableOpacity style={styles.buttonLogout}>
          <Text style={styles.rowLabel}>Logout</Text>
        </TouchableOpacity>

        <ActionSheet
          ref={o => { this.actionSheetUpload = o }}
          options={[
            'Choose video 🎬',
            'Record video 📹',
            'Choose photo 📸',
            'Take photo 🤳',
            'Cancel'
          ]}
          cancelButtonIndex={4}
          onPress={(index) => this._handlerActionSheetPhoto(index)}
        />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
