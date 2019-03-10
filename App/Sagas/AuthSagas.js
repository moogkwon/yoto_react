/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { Actions } from 'react-native-router-flux'
// import { AuthSelectors } from '../Redux/AuthRedux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Alert } from 'react-native'

export function * facebookLogin (api, action) {
  try {
    yield LoginManager.logOut()
  } catch (error) { }
  try {
    const result = yield LoginManager.logInWithReadPermissions(['email', 'public_profile'])
    if (!result.isCancelled) {
      const result = yield AccessToken.getCurrentAccessToken()
      __DEV__ && console.log('result', result)
      return result.accessToken
    }
  } catch (error) {
    console.log('FB Login error: ', error)
  }
}

export function * googleLogin () {
  try {
    yield GoogleSignin.signOut()
  } catch (error) { }
  try {
    const hasPlayService = yield GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true, autoResolve: true })
    console.log('hasPlayService', hasPlayService)
    if (hasPlayService) {
      yield GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // only for iOS
        webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        accountName: '' // [Android] specifies an account name on the device that should be used
      })
      const result = yield GoogleSignin.signIn()
      __DEV__ && console.log('google', result)
      return result.accessToken
    } else {
      Alert.alert('Error', 'Login with google requires Google Play services installed on your device')
    }
  } catch (error) {
    console.log('Google Login error: ', error)
  }
}

export function * phoneLogin () {
  try {
    const result = yield RNAccountKit.loginWithPhone()
    if (!result) {
      console.log('Login cancelled')
    } else {
      console.log(`Logged with phone. Token: ${result.token}`)
      return result.token
    }
  } catch (error) {
    Alert.alert('Error', error.message)
  }
}

export function * socialLogin (api, action) {
  const { social } = action
  let token = ''
  if (social === 'facebook') {
    token = yield call(facebookLogin)
  }
  if (token) {
    // make the call to the api
    const response = yield call(api.socialLogin, social, { social_token: token })
    // success?
    if (response.ok && response.status < 300) {
      yield put(AuthActions.loginSuccess({ token: response.data.token, refresh_token: response.data.refreshToken, user: response.data.data }))
      Actions.root({ type: 'replace' })
    } else {
      Alert.alert('login error', response.problem)
      // yield put(AuthActions.loginFailure())
    }
  }
}
