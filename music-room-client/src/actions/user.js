import { callApi } from '../utils/callApi.js'
import { Actions } from 'react-native-router-flux'

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
    callApi('user/create', 'post', event).then(() => {
      Actions.code({email: event.email})
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

export function updateUser(event, userId) {
  return dispatch => {
    callApi(`user/update/${userId}`, 'post',event).then(body => {
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

export function updateUserPrivate(event, userId) {
  return dispatch => {
    callApi(`user/update/private/${userId}`, 'post',event).then(body => {
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

export function verifeUser(code, email) {
  return dispatch => {
    callApi(`user/verifyEmail/${email}/${code}`, 'put').then(body => {
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
