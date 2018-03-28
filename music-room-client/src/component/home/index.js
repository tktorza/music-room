import React, { Component } from 'react'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { connect } from 'react-redux'
import { WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Menu from './menu.js'
import Playlist from './playlist.js'
import { getPlayList } from '../../actions/playlist.js'
import { toJS } from 'immutable'
import DeezerLogin from './deezerLogin.js'

class Home extends Component {


componentWillMount() {
  Expo.SecureStore.getItemAsync('token', {}).then(token => {
  this.props.dispatch({
      type: 'client/verifeUser',
      data: token,
    })
  })
}
  state = {
    mode: 0,
  }
 //
 //  <WebView
 //  source={{uri: 'https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id=1560273&app_id=275462'}}
 //   style={{width: Dimensions.get('window').width}}
 // />
  serviceMode = () => { this.setState({ mode: 0 }) }
  playListMode = () => { this.setState({ mode: 1}); this.props.dispatch(getPlayList(this.props.user.id)) }
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
        <Playlist  playlist={playlist} user={user}/>
    )}
    {mode === 2 && (
      <View>
      <DeezerLogin />
      </View>
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
