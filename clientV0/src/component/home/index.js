import React, { Component } from 'react'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Menu from './menu.js'
import { getPlayList } from '../../actions/playlist.js'
import { toJS } from 'immutable'

class Home extends Component {

  state = {
    mode: 0,
  }

  getPlayList = () => { this.setState({ mode: 1 }); this.props.dispatch(getPlayList(this.props.user.id)) }
  render () {

    const { handleSubmit, user } = this.props
    return (
      <View>
        <Text>{'In the home'}</Text>
        <Button onPress={() => {
          console.log('test')
        }}/>
        <Menu getPlayList={this.getPlayList}/>
      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    user: state.user.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
