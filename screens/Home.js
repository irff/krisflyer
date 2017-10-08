import React from 'react';
import { ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import theme from '../constants/theme';import {
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
import { SimpleLineIcons } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';

import BaseScreen from '../components/BaseScreen';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

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

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('inventory')}>
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
            <Heading>{this.props.store.userStore.user.name}</Heading>
            <Text><Bold>{this.props.store.userStore.user.miles}</Bold> miles • {this.props.store.userStore.user.getLevelName}</Text>
            <TouchableWithoutFeedback onPress={() => navigate('milestones')}>
              <Link>Learn more</Link>
            </TouchableWithoutFeedback>

            <BorderDivider />

            <HeadingNavigation>
              <Bold>Miles Progress</Bold>
              <TouchableWithoutFeedback onPress={() => navigate('leaderboard')}>
                <Text>See leaderboard ></Text>
              </TouchableWithoutFeedback>
            </HeadingNavigation>

            <ProgressBar width={((25000-this.props.store.userStore.user.getRemainingMiles))/25000} />
            <Text style={{ marginTop: 8 }}>
              {this.props.store.userStore.user.getRemainingMiles} more miles to unlock{' '}
              {this.props.store.userStore.user.nextLevelName}</Text>
          </Section>

          <Divider />

          <Section>
            <PointsText>You have <BigBold>{this.props.store.userStore.user.points}</BigBold> points</PointsText>

            <BorderDivider />

            <HeadingNavigation>
              <Subheading>Redeem Points for More Fun</Subheading>
              <TouchableWithoutFeedback onPress={() => navigate('items')}>
                <Text>See all ></Text>
              </TouchableWithoutFeedback>
            </HeadingNavigation>

            <ScrollView horizontal style={{ marginLeft: -24, marginRight: -24 }}>
              {this.props.store.itemListStore.items.map(item =>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigate('itemDetails', { id: item.id })}
                  activeOpacity={0.7}
                >
                  <ItemCard>
                    <Image source={IconBaggage} style={{ width: 48 }} resizeMode="contain" />
                    <Text numberOfLines={2} textAlign="center">{item.name}</Text>
                  </ItemCard>
                </TouchableOpacity>
              )}
            </ScrollView>

            <BorderDivider />

            <BoostText>Boost your points by completing quests!</BoostText>
            <Button title="Explore Quests" onPress={() => navigate('quests')} />

          </Section>

        </ScrollView>
      </BaseScreen>
    );
  }
}

const HeadingNavigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16;
`;

const Heading = styled(Text)`
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

const ItemCard = styled.View`
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