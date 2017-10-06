import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: null,
  };

  render() {
    return (
      <View>
        <Text>This is the ProfileScreen</Text>
        <Button
          onPress={this.props.navigation.navigate('home')}
          title="Go to home"
        />
      </View>
    );
  }
}
