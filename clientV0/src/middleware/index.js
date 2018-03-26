import { toJs } from 'immutable'
import CookieManager from 'react-native-cookies'
import { Actions } from 'react-native-router-flux'

function connection (data) {

  return {
    type: 'socket/connection',
    data,
  }
}

function forceLogOut () {
  return {
    type: 'client/logOut',
    data: {},
  }
}

const simpleMiddleWare = socket => ({ dispatch, getState }) => {

  return next => action => {

    CookieManager.getAll().then((res) => {
      if (res.tokenJWT) {
        Actions.home()
      } else if (Actions.currentScene === 'home') {
        Actions.login()
      }
      return next(action)

    })
  }

}

export default simpleMiddleWare
