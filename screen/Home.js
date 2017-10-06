import React from 'react';
import { View, Text, Button } from 'react-native';

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
          onPress={this.props.navigation.navigate('profile')}
          title="Go to profile"
        />
      </View>
    );
  }
}
