import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { verifeUser } from '../../actions/user.js'
import { Input, Button } from 'nachos-ui'

class Code extends Component {

  state = {
    code: ''
  }
  render () {

    const { code } = this.state

    return (
      <View flex paddingH-25 paddingT-120>
      <Input
      style={{ margin: 15 }}
      placeholder={'code'}
      value={this.state.code}
      onChangeText={value => this.setState({ code: value })}
      />
          <Button onPress={() => {this.props.dispatch(verifeUser(code, this.props.email))}}>Verifie</Button>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Code)
