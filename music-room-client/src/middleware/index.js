import { toJs } from 'immutable'
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
function verifeUser(token) {
  return {
    type: 'client/verifeUser',
    data: token,
  }
}

const simpleMiddleWare = socket => ({ dispatch, getState }) => {

  return next => action => {

    Expo.SecureStore.getItemAsync('token', {}).then(token => {
      if (token && (Actions.currentScene === 'login' || Actions.currentScene === 'singup')) {
        const userState = getState().user.toJS()

        if (userState.id === '') { dispatch(verifeUser(token)) }
          Actions.home()
        }
      if (Actions.currentScene === 'home' && !token) {
        Actions.login()
      }
      return next(action)
    })

  }

}

export default simpleMiddleWare
