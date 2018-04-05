import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Text } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { Checkbox, Button } from 'nachos-ui'
import { importDeezerList } from '../../actions/playlist.js'

import { getPlaylists, getPlaylistTracks } from '../../utils/deezerService.js'

class ImportPlayList extends Component {

  componentWillMount ()  { getPlaylists().then(playlistDeezer => { this.setState({playlistDeezer }) }) }

  state = {
    playlistDeezer: [],
    listToImport: [],
  }

  render () {

    const { user } = this.props
    const { playlistDeezer, listToImport } = this.state

    return (
      <View flex paddingH-25 paddingT-120>
    { !!playlistDeezer && playlistDeezer.length != 0 && (
      playlistDeezer.map((e, key ) => {
      return (
        <View  key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Checkbox
            checked={() => { listToImport.push(e); this.setState({listToImport}) }}
            onValueChange={this.handleFirstCheckboxChange}
            checked={false}
          />
          <Text>{e.title}</Text>
          </View>
      )
    })

    )}
      <Button kind='squared' onPress={() => { this.props.dispatch(importDeezerList(user.id, listToImport)) }} >{'Import'}</Button>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlayList)
