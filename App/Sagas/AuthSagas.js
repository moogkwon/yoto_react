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

import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { Actions, ActionConst } from 'react-native-router-flux'
// import { AuthSelectors } from '../Redux/AuthRedux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Alert } from 'react-native'
import RNAccountKit, { Color } from 'react-native-facebook-account-kit'
// import { Colors } from '../Themes'
import { GoogleSignin } from 'react-native-google-signin'
import Config from '../Config/AppConfig'
import RNFetchBlob from 'rn-fetch-blob'

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
        // iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // only for iOS
        webClientId: '883615025605-rjac8vn56h0fl1275fbthng64r4he6pp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
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
    Alert.alert('Error', error.message)
    console.log('Google Login error: ', error)
  }
}

export function * phoneLogin () {
  RNAccountKit.configure({
    responseType: 'token', // 'token' by default,
    titleType: 'app_name',
    initialAuthState: '',
    initialEmail: 'some.initial@email.com',
    initialPhoneCountryPrefix: '+1', // autodetected if none is provided
    initialPhoneNumber: '',
    facebookNotificationsEnabled: true, // true by default
    readPhoneStateEnabled: true, // true by default,
    receiveSMS: true, // true by default,
    // countryWhitelist: ['VN'], // [] by default
    // countryBlacklist: ['US'], // [] by default
    defaultCountry: 'US'
    // theme: {
    //   buttonBackgroundColor: Color.hex(Colors.primary),
    //   buttonDisabledBackgroundColor: Color.hex(Colors.disabled),
    //   buttonTextColor: Color.hex(Colors.snow),
    //   buttonDisabledTextColor: Color.hex(Colors.snow),
    //   headerBackgroundColor: Color.hex(Colors.primary),
    //   inputBackgroundColor: Color.hex(Colors.input)
    // } // for iOS only, see the Theme section
  })
  try {
    const result = yield RNAccountKit.loginWithPhone()
    if (!result) {
      console.log('Login cancelled')
    } else {
      console.log(`Logged with phone. Token: ${result.token}`)
      return result.token
    }
  } catch (error) {
    console.log(error)
    error.message !== 'Login cancelled' && Alert.alert('Error', error.message)
  }
}

export function * socialLogin (api, action) {
  const { social } = action
  let token = ''
  if (social === 'facebook') {
    token = yield call(facebookLogin)
  } else if (social === 'google') {
    token = yield call(googleLogin)
  } else if (social === 'phone') {
    token = yield call(phoneLogin)
  }
  if (token) {
    // make the call to the api
    const response = yield call(api.socialLogin, social, { social_token: token })
    // success?
    if (response.ok && response.status < 300) {
      const user = response.data.data
      if (user.is_blocked) {
        yield call(Actions.login, { type: ActionConst.RESET })
        Alert.alert('Yoto', 'You are blocked')
      } else if (!user.instagram) {
        api.setToken(response.data.token)
        yield put(AuthActions.loginSuccess({ token: response.data.token, refresh_token: response.data.refreshToken, user: response.data.data }))
        yield call(Actions.register, { type: ActionConst.RESET })
      } else if (!user.profile_video_url && user.profile_photo_url) {
        api.setToken(response.data.token)
        yield put(AuthActions.loginSuccess({ token: response.data.token, refresh_token: response.data.refreshToken, user: response.data.data }))
        yield call(Actions.upload, { type: ActionConst.RESET })
      } else {
        api.setToken(response.data.token)
        yield put(AuthActions.loginSuccess({ token: response.data.token, refresh_token: response.data.refreshToken, user: response.data.data }))
        yield call(Actions.root, { type: ActionConst.RESET })
      }
    } else {
      Alert.alert('login error', response.problem)
      // yield put(AuthActions.loginFailure())
    }
  }
}

export function * updateProfile (api, action) {
  const { data } = action
  const { user } = yield select(state => state.auth)
  // make the call to the api
  const response = yield call(api.updateProfile, user._id, data)
  // success?
  if (response.ok && response.status < 300) {
    yield put(AuthActions.setUser(response.data.data))
    yield call(Actions.upload, { type: ActionConst.RESET })
  } else {
    Alert.alert('login error', response.problem)
    // yield put(AuthActions.loginFailure())
  }
}

export function * getCurrentUser (api) {
  const response = yield call(api.getCurrentUser)
  __DEV__ && console.log('response', response)
  if (response.ok) {
    const user = response.data.data
    if (user.is_blocked) {
      yield call(Actions.login, { type: ActionConst.RESET })
      Alert.alert('Yoto', 'You are blocked')
    } else if (!user.instagram) {
      yield call(Actions.register, { type: ActionConst.RESET })
    } else if (!user.profile_video_url && !user.profile_photo_url) {
      yield call(Actions.upload, { type: ActionConst.RESET })
    } else {
      yield call(Actions.root, { type: ActionConst.RESET })
    }
    // yield put(AuthActions.getCurrentUserSuccess(response.data.data))
  } else {
    yield call(Actions.login, { type: ActionConst.RESET })
  }
}

export function * uploadProfile (api, action) {
  const { token } = yield select(state => state.auth)
  if (action.media_type === 'photo') {
    const url = `${Config.apiURL}/users/upload-profile-photo`
    const upload = yield RNFetchBlob.fetch('POST', url, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }, [{ name: 'file', filename: 'profile.jpg', mime: 'image/jpg', data: RNFetchBlob.wrap(action.file) }])
    __DEV__ && console.log('upload', upload)
    yield call(Actions.root)
  } else if (action.media_type === 'video') {
    const url = `${Config.apiURL}/users/upload-profile-video`
    const upload = yield RNFetchBlob.fetch('POST', url, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }, [{ name: 'file', filename: 'profile.mp4', mime: 'video/mp4', data: RNFetchBlob.wrap(action.file) }])
    __DEV__ && console.log('upload', upload)
    yield call(Actions.root)
  }
}

export function * logout (api, action) {
  yield call(Actions.login)
  yield put(AuthActions.logoutSuccess())
}
