// Home Screen (Old Version), currently not being used anywhere, only for testing purposes
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Expo, { Constants } from 'expo';
import BaseScreen from '../components/BaseScreen';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: null,
  };

  async login() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1287296804709524', {
      permissions: ['public_profile', 'user_friends'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(await response.json());
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  render() {
    return (
      <BaseScreen>
        <Text>This is the HomeScreen.</Text>
        <Text>{this.props.store.counterStore.count}</Text>
        <Text>{this.props.store.counterStore.isOdd}</Text>
        <Button
          onPress={() => this.props.store.counterStore.increment()}
          title="+"
        />
        <Button
          onPress={() => this.props.store.counterStore.increment(-1)}
          title="-"
        />
        <Button
          onPress={() => this.props.navigation.navigate('profile')}
          title="Go to profile"
        />
        <Button
          onPress={this.login}
          title="Login with Facebook"
        />
      </BaseScreen>
    );
  }
}
