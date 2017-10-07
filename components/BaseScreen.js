import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import theme from '../constants/theme';

const StatusBarView = styled.View`
  padding-top: ${Constants.statusBarHeight};
  background-color: ${theme.color.black};
`;

const Screen = styled.View`
  flex: 1;
  background-color: ${theme.color.white};
`;

export default (props) => (
  <View style={{ flex: 1 }}>
    <StatusBarView />
    <Screen>
      {props.children}
    </Screen>
  </View>
);
