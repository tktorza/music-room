import { fromJS } from 'immutable'
import jwtDecode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'


export function login (state, data) {

  const user = jwtDecode(data.token)
  Expo.SecureStore.setItemAsync('token',data.token, {})
  Actions.home()
  return state.setIn(['email'], fromJS(user.email))
    .setIn(['isAuthenticated'], fromJS(true))
    .setIn(['role'], fromJS(user.role))
    .setIn(['lastName'], fromJS(user.lastName))
    .setIn(['firstName'], fromJS(user.firstName))
    .setIn(['url'], fromJS(user.url))
    .setIn(['goal'], fromJS(user.goal))
    .setIn(['birthdate'], fromJS(user.birthdate))
    .setIn(['isArbitrage'], fromJS(user.isArbitrage))
    // .setIn(['isTokenKraken'], fromJS(user.isTokenKraken))
    .setIn(['isTokenBinace'], fromJS(user.isTokenBinace))
    .setIn(['isActive'], fromJS(user.isActive))
    .setIn(['id'], fromJS(user.id))

//    .setIn(['language'], fromJS(user.language))
}

export function verifeUser (state, token) {

  const user = jwtDecode(token)

  return state.setIn(['email'], fromJS(user.email))
    .setIn(['isAuthenticated'], fromJS(true))
    .setIn(['role'], fromJS(user.role))
    .setIn(['name'], fromJS(user.name))
    .setIn(['url'], fromJS(user.url))
    .setIn(['goal'], fromJS(user.goal))
    .setIn(['id'], fromJS(user.id))
    .setIn(['isArbitrage'], fromJS(user.isArbitrage))
    .setIn(['firstName'], fromJS(user.firstName))
    .setIn(['lastName'], fromJS(user.lastName))
    // .setIn(['isTokenKraken'], fromJS(user.isTokenKraken))
    .setIn(['isTokenBinace'], fromJS(user.isTokenBinace))
    .setIn(['birthdate'], fromJS(user.birthdate))
    .setIn(['language'], fromJS(user.language))
    .setIn(['isActive'], fromJS(user.isActive))

}

// export function updateU (state, data) {
//   const user = jwt.decode(data.token)
//
//   const cookies = new Cookies()
//   cookies.set('gooogleGWP', data.token, {
//     path: '/',
//     httpOnly: false, // the cookies is used as a storage mean and wont be send in the HTTP requests (as usual)
//     maxAge: 3600,
//   })
//   return state.setIn(['email'], fromJS(user.email))
//     .setIn(['role'], fromJS(user.role))
//     .setIn(['isAuthenticated'], fromJS(true))
//     .setIn(['lastName'], fromJS(user.lastName))
//     .setIn(['firstName'], fromJS(user.firstName))
//     .setIn(['url'], fromJS(user.url))
//     .setIn(['goal'], fromJS(user.goal))
//     .setIn(['_id'], fromJS(user._id))
//     .setIn(['birthdate'], fromJS(user.birthdate))
//     .setIn(['isArbitrage'], fromJS(user.isArbitrage))
//     // .setIn(['isTokenKraken'], fromJS(user.isTokenKraken))
//     .setIn(['isTokenBinace'], fromJS(user.isTokenBinace))
//     .setIn(['language'], fromJS(user.language || 'EN'))
//     .setIn(['isActive'], fromJS(user.isActive))
//
// }
