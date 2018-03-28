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

export function addSongPlaylist(state, data) {
    const playlists = state.getIn(['playlists']).toJS()
    const index = playlists.findIndex(e => e._id === data.playlistId)
    console.log(index);
    if (index === -1) { return state }
    playlists[index] = data.body.playlist
    return state.setIn(['playlists'], fromJS(playlists))
    
}
