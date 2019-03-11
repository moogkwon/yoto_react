import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import _ from 'lodash'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  socialLogin: ['social'],
  loginSuccess: ['data'],

  setUser: ['user'],

  logout: null,
  logoutSuccess: null,

  updateProfile: ['data'],
  updateProfileSuccess: ['user'],
  updateProfileFailure: null,

  uploadProfile: ['media_type', 'file'],
  uploadProfileSuccess: ['user'],
  uploadProfileFailure: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  token: null,
  refresh_token: null,
  type: null
})

/* ------------- Reducers ------------- */

export const socialLogin = (state) => state
export const loginSuccess = (state, { data }) => {
  return state.merge({ ...data })
}
export const setUser = (state, { user }) => state.merge({ user })
export const logout = (state) => state
export const logoutSuccess = (state) => INITIAL_STATE

export const updateProfile = (state) => state
export const updateProfileSuccess = (state, { user }) => state.merge({ user })
export const updateProfileFailure = (state, { error }) => state.merge({ error })

export const uploadProfile = (state) => state
export const uploadProfileSuccess = (state, { user }) => state.merge({ user })
export const uploadProfileFailure = (state, { error }) => state.merge({ error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SOCIAL_LOGIN]: socialLogin,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.SET_USER]: setUser,
  [Types.LOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,

  [Types.UPDATE_PROFILE]: updateProfile,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,

  [Types.UPLOAD_PROFILE]: uploadProfile,
  [Types.UPLOAD_PROFILE_SUCCESS]: uploadProfileSuccess,
  [Types.UPLOAD_PROFILE_FAILURE]: uploadProfileFailure
})
