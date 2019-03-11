import { put, select, call } from 'redux-saga/effects'
// import { is } from 'ramda'
import { Actions, ActionConst } from 'react-native-router-flux'
// import { delay } from 'redux-saga'
import { getCurrentUser } from './AuthSagas'

// process STARTUP actions
export function * startup (api, action) {
  // yield delay(1000)
  const auth = yield select(state => state.auth)
  if (auth.token && auth.user) {
    api.setToken(auth.token)
    // call refresh token
    yield call(getCurrentUser, api)
  } else {
    yield call(Actions.login, { type: ActionConst.RESET })
  }
}
