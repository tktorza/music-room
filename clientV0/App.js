import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './src/reducers'
import { reducer as formReducer } from 'redux-form'
import { Router, Scene } from 'react-native-router-flux'
import Login from './src/component/home'

const configureStore = (reducer) => createStore(
  combineReducers({
    user: reducer.user,
  }),
)

const store =  configureStore(reducer)



class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
    <Scene key="root">
      <Scene key="login"
        component={Login}
        title="Login"
        initial
      />
      </Scene>
  </Router>
  </Provider>
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
})

export default App
