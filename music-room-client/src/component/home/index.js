import React, { Component } from 'react'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Menu from './menu.js'
import Playlist from './playlist.js'
import { getPlayList } from '../../actions/playlist.js'
import { toJS } from 'immutable'


class Home extends Component {

  state = {
    mode: 0,
  }

  serviceMode = () => { this.setState({ mode: 0 }) }
  playListMode = () => { this.setState({ mode: 1});

  this.props.dispatch(getPlayList(this.props.user.id)) }
  settingsMode= () => { this.setState({ mode: 2 }) }
  render () {

    const { handleSubmit, user, playlist } = this.props
    const { mode } = this.state
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>


    {mode === 0 && (
      <Text>{mode}</Text>
    )}
    {mode === 1 && (
        <Playlist  playlist={playlist}/>
    )}
    {mode === 2 && (
      <Text>{mode}</Text>
    )}


        <Menu playListMode={this.playListMode} settingsMode={this.settingsMode} serviceMode={this.serviceMode} />
      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
