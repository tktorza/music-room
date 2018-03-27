import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import simpleMiddleWare from './src/middleware/index.js'
import thunk from 'redux-thunk'
import reducer from './src/reducers'
import { reducer as formReducer } from 'redux-form'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Home from './src/component/home/index'
import Login from './src/component/login'
import Singup from './src/component/singup'


const configureStore = (reducer) => createStore(
  combineReducers({
    user: reducer.user,
    form: formReducer,
  }),
  applyMiddleware(
   simpleMiddleWare(),
   thunk
 ),

)

const store =  configureStore(reducer)

Expo.SecureStore.deleteItemAsync('token', {}).then(() => {
  console.log('del token');
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <Stack
       hideNavBar
       key="root">
            <Scene key="login"
            component={Login}
            title="Login"
            initial
            />
            <Scene key="singup"
            component={Singup}
            title="Singup"
            />
            <Scene key="home"
            component={Home}
            title="home"
            />
          </Stack>
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
