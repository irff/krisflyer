import React from 'react';
import { View, Text, Button } from 'react-native';
import { Constants } from 'expo';
import BaseScreen from '../components/BaseScreen';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: null,
  };

  render() {
    return (
      <BaseScreen>
        <Text>This is the ProfileScreen WANJIR</Text>
        <Text>{this.props.store.counterStore.count}</Text>
        <Text>Hello {this.props.store.userStore.user.name}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('home')}
          title="Go to home"
        />
      </BaseScreen>
    );
  }
}
