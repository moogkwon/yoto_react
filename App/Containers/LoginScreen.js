import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

// Styles
import styles from './Styles/LoginScreenStyle'
import { bindActionCreators, AuthActions } from '../Redux/Actions'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'
import LottieView from 'lottie-react-native'

class LoginScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        {/* <Image source={Images.logo} style={styles.logo} resizeMode='contain' /> */}

        <LottieView
          source={require('../Fixtures/lotties/login_page.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

        <TouchableOpacity style={styles.phoneLoginButton} onPress={Actions.register}>
          <Text style={styles.phoneLoginText}>Sign Up with Phone <Text style={styles.emoji}>📱</Text></Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.roundButton} onPress={Actions.register}>
            <Image source={Images.facebook} style={styles.roundImage} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.roundButton} onPress={Actions.register}>
            <Image source={Images.instagram} style={styles.roundImage} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.roundButton} onPress={Actions.register}>
            <Image source={Images.google} style={styles.roundImage} />
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
    ...bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
