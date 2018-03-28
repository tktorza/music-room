import React, { Component } from 'react'
import { View, TextInput, Text, Button, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist } from '../../actions/playlist.js'
import request from 'superagent'

class Playlist extends Component {

  state = {
    value: '',
    info: [],
  }

  callDezzerapi = (value) => {
    this.setState({value})
    request.get(`https://api.deezer.com/search?q=${value}`)
    .set('Accept', 'application/json')
    .then((res) => {
      this.setState({ info: res.body.data })
    })
  }
  //https://api.deezer.com/search?q=eminem
  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = {width: 200 }

    const { info, value } = this.state
    //  <Button label="test" onPress={() => { Actions.home() }}  />

    return (
      <View>
      <Input
      style={inputStyle}
      placeholder='Find a song'
      value={this.state.value}
      onChangeText={(value) =>{ this.callDezzerapi(value)}}
      />
      <ScrollView>
      {!!info && info.length !== 0 && (
        info.map((e, key) => {
          return(
            <View key={key} style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Card
            footerContent={e.title}
            image={e.album.cover_big}
            style={cardStyle}
            />
            <Button label="Add Song" onPress={() => {this.props.dispatch(addSongPlaylist(e.id, this.props.playlistId, this.props.userId))}}/>
            </View>
          )
          })
        )}
</ScrollView>
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
export  default connect(mapStateToProps, mapDispatchToProps)(Playlist)
