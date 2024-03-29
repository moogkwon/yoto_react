import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/UploadProfileScreenStyle'
import { bindActionCreators, AuthActions } from '../Redux/Actions'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
import { VideoPlayer } from 'react-native-video-processing'

class UploadProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      media: null
    }
  }

  async _handlerActionSheetPhoto (index) {
    ImagePicker.clean()
    try {
      if (index === 0) {
        const image = await ImagePicker.openPicker({
          mediaType: 'video',
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(image)
        this.setState({ media: image, type: 'video' })
      }

      if (index === 1) {
        const image = await ImagePicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(image)
        this.setState({ media: image, type: 'photo' })
      }

      if (index === 2) {
        const image = await ImagePicker.openCamera({
          mediaType: 'photo',
          cropping: true,
          width: 720,
          height: 1280
        })
        __DEV__ && console.log(image)
        this.setState({ media: image, type: 'photo' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount = () => {
    ImagePicker.clean()
  };

  renderVideo () {
    const media = this.state.media
    return (
      <VideoPlayer
        ref={ref => (this.videoPlayerRef = ref)}
        // startTime={0}  // seconds
        // endTime={5}   // seconds
        play     // default false
        replay   // should player play video again if it's ended
        rotate   // use this prop to rotate video if it captured in landscape mode iOS only
        source={media.path}
        playerWidth={300} // iOS only
        playerHeight={500} // iOS only
        // style={{ backgroundColor: 'black' }}
        resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
        onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profileContainner}>
            {this.state.media
              ? this.state.media.mime.startsWith('image')
                ? <Image style={styles.profilePhoto} source={{ uri: this.state.media.path }} />
                : this.renderVideo()
              : <Image style={styles.profilePhoto} source={Images.hilarious} />
            }
          </View>
          <TouchableOpacity style={styles.chooseButton} onPress={() => this.actionSheetUpload.show()}>
            <Text style={styles.chooseText}>Upload selfie <Text style={styles.emoji}>🤳</Text></Text>
          </TouchableOpacity>
          {this.state.media && (
            <TouchableOpacity style={styles.continueButton} onPress={() => this.props.uploadProfile(this.state.type, this.state.media.path)}>
              <Text style={styles.continueText}>Continue <Text style={styles.emoji}>➡️</Text></Text>
            </TouchableOpacity>
          )}
        </View>

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
    ...bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileScreen)
