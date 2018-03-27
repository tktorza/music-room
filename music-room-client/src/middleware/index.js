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

const simpleMiddleWare = socket => ({ dispatch, getState }) => {

  return next => action => {

    Expo.SecureStore.getItemAsync('token', {}).then(res => {
      console.log(res);
      if (res) {
        console.log('ici');
        Actions.home()
      } else if (Actions.currentScene === 'home') {
        Actions.login()
      }
      return next(action)
    })

  }

}

export default simpleMiddleWare
