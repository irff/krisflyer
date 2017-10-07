import React from 'react';
import { ScrollView, Image } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import { Flex, AlignCenter, AlignRight, ScreenTitle, Text, Bold } from '../components/common';
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


@inject('store')
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: null,
  };

  curations = [
    {
      icon: IconBaggage,
      text: 'Extra Baggage of 7 kgs',
    },
    {
      icon: IconMiles,
      text: '10% of Extra Miles',
    },
    {
      icon: IconDiscount,
      text: '5% Discount with Miles',
    },
    {
      icon: IconBaggage,
      text: 'Priority baggage handling',
    },
    {
      icon: IconLounge,
      text: 'Premium Lounge',
    },

  ];

  render() {
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

              <HeaderIcon name="user" size={16} color={theme.color.white } />
            </NavBar>

            <ScrollView horizontal>
              <BannerCard />
              <BannerCard />
              <BannerCard />
              <BannerCard />
            </ScrollView>

          </Header>

          <Section>
            <Heading>{this.props.store.userStore.user.name}</Heading>
            <Text><Bold>{this.props.store.userStore.user.miles}</Bold> points • {this.props.store.userStore.user.nextLevelName}</Text>

            <BorderDivider />

            <HeadingNavigation>
              <Bold>Miles Progress</Bold>
              <Text>See leaderboard ></Text>
            </HeadingNavigation>

            <ProgressBar width={((25000-this.props.store.userStore.user.getRemainingMiles))/25000} />
            <Text style={{ marginTop: 8 }}>{this.props.store.userStore.user.getRemainingMiles} more miles to unlock {this.props.store.userStore.user.nextLevelName}</Text>
          </Section>

          <Divider />

          <Section>
            <PointsText>You have <BigBold>{this.props.store.userStore.user.points}</BigBold> points</PointsText>

            <BorderDivider />

            <HeadingNavigation>
              <Subheading>Redeem Points for More Fun</Subheading>
              <Text>See all ></Text>
            </HeadingNavigation>

            <ScrollView horizontal style={{ marginLeft: -24, marginRight: -24 }}>
              {this.props.store.itemListStore.items.map(item =>
                <ItemCard key={item.id}>
                  <Image source={IconBaggage} style={{ width: 48 }} resizeMode="contain" />
                  <Text numberOfLines={2} textAlign="center">{item.name}</Text>
                </ItemCard>
              )}
            </ScrollView>

            <BorderDivider />

            <BoostText>Boost your points by completing quests!</BoostText>
            <Button title="I want quests!" />

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
  height: 96;
  margin-left: 16;
  border-radius: 4;
  elevation: 3;
  background-color: ${theme.color.white};
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

const Header = styled(LinearGradient)`
  padding-top: 20;
  padding-bottom: 20;
`;

const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16;
`;

const HeaderIcon = styled(SimpleLineIcons)`
  margin-left: 16;
  margin-right: 16;
`;