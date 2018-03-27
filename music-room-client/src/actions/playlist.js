import { callApi } from '../utils/callApi.js'
// import jwt from 'jsonwebtoken'

export function getPlayList (userId) {
  return dispatch => {
    callApi(`playlist/all/${userId}/`, 'get', {}).then(body => {
      console.log('Body =>', body)
      //
      //
      // dispatch({
      //   type: 'http/login',
      //   data: body,
      // })
    }).catch(e => {
      console.log(e)
      return e
    })
  }
}
