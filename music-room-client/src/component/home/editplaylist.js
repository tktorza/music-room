import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist, updatePlaylist } from '../../actions/playlist.js'
import request from 'superagent'
import Player from '../Player'
import AddUser from './adduser.js'
import { Icon } from 'react-native-elements'


const soundObject = new Expo.Audio.Sound();


class Playlist extends Component {

  state = {
    value: '',
    info: [],
    typeOf: 'play',
    currentList: [],
    uri: '',
    isPlaying: false,
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
    ids.forEach(s => {
      promiseArray.push(funcArr(s.id))
    })
    Promise.all(promiseArray).then(res => {
      this.setState({currentList: res})
    })
  }
  playSong = (id) => {
    console.log(id);
    const { isPlaying, currentSong } = this.state
    const { playlist } = this.props

    if (!id) {
      const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)
      id = playlist.playlists[index1].songs[0].id
    }
    if (!isPlaying) {
      request.get(`https://api.deezer.com/track/${id}`)
      .set('Accept', 'application/json')
      .then((ziq) => {
        soundObject.loadAsync({ uri: ziq.body.preview }).then(res => {
          soundObject.playAsync().then(test => {
            this.setState({ isPlaying: true, currentSong: id })
          })
        })
      }).catch(e => {
        console.log(e);
      })
    } else {
      soundObject.unloadAsync().then(res => {
        this.setState({ isPlaying: false })
        if (id !== currentSong) {
          request.get(`https://api.deezer.com/track/${id}`)
          .set('Accept', 'application/json')
          .then((ziq) => {
            soundObject.loadAsync({ uri: ziq.body.preview }).then(res => {
              soundObject.playAsync().then(test => {
                this.setState({ isPlaying: true, currentSong: id })
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


    let index =  songs.findIndex(e => e.id == currentSong)
    index+= 1

    soundObject.unloadAsync().then(res => {
      this.setState({isPlaying: false})
      this.playSong(songs[index].id)
    })
  }

  previousSong = () => {
    const { currentSong } = this.state
    const { playlist } = this.props
    const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)

    const songs = playlist.playlists[index1].songs
    let index =  songs.findIndex(e => e.id == currentSong)

    soundObject.unloadAsync().then(res => {
      this.setState({isPlaying: false, currentSong: songs[index - 1].id})
      this.playSong(songs[index - 1].id)
    })
  }
  updateGrade = (grade, songId) => {

    const { playlist, dispatch, user } = this.props
    const index1 =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)

    const songs = playlist.playlists[index1].songs
    let index =  songs.findIndex(e => e.id == songId)

    if(grade > 0) {

    let toGo = songs[index - 1].grade
    let at =  songs[index].grade
    songs[index].grade = toGo
    songs[index - 1].grade = at
  } else {
    let toGo = songs[index + 1].grade
    let at =  songs[index].grade
    songs[index].grade = toGo
    songs[index + 1].grade = at
  }

    dispatch(updatePlaylist({songs}, playlist.playlists[index1]._id, user.id))
  }

  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = { width: 200 }

    const { info, value, typeOf, currentList, uri, currentSong} = this.state
    const { playlist, user } = this.props
    const index =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)
    const indexUser = playlist.playlists[index].users.findIndex(u => u.id === user.id)
    return (
      <View style={{flex:1}}>
       {playlist.playlists[index].users[indexUser].role === 'RW' && (
      <Switcher
      onChange={valueOne =>  { this.setState({ typeOf: valueOne }); }}
      defaultSelected={typeOf}
      >
      <TabButton value='play' text='Play' iconName='md-musical-notes'/>
      <TabButton value='add' text='add Song' iconName='md-add' />
      <TabButton  value='addUser' text='add an user' iconName='md-person-add' />
      </Switcher>)}
      {typeOf === 'play' && (
        <View style={{flex:1}}>
        <ScrollView   style={{height:'60%'}}>
        { !!playlist && !!playlist.playlists && playlist.playlists[index].songs !== 0 && (
          playlist.playlists[index].songs.map((s,key) => {
            return (
              <View key={key} style={{display: 'flex', flexDirection: 'row',  alignItems: 'center' }}>
                 {playlist.playlists[index].users[indexUser].role === 'RW' && (
              <Icon
              raised
              name='keyboard-arrow-up'
              type='keyboard-arrow-up'
              color='#f50'
              size={15}
              onPress={() => { if (key !== 0) { this.updateGrade(1,s.id) } }} />
            )}
               {playlist.playlists[index].users[indexUser].role === 'RW' && (
              <Icon
              raised
              name='keyboard-arrow-down'
              type='keyboard-arrow-down'
              color='#f50'
              size={15}
              onPress={() => { if (key < playlist.playlists[index].songs.length - 1) { this.updateGrade(-1,s.id) } }} />
            )}
              <Button kind='squared' iconName='md-musical-notes'  onPress={() => { this.setState({currentSong: s.id}); this.playSong(s.id) }}>{s.name}</Button>
              </View>)
          })
        )}
        </ScrollView >
        <Player  previousSong={this.previousSong} nextSong={this.nextSong} playSong={() => {this.playSong(currentSong)}} />
        </View>
      )}

      {typeOf === 'add' &&  (
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
              <Button onPress={() => {this.props.dispatch(addSongPlaylist(e.id, this.props.playlistId, this.props.userId, e.title))}}>{'Add Song'}</Button>
              </View>
            )
          })
        )}

        </ScrollView>

        </View>
      )}

      {typeOf === 'addUser' &&( <AddUser plId={this.props.playlistId} userId={user.id} users={ playlist.playlists[index].users} /> )}
      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    playlist:  state.playlist.toJS(),
    user: state.user.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export  default connect(mapStateToProps, mapDispatchToProps)(Playlist)
