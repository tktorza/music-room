import { fromJS } from 'immutable'
import { Actions } from 'react-native-router-flux'


export function updateListOfplayList (state, data) {
  const playlists = state.getIn(['playlists']).toJS()
  playlists.push(data.playlist)
  return state.setIn(['playlists'], fromJS(playlists))
}

export function setListOfPlaylist(state, data) {
  return state.setIn(['playlists'], fromJS(data.playLists))

}
