import { put, select } from 'redux-saga/effects'
import { is, call } from 'ramda'
import { Actions, ActionConst } from 'react-native-router-flux'
import { delay } from 'redux-saga'

// process STARTUP actions
export function * startup (action) {
  // yield delay(1000)
  const auth = yield select(state => state.auth)
  if (auth.refresh_token) {
    // call refresh token
    yield call(Actions.root, { type: ActionConst.RESET })
  } else {
    yield call(Actions.login, { type: ActionConst.RESET })
  }
}
