import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { bindActionCreators, AuthActions } from '../Redux/Actions'
import { Images } from '../Themes'
import LottieView from 'lottie-react-native'

class LoginScreen extends Component {
  componentDidMount () {
    // RNAccountKit.configure({
    //   responseType: 'token', // 'token' by default,
    //   titleType: 'app_name',
    //   initialAuthState: '',
    //   initialEmail: 'some.initial@email.com',
    //   initialPhoneCountryPrefix: '+84', // autodetected if none is provided
    //   initialPhoneNumber: '',
    //   facebookNotificationsEnabled: true, // true by default
    //   readPhoneStateEnabled: true, // true by default,
    //   receiveSMS: true, // true by default,
    //   countryWhitelist: ['VN'], // [] by default
    //   countryBlacklist: ['US'], // [] by default
    //   defaultCountry: 'VN',
    //   theme: {
    //     buttonBackgroundColor: Color.hex(Colors.primary),
    //     buttonDisabledBackgroundColor: Color.hex(Colors.disabled),
    //     buttonTextColor: Color.hex(Colors.snow),
    //     buttonDisabledTextColor: Color.hex(Colors.snow),
    //     headerBackgroundColor: Color.hex(Colors.primary),
    //     inputBackgroundColor: Color.hex(Colors.input)
    //   } // for iOS only, see the Theme section
    // })
  }

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

        <TouchableOpacity style={styles.phoneLoginButton} onPress={() => this.props.socialLogin('phone')}>
          <Text style={styles.phoneLoginText}>Sign Up with Phone <Text style={styles.emoji}>📱</Text></Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.roundButton} onPress={() => this.props.socialLogin('facebook')}>
            <Image source={Images.facebook} style={styles.roundImage} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.roundButton} onPress={Actions.register}>
            <Image source={Images.instagram} style={styles.roundImage} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.roundButton} onPress={() => this.props.socialLogin('google')}>
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
