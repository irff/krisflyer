import React from 'react';
import { ScrollView, Image, View, TouchableOpacity, Share } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { Zocial, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
import IlluEmptyState from '../assets/illustrations/ilEmptystate.png';

@inject('store')
@observer
export default class LeaderboardScreen extends React.Component {

  share() {
    Share.share({
      'message' : "Join me to get amazing rewards on KrisFlyer Mobile App!\n\nPlease register using: https://www.singaporeair.com/en_UK/ppsclub-krisflyer/registration-form/",
      'title' : 'Invite Friends'
    }, {
      dialogTitle: 'Invite Friends',
    });
  }

  async login() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1287296804709524', {
      permissions: ['public_profile', 'user_friends'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);

      let res = await response.json();
      let user_id = res.id;

      console.log(res);

      const friends_list_resp = await fetch(
        `https://graph.facebook.com/${user_id}/friendlists?access_token=${token}`);
      console.log(await friends_list_resp.json());

    }
  }

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
    <View>
      <LeaderboardContainer isTop>
        {this.props.store.leaderListStore.leaders.slice(0, 5).map((entry, idx) =>
          <TouchableOpacity onPress={this.toggle(idx)} key={idx}>
            <LeaderboardEntry first={idx === 0}>
              <LeaderboardPlace>{idx < 9 ? '0' : ''}{idx + 1}</LeaderboardPlace>
              <Flex>
                <Row removeClippedSubviews>
                  <Flex><LeaderboardName numberOfLines={1}>{entry.name}</LeaderboardName></Flex>
                  <Image source={{ uri: "http://www.countryflags.io/my/flat/16.png" }} style={{ width: 16, height: 16, flexShrink: 0 }}/>
                </Row>
              </Flex>
              <LeaderboardMiles>{entry.miles} miles</LeaderboardMiles>
            </LeaderboardEntry>
          </TouchableOpacity>
        )}
      </LeaderboardContainer>
      <LeaderboardContainer style={{ marginTop: 4 }}>
        {this.props.store.leaderListStore.leaders.slice(0,3).map((entry, idx) =>
          <TouchableOpacity onPress={this.toggle(idx)} key={idx}>
            <LeaderboardEntry first={idx === 0} active={idx === 1}>
              <LeaderboardPlace active={idx === 1}>{800 + idx}</LeaderboardPlace>
              <Flex>
                <Row removeClippedSubviews>
                  <Flex><LeaderboardName numberOfLines={1}>{entry.name}</LeaderboardName></Flex>
                  <Image source={{ uri: "http://www.countryflags.io/my/flat/16.png" }} style={{ width: 16, height: 16, flexShrink: 0 }}/>
                </Row>
              </Flex>
              <LeaderboardMiles>{entry.miles} miles</LeaderboardMiles>
            </LeaderboardEntry>
          </TouchableOpacity>
        )}
      </LeaderboardContainer>
    </View>
  )

  renderFriends = () => (
    <LeaderboardContainer style={{ padding: 24 }} isTop>
      <EmptyStateImage source={IlluEmptyState} resizeMode="contain" />
      <OopsText textAlign="center">Oops... None of your friends are here yet. Invite them for more fun!</OopsText>
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.share()} >
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
            <TabContainer>
              <TabMenu activeOpacity={1} selected={this.state.tab === 'global'} onPress={() => this.setState({ tab: 'global' })}>
                <MaterialCommunityIcons name="earth" size={14} style={{  marginRight: 8 }} />
                <Bold>Global</Bold>
              </TabMenu>

              
              <TabMenu activeOpacity={1} selected={this.state.tab === 'friends'} onPress={() => this.setState({ tab: 'friends' })}>
                <Ionicons name="md-people" size={14} style={{ marginRight: 8 }}/>
                <Bold>Friends</Bold>
              </TabMenu>
            </TabContainer>

            {this.state.tab === 'global' && this.renderGlobal()}
            {this.state.tab === 'friends' && this.renderFriends()}

          </OverlapingContainer>         
        </ScrollView>
      </BaseScreen>
    );
  }
}

const TabContainer = styled(Row)`
  margin-left: 32;
  margin-right: 32;
  margin-top: 32;
`;

const TabMenu = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => props.selected ? theme.color.white : theme.color.canvas};
  align-items: center;
  border-top-left-radius: 4;
  border-top-right-radius: 4;
  padding-top: 14;
  padding-bottom: 14;
  elevation: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: ${theme.color.ivory};
  flex: 1;
`;

const LeaderboardContainer = styled.View`
  background-color: ${theme.color.white};
  z-index: 1;
  border-radius: 4;
  margin-bottom: 32;
  margin-left: 32;
  margin-right: 32;
  padding-top: 20;
  padding-bottom: 20;
  elevation: 2;

  ${props => props.isTop && `
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `};
`;

const LeaderboardEntry = styled(Row)`
  align-items: center;
  padding-top: 12;
  padding-bottom: 12;
  border-color: ${theme.color.divider};
  margin-left: 24;
  margin-right: 24;
  ${props => !props.first && 'border-top-width: 1;'};
  ${props => props.active && `
    background-color: ${theme.color.yellow}
    margin-left: 0;
    margin-right: 0;
    padding-left: 24;
    padding-right: 24;
    padding-top: 18;
    padding-bottom: 18;
  `};
`;

const LeaderboardPlace = styled(Bold)`
  color: ${theme.color.yellow};
  font-size: 24;
  margin-right: 16;
  ${props => props.active && `color: ${theme.color.white}`}
`;

const LeaderboardName = styled(Bold)`
  font-size: 14;
  margin-right: 14;
`;

const LeaderboardMiles = styled(Text)`
  font-size: 11;
  margin-left: 12;
  width: 56;
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

const EmptyStateImage = styled.Image`
  margin-top: 48;
  width: 100%;
`;

const OopsText = styled(Text)`
  font-size: 24;
  margin-top: 40;
  margin-bottom: 40;
  text-align: center;
`;

const OverlapingContainer = styled.ScrollView`
  margin-top: -144;
  padding-top: 12;
`;

