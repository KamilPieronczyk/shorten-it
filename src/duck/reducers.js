import {combineReducers} from 'redux'
import types from './types'

const initialState = {
  header: 'Shorten it',
  button: 'do it',
  loading: false
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_LINK:
      return { ...state, loading: true }
    case types.LINK_CREATED_SUCCESSFULLY:
      return { header: 'Here you are!', button: 'copy', loading: false }
    default:
      return state
  }
}

const initialAuthState = {
  user: 'test',
}

const authReducer = (state = initialAuthState, {type, user}) => {
  switch (type) {
    case types.SIGN_IN:
      return { user }
    case types.SIGN_OUT:
      return { user: null }
    default:
      return state
  }
}

export default combineReducers({
  default: reducer,
  auth: authReducer
})


