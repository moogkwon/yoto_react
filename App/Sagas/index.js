import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { socialLogin, logout, updateProfile, uploadProfile } from './AuthSagas'
// import {
// login
// } from './AuthSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(AuthTypes.SOCIAL_LOGIN, socialLogin, api),
    takeLatest(AuthTypes.LOGOUT, logout, api),
    takeLatest(AuthTypes.UPDATE_PROFILE, updateProfile, api),
    takeLatest(AuthTypes.UPLOAD_PROFILE, uploadProfile, api)
    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
