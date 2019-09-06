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
  user: null,
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

const initialDeleteState = {
  list: [],
  deleteMode: false,
}

const deletionReducer = (state = initialDeleteState, { type, link }) => {
  console.log(state)
  switch (type) {

  case types.ADD_LINK_TO_DELETE:
    state.list.push(link)
    return { ...state }

  case types.REMOVE_LINK_TO_DELETE:
    state.list = state.list.filter(item => item != link)
    return { ...state }

  case types.TURN_ON_DELETE_MOD:
    return {...state, deleteMode: true}

  case types.TURN_OFF_DELETE_MOD:
    return {...state, deleteMode: false}

  case types.DELETE_LINKS:
    return {list: [], deleteMode: false}

  default:
    return state
  }
}


export default combineReducers({
  default: reducer,
  auth: authReducer,
  deletion: deletionReducer
})


