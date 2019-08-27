import types from './types'

const create_link =  () => ({ type: types.CREATE_LINK })
const link_created_successfully = () => ({type: types.LINK_CREATED_SUCCESSFULLY})

export default {
  create_link,
  link_created_successfully
}


