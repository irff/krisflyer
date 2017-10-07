import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import { DrawerNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import { Font } from 'expo';
import store from './stores';

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
