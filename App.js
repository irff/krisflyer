import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screen/Home';
import ProfileScreen from './screen/Profile';
import { DrawerNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}

const Navigator = DrawerNavigator({
  home: {
    screen: HomeScreen,
  },
  profile: {
    screen: ProfileScreen,
  },
}, {
  initialRouteName: 'home',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
