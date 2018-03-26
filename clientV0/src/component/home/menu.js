import React, { Component } from 'react'
import { View, TextInput, Text, Button, ActionBar } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'

class Menu extends Component {

  render () {
    const { getPlayList } = this.props

    return (
      <ActionBar
        containerStyle={[styles.absoluteContainer]}
        backgroundColor={'orange'}
        actions={[
          { label: 'Services', onPress: () => alert('hide'), white: true },
          { label: 'Your playlist', onPress: () => getPlayList(), white: true },
          { label: 'setings', onPress: () => alert('duplicate'), white: true },
        ]}
      />
    )
  }

}

const styles = StyleSheet.create({
  absoluteContainer: {
    bottom: 70,
    left: 0,
    right: 0,
  },
})

export default Menu
