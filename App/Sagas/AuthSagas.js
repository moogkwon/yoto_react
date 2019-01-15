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

export function * socialLogin (api, action) {
  const { data } = action
  const form = new FormData()

  form.append('token', data['token'])
  form.append('type', data['type'])

  // make the call to the api
  const response = yield call(api.socialLogin, form)
  __DEV__ && console.log('social login response', response)
  // success?
  if (response.ok && response.data.code < 300) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AuthActions.loginSuccess(response.data))
    Actions.root({ type: 'replace' })
  } else {
    alert('login error')
    // yield put(AuthActions.loginFailure())
  }
}
