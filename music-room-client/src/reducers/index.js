import { fromJS } from 'immutable'

import { login, verifeUser } from './user/index.js'
import { updateListOfplayList, setListOfPlaylist } from './playlist/index.js'
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
  id: '',
}

const intialStatePlaylist = {
  playlists: [],
  nbr: 0,
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
    default:
      return state
    }
  }

  static playlist (state = fromJS(intialStatePlaylist), action) {
    switch (action.type) {
    case 'http/getAllplayList':
      return setListOfPlaylist(state, action.data)
    case 'http/newPlayList':
      return updateListOfplayList(state, action.data)
    case 'http/addSongPlayList':
      return addSongPlaylist(state, action.data)
    default:
      return state
    }
  }

}