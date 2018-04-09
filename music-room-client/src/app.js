import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Scene, Stack } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Toast } from 'react-native-ui-lib'
import Home from './component/home/index'
import NewPlaylist from './component/home/newplaylist.js'
import Login from './component/login'
import Singup from './component/singup'
import Code from './component/singup/code'
import EditPlaylist from './component/home/editplaylist.js'
import ResetPass from './component/login/resetPass'
import ImportList from './component/home/importPlaylist.js'

class App extends Component {
  render () {
    return (
      <Router>
        <Stack
          hideNavBar
          key='root'>
          <Scene key='login'
            component={Login}
            title='Login'
            initial
          />
          <Scene key='singup'
            component={Singup}
            title='Singup'
          />
          <Scene key='code'
            component={Code}
            hideNavBar={false}
            title='Code'
          />
          <Scene key='home'
            component={Home}
            title='home'
          />
          <Scene
            key='newplaylist'
            component={NewPlaylist}
            hideNavBar={false}
            title='New Play-list'
          />
          <Scene key='editplaylist'
            component={EditPlaylist}
            hideNavBar={false}
            title='Play-list'
          />
          <Scene key='resetPass'
            component={ResetPass}
            hideNavBar={false}
            title='password reset'
          />
          <Scene key='importList'
            component={ImportList}
            hideNavBar={false}
            title='Import your play list'
          />
        </Stack>
      </Router>
    )
  }
}

export default App
