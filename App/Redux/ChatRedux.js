import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatRequest: ['data'],
  chatSuccess: ['payload'],
  chatFailure: null,
  setHunting: ['isHunting']
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  isHunting: false
})

/* ------------- Selectors ------------- */

export const ChatSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const setHunting = (state, { isHunting }) =>
  state.merge({ isHunting })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_HUNTING]: setHunting,
  [Types.CHAT_REQUEST]: request,
  [Types.CHAT_SUCCESS]: success,
  [Types.CHAT_FAILURE]: failure
})
