import React from 'react';
import { View, Text, Button } from 'react-native';
import Expo from 'expo';

async function login() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1287296804709524', {
      permissions: ['public_profile'],
    });

  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: null,
  };

  render() {
    return (
      <View>
        <Text>This is the HomeScreen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('profile')}
          title="Go to profile"
        />
        <Button
          onPress={login}
          title="Login with Facebook"
        />
      </View>
    );
  }
}
