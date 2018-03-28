import React, { Component } from 'react'
import { View, TextInput, Text, Button, ActionBar } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card } from 'nachos-ui'


class Playlist extends Component {

  state = {
    playlistId: '',
  }

  render () {
    const { playlist, user } = this.props
    const cardStyle = { margin: 15, width: 280 }
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {!!playlist && !!playlist.playlists && playlist.playlists.length != 0  && (
          playlist.playlists.map((p,key) => {
        return (
          <View key={key}>
              <Card
          footerContent={p.name}
          image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
          style={cardStyle}
        />
        <Button label="Add song" onPress={() => { Actions.editplaylist({playlistId: p._id, userId: user.id})}}  />
        </View>
      )
          })
        )}

        {!!playlist && !!playlist.playlists && playlist.playlists.length === 0 && (
          <View>
          <Text blue50 text10>{`You don't have any traks`}</Text>
          <Button onPress={() => { Actions.newplaylist() }} label="Create a traks"/>

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
