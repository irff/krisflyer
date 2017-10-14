import React from 'react';
import { ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import {
  Row, 
  Flex,
  AlignCenter,
  AlignRight,
  ScreenTitle,
  Text,
  Bold,
  Header,
  NavBar,
  HeaderIcon,
} from '../components/common';
import { formatNumber } from '../utils';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';

import BaseScreen from '../components/BaseScreen';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button, { SecondaryButton } from '../components/Button';

import IconBaggage from '../assets/icons/baggage.png';
import IconDiscount from '../assets/icons/discount.png';
import IconLounge from '../assets/icons/lounge.png';
import IconMiles from '../assets/icons/miles.png';
import IconWait from '../assets/icons/wait.png';

import ImgBanner1 from '../assets/banners/banner1.png';
import ImgBanner2 from '../assets/banners/banner2.png';
import ImgBanner3 from '../assets/banners/banner3.png';


@inject('store')
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: null,
  };

  banners = [ ImgBanner1, ImgBanner2, ImgBanner3 ];

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props.store.userStore;

    return (
      <BaseScreen>
        <ScrollView>
          <Header colors={[ theme.color.black, theme.color.blue ]}>
            <NavBar>
              <HeaderIcon name="menu" size={16} color={theme.color.white} />
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white}>Home</ScreenTitle>
                </AlignCenter>
              </Flex>

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('profile')}>
                <HeaderIcon name="user" size={16} color={theme.color.white } />
              </TouchableOpacity>
            </NavBar>

            <ScrollView horizontal>
              {this.banners.map((banner, idx) =>
                <BannerCard key={idx}>
                  <BannerImg resizeMode="cover" source={banner} />
                </BannerCard>
              )}
            </ScrollView>

          </Header>

          <Section>
            <NameText>{user.name}</NameText>
            <Row>
              <Flex>
                <UserInfoTop>YOU'VE REACHED</UserInfoTop>
                <ValueText>{formatNumber(user.miles)}</ValueText>
                <UserInfoBottom>MILES</UserInfoBottom>
              </Flex>
              <Flex>
                <UserInfoTop>YOU OWN</UserInfoTop>
                <ValueText>{formatNumber(user.points)}</ValueText>
                <UserInfoBottom>POINTS</UserInfoBottom>
              </Flex>
            </Row>
          </Section>

          <Divider />

          <Section>
            <SectionHead>
              <SectionTitle>Your Miles</SectionTitle>
              <Ionicons name="ios-arrow-up" size={24} color={theme.color.gray} />
            </SectionHead>

            <HeadingNavigation>
              <Bold>{user.getLevelName}</Bold>
              <Text><Bold style={{ color: theme.color.yellow }}>{formatNumber(user.miles)}</Bold>
              /{formatNumber(user.miles + user.getRemainingMiles)}</Text>
            </HeadingNavigation>

            <ProgressBar width={((25000-user.getRemainingMiles))/25000} />
            <Text style={{ marginTop: 8, fontSize: 12 }}>
              <Bold>{formatNumber(user.getRemainingMiles)}</Bold> more to be{' '}
              {user.nextLevelName} & unlock more items
            </Text>

            <SecondaryButton
              title="Learn more about Milestones & Bonus"
              style={{ marginTop: 16 }}
              onPress={() => navigate('milestones')}
            />

            <BorderDivider />

            <Text>You are ranked the <YellowNum>{formatNumber(1560)}</YellowNum>th on global leaderboard</Text>

            <SecondaryButton
              title="See Full Leaderboard"
              style={{ marginTop: 16 }}
              onPress={() => navigate('leaderboard')}
            />

          </Section>

          <Divider />

          <Section>
            <SectionHead>
              <SectionTitle>Your Points</SectionTitle>
              <Ionicons name="ios-arrow-up" size={24} color={theme.color.gray} />
            </SectionHead>
            <Text>You own <YellowNum>{formatNumber(user.points)}</YellowNum> redeemable points</Text>

            <BorderDivider />

            <BoostText>Boost your points by completing quests!</BoostText>
            <Button title="Explore Quests" onPress={() => navigate('quests')} />

            <BorderDivider />

            <HeadingNavigation>
              <Subheading>Redeem Points for More Fun</Subheading>
              <TouchableWithoutFeedback onPress={() => navigate('items')}>
                <Text>See all ></Text>
              </TouchableWithoutFeedback>
            </HeadingNavigation>

            <ScrollView
              horizontal
              style={{ marginLeft: -32, marginRight: -32 }}
              contentContainerStyle={{ alignItems: 'stretch', flexDirection: 'row' }}
            >
              <ScrollPadding />
              {this.props.store.itemListStore.items.map(item =>
                <ItemCard
                  key={item.id}
                  onPress={() => navigate('itemDetails', { id: item.id })}
                  activeOpacity={0.7}
                >
                  <Image source={IconBaggage} style={{ width: 48 }} resizeMode="contain" />
                  <Text numberOfLines={2} style={{ textAlign: 'center' }}>{item.name}</Text>
                </ItemCard>
              )}
              <ScrollPadding />
            </ScrollView>

          </Section>

        </ScrollView>
      </BaseScreen>
    );
  }
}

const SectionHead = styled(Row)`
  padding-bottom: 20;
`;

const SectionTitle = styled(Text)`
  font-size: 26;
  flex: 1;
`;

const HeadingNavigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16;
`;

const NameText = styled(Bold)`
  text-align: center;
  margin-bottom: 20;
  font-size: 28;
`;

const Subheading = styled(Bold)`
  font-size: 16;
`;

const BoostText = styled(Bold)`
  font-size: 16;
  margin-bottom: 12;
`;

const PointsText = styled(Text)`
  font-size: 16;
`;

const BigBold = styled(Bold)`
  font-size: 20;
`;

const Section = styled.View`
  background-color: ${theme.color.white};
  padding-top: 32; 
  padding-bottom: 32; 
  padding-left: 32; 
  padding-right: 32; 
`;

const BannerCard = styled.View`
  width: 280;
  height: 102;
  margin-left: 16;
  border-radius: 4;
  elevation: 3;
  background-color: ${theme.color.white};
  margin-bottom: 20;
`;

const BannerImg = styled.Image`
  width: 280;
  height: 102;
  border-radius: 4;
`;

const Link = styled(Text)`
  text-decoration-line: underline;
`;

const ItemCard = styled.TouchableOpacity`
  background-color: ${theme.color.white};
  padding-top: 8;
  padding-bottom: 16;
  padding-left: 8;
  padding-right: 8;
  align-items: center;
  elevation: 4;
  width: 96;
  margin-top: 4;
  margin-left: 4;
  margin-right: 4;
  margin-bottom: 4;
`;

const UserInfoTop = styled(Text)`
  text-align: center;
  font-size: 12;
`;

const ValueText = styled(Bold)`
  font-size: 24;
  text-align: center;
`;

const UserInfoBottom = styled(Bold)`
  text-align: center;
  font-size: 12;
`;

const YellowNum = styled(Bold)`
  font-size: 18;
  color: ${theme.color.yellow};
`;

const ScrollPadding = styled.View`
  width: 32;
  background-color: transparent;
`;
