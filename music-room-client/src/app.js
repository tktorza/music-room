import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Scene, Stack } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Home from './component/home/index'
import NewPlaylist from './component/home/newplaylist.js'
import Login from './component/login'
import Singup from './component/singup'
import Code from './component/singup/code'
import EditPlaylist from './component/home/editplaylist.js'


class App extends Component {
  render() {
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
            title='New track'
            />
            <Scene key='editplaylist'
            component={EditPlaylist}
            hideNavBar={false}
            title='track'
            />
          </Stack>
        </Router>
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

const mapStateToProps = state => {
  return {
    notife: state.notife.toJS()
   }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
