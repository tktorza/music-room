import React, { Component } from 'react'
import { View, TextInput, Text, Button, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist } from '../../actions/playlist.js'
import request from 'superagent'

class Playlist extends Component {

  state = {
    value: '',
    info: [],
    typeOf: 'add',
    currentList: [],
    uri: '',
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
  //https://api.deezer.com/search?q=eminem
  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = {width: 200 }

    const { info, value, typeOf, currentList, uri } = this.state
    const { playlist } = this.props
    //  <Button label="test" onPress={() => { Actions.home() }}  />
    const index =  playlist.playlists.findIndex(e => e._id === this.props.playlistId)
    return (
      <View style={{flex:1}}>
      <Switcher
       onChange={valueOne =>  { this.setState({ typeOf: valueOne }); if(valueOne === 'play'){this.getEachSong(playlist.playlists[index].songs)} }}
       defaultSelected={typeOf}
     >
       <TabButton value='play' text='Play' iconName='md-musical-notes'/>
       <TabButton value='add' text='add Song' iconName='md-add' />
       <TabButton value='addUser' text='add an user' iconName='md-person-add' />
     </Switcher>
     {typeOf === 'play' && (
       <View style={{flex:1}}>
       { currentList && currentList.length !== 0 && (
         currentList.map((s,key) => {
           return (
             <View key={key}>
             <Text>{s.title}</Text>
             <Button label='play' onPress={() => {this.setState({uri: `https://www.deezer.com/plugins/player?format=square&autoplay=true&playlist=true&color=007FEB&layout=dark&type=tracks&id=${s.id}&app_id=275462&access_token=fr0fnc6Z7E1crLFb2UV5sk2zyaiJOrepOP7axTl1AthSmsyAVYk`}) }}/>
             </View>
           )
         })
       )}
       <WebView
       source={{uri:  'https://www.deezer.com/plugins/player?access_token=fr0fnc6Z7E1crLFb2UV5sk2zyaiJOrepOP7axTl1AthSmsyAVYk&format=square&autoplay=true&playlist=true&color=007FEB&layout=dark&type=tracks&id=1141668&app_id=275462'}}
        style={{width: Dimensions.get('window').width}}
      />
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
