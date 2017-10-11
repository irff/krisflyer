import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { Zocial } from '@expo/vector-icons';
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

import IconBaggage from '../assets/icons/baggage.png';

@inject('store')
@observer
export default class LeaderboardScreen extends React.Component {
  componentDidMount() {
    console.log('enter leaderboard');
    console.log('updating leaderboard');

    this.props.store.leaderListStore.constructLeaderboard();
  }

  state = {
    opened: -1,
    tab: 'global',
  }

  toggle = idx => () => {
    if (this.state.opened === idx) {
      this.setState({ opened: -1 });
    } else this.setState({ opened: idx });
  }

  renderGlobal = () => (
    <LeaderboardContainer>
      {this.props.store.leaderListStore.leaders.map((entry, idx) =>
        <View key={idx}>
          <TouchableOpacity onPress={this.toggle(idx)}>
            <LeaderboardEntry first={idx === 0}>
              <LeaderboardPlace>{idx < 9 ? '0' : ''}{idx + 1}</LeaderboardPlace>
              <Flex>
                <LeaderboardName numberOfLines={1}>{entry.name}</LeaderboardName>
              </Flex>
              <LeaderboardMiles>{entry.miles} miles</LeaderboardMiles>
            </LeaderboardEntry>
          </TouchableOpacity>
          {this.state.opened === idx &&
            <ScrollView horizontal>
              {entry.purchased_item_list.purchased_items.map(({ item }) =>
                <ItemCard key={item.id}>
                  <Image source={IconBaggage} style={{ width: 36, height: 36 }} resizeMode="contain" />
                  <Text numberOfLines={2} textAlign="center" style={{ fontSize: 11 }}>{item.name}</Text>
                </ItemCard>
              )}
            </ScrollView>
          }
        </View>
      )}
    </LeaderboardContainer>
  )

  renderFriends = () => (
    <LeaderboardContainer>
      <OopsText textAlign="center">Oops... None of your friends are here yet. Invite them for more fun!</OopsText>
      <TouchableOpacity activeOpacity={0.7}>
        <FacebookInviteButton>
          <Zocial name="facebook" color={theme.color.white} size={16} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Bold style={{ color: theme.color.white, fontSize: 16 }} textAlign="center">Invite friends</Bold>
          </View>
        </FacebookInviteButton>
      </TouchableOpacity>
    </LeaderboardContainer>
  )

  render() {
    const { goBack, navigate } = this.props.navigation;

    return (
      <BaseScreen>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Header colors={[ theme.color.black, theme.color.blue ]} style={{ height: 200 }}>
            <NavBar>
              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                <HeaderIonicon name="md-arrow-back" size={16} color={theme.color.white} />
              </TouchableOpacity>
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Leaderboard</ScreenTitle>
                </AlignCenter>
              </Flex>

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('inventory')}>
                <HeaderIcon name="user" size={16} color={theme.color.white } />
              </TouchableOpacity>
            </NavBar>
          </Header>
          <OverlapingContainer>
            <Row>
              <Flex style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ tab: 'global' })}>
                  <Bold style={{
                    color: this.state.tab === 'global' ?  theme.color.yellow : theme.color.white,
                  }}>Global</Bold>  
                </TouchableOpacity>
              </Flex>

              
              <Flex style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ tab: 'friends' })}>
                  <Bold style={{
                    color: this.state.tab === 'friends' ?  theme.color.yellow : theme.color.white,
                  }} >Friends</Bold>
                </TouchableOpacity>
              </Flex>
            </Row>

            {this.state.tab === 'global' && this.renderGlobal()}
            {this.state.tab === 'friends' && this.renderFriends()}

          </OverlapingContainer>         
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
  margin-bottom: 32;
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

const ItemCard = styled.View`
  background-color: ${theme.color.white};
  align-items: center;
  width: 56;
  margin-top: 4;
  margin-left: 4;
  margin-right: 4;
  margin-bottom: 4;
`;

const FacebookInviteButton = styled.View`
  padding-top: 8;
  padding-left: 12;
  padding-right: 8;
  padding-bottom: 12;
  background-color: #3b5998;
  flex-direction: row;
  align-items: center;
  border-radius: 4;
`;

const OopsText = styled(Text)`
  font-size: 24;
  margin-top: 84;
  margin-bottom: 84;
`;

const OverlapingContainer = styled.ScrollView`
  margin-top: -144;
  padding-top: 12;
`;

