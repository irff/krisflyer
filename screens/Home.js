import React from 'react';
import { View, Text, Button } from 'react-native';
import { Constants } from 'expo';
import BaseScreen from '../components/BaseScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: null,
  };

  render() {
    return (
      <BaseScreen>
        <Text>This is the HomeScreen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('profile')}
          title="Go to profile"
        />
      </BaseScreen>
    );
  }
}
