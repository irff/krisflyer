import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import { Font } from 'expo';
import store from './stores';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import ItemDetailsScreen from './screens/ItemDetails';
import ItemsScreen from './screens/Items';
import InventoryScreen from './screens/Inventory';
import LeaderboardScreen from './screens/Leaderboard';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'app-regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'app-bold': require('./assets/fonts/Rubik-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded)
      return (
        <Provider store={store}>
          <Navigator />
        </Provider>
      );

    return null;
  }
}


const Navigator = DrawerNavigator({
  home: {
    screen: HomeScreen,
  },
  itemDetails: {
    screen: ItemDetailsScreen,
  },
  items: {
    screen: ItemsScreen,
  },
  inventory: {
    screen: InventoryScreen,
  },
  leaderboard: {
    screen: LeaderboardScreen,
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
  }
});
