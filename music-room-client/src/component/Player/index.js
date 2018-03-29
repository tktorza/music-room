import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist } from '../../actions/playlist.js'
import request from 'superagent'

import { Icon } from 'react-native-elements'

class Playlist extends Component {

  state = {
    isPlaing: false,
  }


  componentDidMount() {
    this.playSong(this.props.uri)
    //    const soundObject = new Expo.Audio.Sound();
    //   soundObject.loadAsync({uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3'}).then(res => {
    //     console.log('res =>',res);
    //     soundObject.playAsync().then(test => {
    //       console.log('Test =>',test);
    //     })
    //
    // }).catch(e => {
    //   console.log(e);
    // })
  }
  playSong = (uri) => {
        const soundObject = new Expo.Audio.Sound();

    soundObject.loadAsync({ uri }).then(res => {
      console.log('res =>',res);
      soundObject.playAsync().then(test => {
        console.log('Test =>',test);
      })
    }).catch(e => {
      console.log(e);
    })
  }


  render () {


    const { isPlaing } = this.state
    const { uri } = this.props

    return (
      <View style={{flex:1}}>
      <Button>Preview</Button>
      <Button onPress={() => {this.playSong(uri)}}>Play</Button>
      <Button>Next</Button>
      </View>
    )
  }
}

export default Playlist
