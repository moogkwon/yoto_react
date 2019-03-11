import { put, select } from 'redux-saga/effects'
import { is, call } from 'ramda'
import { Actions, ActionConst } from 'react-native-router-flux'
import { delay } from 'redux-saga'
import { Alert } from 'react-native'

// process STARTUP actions
export function * startup (api, action) {
  // yield delay(1000)
  const auth = yield select(state => state.auth)
  if (auth.refresh_token && auth.user) {
    // call refresh token
    if (auth.user.is_blocked) {
      yield call(Actions.login, { type: ActionConst.RESET })
      Alert.alert('Yoto', 'You are blocked')
    } else if (!auth.user.instagram) {
      api.setToken(auth.token)
      yield call(Actions.register, { type: ActionConst.RESET })
    } else if (!auth.user.profile_video_url && auth.user.profile_photo_url) {
      api.setToken(auth.token)
      yield call(Actions.upload, { type: ActionConst.RESET })
    } else {
      api.setToken(auth.token)
      yield call(Actions.root, { type: ActionConst.RESET })
    }
  } else {
    yield call(Actions.login, { type: ActionConst.RESET })
  }
}
