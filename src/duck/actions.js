import types from './types'

const create_link =  () => ({ type: types.CREATE_LINK })
const link_created_successfully = () => ({type: types.LINK_CREATED_SUCCESSFULLY})

const sign_in = (user) => ({
  type: types.SIGN_IN,
  user
})
const sign_out = () => ({ type: types.SIGN_OUT })



export default {
  create_link,
  link_created_successfully,
  sign_in,
  sign_out
}


