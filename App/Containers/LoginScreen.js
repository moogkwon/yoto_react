import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

// Styles
import styles from './Styles/LoginScreenStyle'
import { bindActionCreators, AuthActions } from '../Redux/Actions'

class LoginScreen extends Component {
  componentDidMount () {
    this.checkLogin()
  }

  async checkLogin () {
    const data = await AccessToken.getCurrentAccessToken()
    if (data.accessToken) {
      this.props.socialLogin({ token: data.accessToken.toString(), type: 'facebook' })
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>LoginScreen</Text>
          <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error)
                } else if (result.isCancelled) {
                  console.log('login is cancelled.')
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      this.props.socialLogin({ token: data.accessToken.toString(), type: 'facebook' })
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log('logout.')} />
        </KeyboardAvoidingView>
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
    ...bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
