import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView } from 'react-native'
import { Card, Button } from 'nachos-ui'
import { Actions } from 'react-native-router-flux'
import { Icon } from 'react-native-elements'

class Playlist extends Component {

  state = {
    playlistId: '',
  }

  render () {
    const { playlist, user } = this.props
    const privateArray = []
    const publicArray = []

    if (playlist && playlist.playlists.length != 0) {
      playlist.playlists.forEach(e => {
        if (e.type === 'private') { privateArray.push(e) }
        if (e.type === 'public') { publicArray.push(e) }
      })
    }
    const cardStyle = { margin: 15, width: 280, borderColor: 'orange' }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: '10%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{'Your private play list:'}</Text>
            <Icon
              raised
              name='add'
              type='add'
              color='#f50'
              size={15}
              onPress={() => { Actions.newplaylist() }} />
          </View>
          <ScrollView style={{ height: '100%' }}>
            { privateArray && privateArray.length != 0 && (
              privateArray.map((p, key) => {
                return (
                  <View key={key}>
                    <Card
                      footerContent={p.name}
                      image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
                      style={cardStyle}
                    />
                    <Button kind='squared' onPress={() => { Actions.editplaylist({ playlistId: p._id, userId: user.id }) }}>Use</Button>
                  </View>
                )
              })
            )}
          </ScrollView>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <Text>{'Public play list:'}</Text>
            <Icon
              raised
              name='add'
              type='add'
              color='#f50'
              size={15}
              onPress={() => { Actions.newplaylist() }} />
          </View>
          <ScrollView style={{ height: '100%' }}>
            { publicArray && publicArray.length != 0 && (
              publicArray.map((p, key) => {
                return (
                  <View key={key}>
                    <Card
                      footerContent={p.name}
                      image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
                      style={cardStyle}
                    />
                    <Button kind='squared' onPress={() => { Actions.editplaylist({ playlistId: p._id, userId: user.id }) }}>Use</Button>
                  </View>
                )
              })
            )}
          </ScrollView>
        </View>
        {!!playlist && !!playlist.playlists && playlist.playlists.length === 0 && (
          <View>
            <Text blue50 text10>{'You don\'t have any track'}</Text>
            <Button onPress={() => { Actions.newplaylist() }} label='Create a track'/>

          </View>
        )}
      </View>
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

export default Playlist
