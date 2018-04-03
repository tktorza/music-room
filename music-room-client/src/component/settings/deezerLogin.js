import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo'
import { Actions } from 'react-native-router-flux'

import {  Button } from 'nachos-ui'



//TODO A FINNIR

const APP_ID = '275462'
const APP_SECRET = '49ab00dbfafa0d19b44c21f95261f61a'
const MY_URL = 'http://localhost:8080/'
export default class DeezerLogin extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button kind='squared' onPress={this._handlePressAsync}>Dezzer</Button>
        {this.state.result ? ( <Text>{JSON.stringify(this.state.result)}</Text> ) : null}
        <Button kind='squared' onPress={() => {
           Expo.SecureStore.deleteItemAsync('token', {}).then(() => {
             Actions.login()
           })
        }}>Log-out</Button>
        </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl: `https://connect.deezer.com/oauth/auth.php?app_id=${APP_ID}&redirect_uri=http://localhost:8080/test&perms=basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history`
    });
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
