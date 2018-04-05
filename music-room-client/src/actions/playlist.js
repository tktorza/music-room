import { callApi } from '../utils/callApi.js'
import { Actions } from 'react-native-router-flux'
import { getPlaylistTracks } from '../utils/deezerService.js'

// import jwt from 'jsonwebtoken'

export function getPlayList (userId) {
  return dispatch => {
    callApi(`playlist/all/${userId}/`, 'get').then(body => {
      dispatch({
        type: 'http/getAllplayList',
        data: body,
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
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
      Actions.home()
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function addSongPlaylist (id, playlistId, userId, songName) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}/${id}/${songName}`, 'put').then(body => {
      dispatch({
        type: 'http/addSongPlayList',
        data: { body, playlistId },
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updatePlaylist (data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}`, 'post', data).then(body => {
      dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updatePlaylistPrivate (data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/updatePrivate/${playlistId}/${userId}`, 'post', data).then(body => {
      dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function deleteAUser (playlistId, userId, userIdToDelete) {
  return dispatch => {
    callApi(`playlist/delete/user/${playlistId}/${userId}/${userIdToDelete}`, 'put').then(body => {
      dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}
//TODO mettre l'array de promise dans le bac
export function importDeezerList(userId, data) {
  return dispatch => {
  let pro = []
  const ok = (e) => (
    new Promise((resolve, reject) => {
      getPlaylistTracks(e.id).then(toto => {

         console.log('toot',toto);
      //   const tmp = []
      //   toto.forEach((obj, key) =>{
      //     tmp.push({name: obj.title, id: obj.id, grade: key})
      //   })
      //   e.songs = tmp
        resolve(e);
      })
    })
  )
  data.forEach(e => {
    e.name = e.title
    e.type = 'private'
    pro.push(ok(e))
  })
//
// Promise.all(pro).then(etc => {
//   console.log(etc)
// })
//     callApi(`playlist/import/list/${userId}`,'post', data).then(body => {
//       dispatch({
//         type: 'http/updatePlaylist',
//         data: { body, playlistId },
//       })
//     }).catch(e => {
//       dispatch({
//         type: 'client/addNotife',
//         data: e,
//       })
//     })
   }
}
