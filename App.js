import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import { DrawerNavigator } from 'react-navigation';


export default class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#eeeeee');
  }

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
