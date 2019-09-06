import types from './types'

const create_link =  () => ({ type: types.CREATE_LINK })
const link_created_successfully = () => ({type: types.LINK_CREATED_SUCCESSFULLY})

const sign_in = (user) => ({
  type: types.SIGN_IN,
  user
})
const sign_out = () => ({ type: types.SIGN_OUT })

const add_link = (link) => ({
  type: types.ADD_LINK_TO_DELETE,
  link
})
const remove_link = (link) => ({
  type: types.REMOVE_LINK_TO_DELETE,
  link
})
const turn_on_delete_mod = () => ({ type: types.TURN_ON_DELETE_MOD})
const turn_off_delete_mod = () => ({ type: types.TURN_OFF_DELETE_MOD})
const delete_links = () => ({type: types.DELETE_LINKS})






export default {
  create_link,
  link_created_successfully,
  sign_in,
  sign_out,
  add_link,
  remove_link,
  turn_on_delete_mod,
  turn_off_delete_mod,
  delete_links
}


