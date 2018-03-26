import React from 'react';
// import thunk from 'redux-thunk'
// import reducer from './src/reducers/index.js'
// import { Provider } from 'react-redux'
// import { reducer as formReducer } from 'redux-form'
import { StyleSheet, Text, View } from 'react-native'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
//
//
// const configureStoreDev = (reducer) => createStore(
//   combineReducers({
//     routing: routerReducer,
//     user: reducer.user,
//
//     form: formReducer,
//   }),
//   composeEnhancers(
//       thunk
//   ),
// )
//
// const socket = io(serverUrl)
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store =  configureStoreDev(reducer)
//


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text> TAMERE </Text>
  		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
