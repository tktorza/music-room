import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { connect } from 'react-redux'
import { addSongPlaylist, updatePlaylist } from '../../actions/playlist.js'

class Playlist extends Component {

  state = {}



  render () {

    return (
      <View style={{ flex: 1 }}>

        <Text>{'HELLO'}</Text>




      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
