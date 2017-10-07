import React from 'react';
import { ScrollView, Image } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import { Flex, AlignCenter, AlignRight, ScreenTitle, Text, Bold } from '../components/common';
import { SimpleLineIcons } from '@expo/vector-icons';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

import IconBaggage from '../assets/icons/baggage.png';
import IconDiscount from '../assets/icons/discount.png';
import IconLounge from '../assets/icons/lounge.png';
import IconMiles from '../assets/icons/miles.png';
import IconWait from '../assets/icons/wait.png';


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
          <Heading>Skylar White</Heading>
          <Text><Bold>45,560</Bold> points • KrisFlyer Elite <Bold>Silver</Bold></Text>

          <BorderDivider />

          <HeadingNavigation>
            <Bold>Miles Progress</Bold>
            <Text>See leaderboard ></Text>
          </HeadingNavigation>

          <ProgressBar width={45560/50000} />
          <Text style={{ marginTop: 8 }}>{50000-45560} more miles to unlock KrisFlyer Elite Gold</Text>
        </Section>

        <Divider />

        <Section>
          <PointsText>You have <BigBold>22,360</BigBold> points</PointsText>

          <BorderDivider />

          <HeadingNavigation>
            <Subheading>Redeem Points for More Fun</Subheading>
            <Text>See all ></Text>
          </HeadingNavigation>

          <ScrollView horizontal style={{ marginLeft: -24, marginRight: -24 }}>
            {this.curations.map(item =>
              <ItemCard key={item.text}>
                <Image source={item.icon} style={{ width: 48 }} resizeMode="contain" />
                <Text numberOfLines={2} alignText="center">{item.text}</Text>
              </ItemCard>
            )}
          </ScrollView>

          <BorderDivider />

          <BoostText>Boost your points by completing quests!</BoostText>
          <Button title="I want quests!" />

        </Section>

      </ScrollView>
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
  padding-top: ${Constants.statusBarHeight + 20};
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