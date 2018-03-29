import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist } from '../../actions/playlist.js'
import request from 'superagent'
import Player from '../Player'

const soundObject = new Expo.Audio.Sound();


class Playlist extends Component {

  state = {
    value: '',
    info: [],
    typeOf: 'add',
    currentList: [],
    uri: '',
    isPlaing: false,
    currentSong: '',
  }

  callDezzerapi = (value) => {
    this.setState({value})
    request.get(`https://api.deezer.com/search?q=${value}`)
    .set('Accept', 'application/json')
    .then((res) => {
      this.setState({ info: res.body.data })
    })
  }
  getEachSong = (ids) => {
    const promiseArray = []
    const funcArr = (id) => {
      return new Promise((resolve, reject) => {
        request.get(`https://api.deezer.com/track/${id}`)
        .set('Accept', 'application/json')
        .then((res) => {
          resolve(res.body)
        })
      })
    }
    ids.forEach(id => {
      promiseArray.push(funcArr(id))
    })
    Promise.all(promiseArray).then(res => {
      this.setState({currentList: res})
    })
  }
  playSong = (id) => {

    const { isPlaing, currentSong } = this.state
    const { playlist } = this.props

    if (!id) {
      const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)
      id = playlist.playlists[index1].songs[0]
    }
    if (!isPlaing) {
      request.get(`https://api.deezer.com/track/${id}`)
      .set('Accept', 'application/json')
      .then((ziq) => {
      soundObject.loadAsync({ uri: ziq.body.preview }).then(res => {
        soundObject.playAsync().then(test => {
          this.setState({ isPlaing: true, currentSong: id })
        })
      })
      }).catch(e => {
        console.log(e);
      })
    } else {
      soundObject.unloadAsync().then(res => {
        this.setState({ isPlaing: false })
        if (id !== currentSong) {
          request.get(`https://api.deezer.com/track/${id}`)
          .set('Accept', 'application/json')
          .then((ziq) => {
          soundObject.loadAsync({ uri: ziq.body.preview }).then(res => {
            soundObject.playAsync().then(test => {
              this.setState({ isPlaing: true, currentSong: id })
            })
          })
          }).catch(e => {
            console.log(e);
          })
        }

      })
    }
  }

  nextSong = () => {

    const { currentSong } = this.state
    const { playlist } = this.props

    const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)

    const songs = playlist.playlists[index1].songs
    console.log(currentSong);
    let index =  songs.findIndex(e => e === currentSong)
    console.log('index nextSong =>',index);
    soundObject.unloadAsync().then(res => {
      this.setState({isPlaing: false, currentSong: playlist[index + 1]})
      this.playSong(playlist[index + 1])
    })
  }

  previousSong = () => {
    const { currentSong } = this.state
const { playlist } = this.props
    const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)

    const songs = playlist.playlists[index1].songs
    let index =  songs.findIndex(e => e === currentSong)
    if (index === -1)  { index = 1 }


    soundObject.unloadAsync().then(res => {
      this.setState({isPlaing: false, currentSong: playlist[index - 1]})
      this.playSong(playlist[index - 1])
    })
  }

  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = { width: 200 }

    const { info, value, typeOf, currentList, uri, currentSong} = this.state
    const { playlist } = this.props
    const index =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)
    return (
      <View style={{flex:1}}>
      <Switcher
      onChange={valueOne =>  { this.setState({ typeOf: valueOne }); if (valueOne === 'play') { this.getEachSong(playlist.playlists[index].songs) } }}
      defaultSelected={typeOf}
      >
      <TabButton value='play' text='Play' iconName='md-musical-notes'/>
      <TabButton value='add' text='add Song' iconName='md-add' />
      <TabButton value='addUser' text='add an user' iconName='md-person-add' />
      </Switcher>
      {typeOf === 'play' && (
        <View style={{flex:1}}>
        <ScrollView   style={{height:'60%'}}>
        { currentList && currentList.length !== 0 && (
          currentList.map((s,key) => {
            return ( <Button kind='squared' iconName='md-musical-notes' key={key} onPress={() => { this.setState({currentSong: s.id}); this.playSong(s.id) }}>{s.title}</Button> )
          })
        )}
        </ScrollView >
        <Player  previousSong={this.previousSong} nextSong={this.nextSong} playSong={() => {this.playSong(currentSong)}} />
        </View>
      )}

      {typeOf === 'add' && (
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
      )}

      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    playlist:  state.playlist.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export  default connect(mapStateToProps, mapDispatchToProps)(Playlist)
