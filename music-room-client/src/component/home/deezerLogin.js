import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo'
import { Actions } from 'react-native-router-flux'

import { Button } from 'react-native-ui-lib'


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
        <Button text70 white blue30 label={'Deezer'} onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        <Button text70 white blue30 label={'Logout'} onPress={() => {
           Expo.SecureStore.deleteItemAsync('token', {}).then(() => {
           console.log('del token');
             Actions.login()
           })
        }} />
        </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl: `https://connect.deezer.com/oauth/auth.php?app_id=${APP_ID}&redirect_uri=http://localhost:8080/test&perms=basic_access,email`
    });
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
