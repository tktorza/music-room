import { fromJS } from 'immutable'

import { login } from './user/index.js'
const intialStateUser = {
  firstName: '',
  lastName: '',
  email: '',
  role: -1,
  isAuthenticated: false,
  url: '',
  isArbitrage: false,
  birthdate: null,
  goal: 0,
  language: '',
  funds: [],
}

export default class reducer {

  static user (state = fromJS(intialStateUser), action) {
    switch (action.type) {
    case 'http/login':
      return login(state, action.data)
    case 'client/verifeUser':
      return verifeUser(state, action.data)
    case 'client/logOut':
      return state = fromJS(intialStateUser)
    case 'http/userUpdate':
      return updateU(state, action.data)
    case 'socket/userUpdate':
      return updateU(state, action.data)
    case 'http/getFound':
      return addFundUser(state, action.data)
    default:
      return state
    }
  }

}
