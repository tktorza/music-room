import { callApi } from '../utils/callApi.js'
// import jwt from 'jsonwebtoken'

export function getPlayList (userId) {
  return dispatch => {
    callApi(`playlist/all/${userId}/`, 'get').then(body => {
      dispatch({
        type: 'http/getAllplayList',
        data: body,
      })
    }).catch(e => {
      console.log('err get play list =>',e)
    })
  }
}
export function createPlayList (data) {

  return dispatch => {
    callApi('playlist/create', 'post', data).then(body => {
      dispatch({
        type: 'http/newPlayList',
        data: body,
      })
    }).catch(e => {
      console.log('err creact play list => ',e);
    })
  }
}

export function addSongPlaylist(id, playlistId, userId, songName) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}/${id}/${songName}`, 'put').then(body => {
      dispatch({
        type: 'http/addSongPlayList',
        data: {body, playlistId},
      })
    }).catch(e => {
      console.log('er sur addsong =>',e);
    })
  }
}

export function updatePlaylist(data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}`, 'post', data).then(body => {
      dispatch({
        type: 'http/updatePlaylist',
        data: {body, playlistId},
      })
    }).catch(e => {
      console.log('er sur updatePlaylist =>',e);
    })
  }
}

export function updatePlaylistPrivate(data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/updatePrivate/${playlistId}/${userId}`, 'post', data).then(body => {
      console.log(body);
      dispatch({
        type: 'http/updatePlaylist',
        data: {body, playlistId},
      })
    }).catch(e => {
      console.log('er sur updatePlaylist =>',e);
    })
  }
}

export function deleteAUser(playlistId, userId, userIdToDelete) {
  console.log('helelelel');
  return dispatch => {
    callApi(`playlist/delete/user/${playlistId}/${userId}/${userIdToDelete}`,'put').then(body => {
      console.log(body);
      dispatch({
        type: 'http/updatePlaylist',
        data: {body, playlistId},
      })
    }).catch(e => {
      console.log('er sur updatePlaylist =>',e);
    })
  }
}
