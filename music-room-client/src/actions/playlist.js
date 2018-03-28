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
      console.log(e)
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
      console.log(e);
    })
  }
}
