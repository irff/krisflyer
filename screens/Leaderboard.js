import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';
import theme from '../constants/theme';
import {
  Flex,
  AlignCenter,
  AlignRight,
  ScreenTitle,
  Row,
  Text,
  Bold,
  Header,
  NavBar,
  HeaderIcon,
  HeaderIonicon,
} from '../components/common';

import BaseScreen from '../components/BaseScreen';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

import IconDiscount from '../assets/icons/discount.png';

@inject('store')
@observer
export default class LeaderboardScreen extends React.Component {

  componentDidMount() {
    console.log('enter leaderboard');
    console.log('updating leaderboard');

    this.props.store.leaderListStore.constructLeaderboard();
  }

  render() {
    const { goBack, navigate } = this.props.navigation;

    return (
      <BaseScreen>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Header colors={[ theme.color.black, theme.color.blue ]} style={{ height: 250 }}>
            <NavBar>
              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                <HeaderIonicon name="md-arrow-back" size={16} color={theme.color.white} />
              </TouchableOpacity>
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Leaderboard</ScreenTitle>
                </AlignCenter>
              </Flex>

              <HeaderIcon name="user" size={16} color={theme.color.white } />
            </NavBar>

            <LeaderboardContainer>
              {this.props.store.leaderListStore.leaders.map((entry, idx) =>
                <LeaderboardEntry first={idx === 0} key={idx}>
                  <LeaderboardPlace>{idx < 9 ? '0' : ''}{idx + 1}</LeaderboardPlace>
                  <Flex>
                    <LeaderboardName numberOfLines={1}>{entry.name}</LeaderboardName>
                  </Flex>
                  <LeaderboardMiles>{entry.miles} miles</LeaderboardMiles>
                </LeaderboardEntry>
              )}
            </LeaderboardContainer>
          </Header>

          <Container />
        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  background-color: ${theme.color.ivory};
  flex: 1;
`;

const LeaderboardContainer = styled.View`
  background-color: ${theme.color.white};
  z-index: 1;
  border-radius: 4;
  margin-top: 32;
  margin-left: 32;
  margin-right: 32;
  padding-top: 20;
  padding-left: 24;
  padding-right: 24;
  padding-bottom: 20;
  elevation: 2;
`;

const LeaderboardEntry = styled(Row)`
  align-items: center;
  padding-top: 12;
  padding-bottom: 12;
  border-color: ${theme.color.divider};
  ${props => !props.first && 'border-top-width: 1;'};
`;

const LeaderboardPlace = styled(Bold)`
  color: ${theme.color.yellow};
  font-size: 24;
  margin-right: 16;
`;

const LeaderboardName = styled(Bold)`
  font-size: 14;
  margin-right: 14;
`;

const LeaderboardMiles = styled(Text)`
  font-size: 11;
`;

