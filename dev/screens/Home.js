// Latest version of Home Screen
import React from 'react';
import { ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
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
  DummyNavIcon,
  NavBar,
  HeaderIcon,
} from '../components/common';
import { formatNumber } from '../utils';
import { SimpleLineIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
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
  bannerLinks = [ 'milestones', 'items', 'quests' ];
  pointsDetails = 'Points is an in-app currency. You can buy items with points. You will get points everytime you accrue miles, finish quests, or reach milestone. The interesting part is, you can top up your points as much as you want!';
  milesDetails = 'Miles is experience points. You will earn miles every time you fly or shop from partners. You can\'t top up your miles and it  will never be subtracted. Miles will determine what items you can shop from partners.';

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props.store.userStore;

    return (
      <BaseScreen>
        <ScrollView>
          <Header colors={[ theme.color.black, theme.color.blue ]}>
            <NavBar>
              <DummyNavIcon />
              
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
                <BannerCard key={idx} activeOpacity={0.75} onPress={() => navigate(this.bannerLinks[idx])}>
                  <BannerImg resizeMode="cover" source={banner} />
                </BannerCard>
              )}
            </ScrollView>

          </Header>

          <Section>
            <NameText>Hi, <Bold>{user.name}</Bold>!</NameText>
            <Row>
              <Flex>
                <TouchableOpacity activeOpacity={0.75} onPress={() => Alert.alert('What is Miles?', this.milesDetails)}>
                  <UserInfoTop>YOU'VE REACHED</UserInfoTop>
                  <ValueText>{formatNumber(user.miles)}</ValueText>
                  <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <UserInfoBottom>MILES</UserInfoBottom>
                    <FontAwesome name="question-circle" color={theme.color.lightGray} size={12} style={{ marginLeft: 4 }} />
                  </Row>
                </TouchableOpacity>
              </Flex>
              <Flex>
                <TouchableOpacity activeOpacity={0.75} onPress={() => Alert.alert('What is Points?', this.pointsDetails)}>
                  <UserInfoTop>YOU OWN</UserInfoTop>
                  <ValueText>{formatNumber(user.points)}</ValueText>
                  <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <UserInfoBottom>POINTS</UserInfoBottom>
                    <FontAwesome name="question-circle" color={theme.color.lightGray} size={12} style={{ marginLeft: 4 }} />
                  </Row>
                </TouchableOpacity>
              </Flex>
            </Row>
          </Section>

          <Divider />

          <Section>
            <SectionHead>
              <SectionTitle>Your Miles</SectionTitle>
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
            </SectionHead>
            <Text>You own <YellowNum>{formatNumber(user.points)}</YellowNum> redeemable points</Text>

            <BorderDivider />

            <Row style={{ alignItems: 'stretch' }}>
              <BlueBox style={{ marginRight: 12 }} >
                <Text style={{ color: theme.color.white, flex: 1, marginBottom: 8 }}>Top up to get points instantly!</Text>
                <Button title="Top Up Now" onPress={() => navigate('topup')} />
              </BlueBox>

              <BlueBox>
                <Text style={{ color: theme.color.white, flex: 1, marginBottom: 8 }}>Boost your points by completing quests!</Text>
                <Button title="Explore Quests" onPress={() => navigate('quests')} />
              </BlueBox>
            </Row>

            <Button title="Pay with Stripe" onPress={() => this.props.store.paymentStore.topUpPoints() } />

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

const NameText = styled(Text)`
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

const BannerCard = styled.TouchableOpacity`
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

const BlueBox = styled(Flex)`
  background-color: ${theme.color.blue};
  padding-top: 12;
  padding-left: 12;
  padding-right: 12;
  padding-bottom: 12;
`;
