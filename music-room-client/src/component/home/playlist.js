import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView } from 'react-native'
import { Card, Button } from 'nachos-ui'
import { Actions } from 'react-native-router-flux'


class Playlist extends Component {

  state = {
    playlistId: '',
  }

  render () {
    const { playlist, user } = this.props
    console.log(playlist.playlists);
    const cardStyle = { margin: 15, width: 280 }
    return (
      <View style={{ flex: 1 }}>
      <Button  style={{top: '10%'}}onPress={() => { Actions.newplaylist() }}>Create a track</Button>
      <View style={{ flex: 1 }}>

      <ScrollView style={{height:'80%'}}>
        {!!playlist && !!playlist.playlists && playlist.playlists.length != 0  && (
          playlist.playlists.map((p,key) => {
        return (
          <View key={key}>
              <Card
          footerContent={p.name}
          image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
          style={cardStyle}
        />
        <Button onPress={() => { Actions.editplaylist({playlistId: p._id, userId: user.id})}}>Use</Button>
        </View>
      )
          })
        )}
        </ScrollView>
        </View>
        {!!playlist && !!playlist.playlists && playlist.playlists.length === 0 && (
          <View>
          <Text blue50 text10>{`You don't have any track`}</Text>
          <Button onPress={() => { Actions.newplaylist() }} label="Create a track"/>

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
