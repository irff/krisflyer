import React from 'react';
import { View, Text, Button } from 'react-native';
import { Constants } from 'expo';
import BaseScreen from '../components/BaseScreen';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: null,
  };

  render() {
    return (
      <BaseScreen>
        <Text>This is the ProfileScreen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('home')}
          title="Go to home"
        />
      </BaseScreen>
    );
  }
}
