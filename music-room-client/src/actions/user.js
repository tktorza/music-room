import { callApi } from '../utils/callApi.js'

export function loginUser (event) {
  return dispatch => {
    callApi(`user/${event.email}/`, 'get', {}, event.password).then(body => {

      dispatch({
        type: 'http/login',
        data: body,
      })
    }).catch(e => {
      console.log(e)
      return e
    })
  }
}

export function singupUser (event) {
  return dispatch => {
    callApi('user/create', 'post', event).then(body => {
      dispatch({
        type: 'http/login',
        data: body,
      })
    //  Actions.home()
    }).catch(e => {
      console.log(e)
      return e
    })
  }
}


export function facebookLoginAction (event) {
  return dispatch => {
    callApi(`user/create/facebook`, 'post',event.params).then(body => {

      dispatch({
        type: 'http/login',
        data: body,
      })
    }).catch(e => {
      console.log(e)
      return e
    })
  }
}
