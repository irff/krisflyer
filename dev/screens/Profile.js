import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';
import theme from '../constants/theme';
import Formatter from 'human-format';
import { formatNumber } from '../utils';
import {
  Flex,
  AlignCenter,
  AlignRight,
  ScreenTitle,
  Row,
  Text,
  LightText,
  Bold,
  Header,
  NavBar,
  DummyNavIcon,
  HeaderIcon,
  HeaderIonicon,
} from '../components/common';

import BaseScreen from '../components/BaseScreen';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

import IconDiscount from '../assets/icons/discount.png';

import IlluMiles from '../assets/illustrations/illu_miles.png';
import IlluSteps from '../assets/illustrations/illu_steps.png';
import IlluCountries from '../assets/illustrations/illu_countries.png';
import IlluCities from '../assets/illustrations/illu_cities.png';
import IlluClouds from '../assets/illustrations/illu_clouds.png';
import IlluBaggage from '../assets/illustrations/illu_baggage.png';

@inject('store')
@observer
export default class InventoryScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    const { user } = this.props.store.userStore;
    const { purchased_items } = this.props.store.purchasedItemListStore;

    const statistics = [
      {
        text: 'We thank you for being loyal with us by traveling',
        number: user.miles,
        unit: 'miles',
        background: IlluMiles,
      },
      {
        text: 'Converted to footsteps, you have walked',
        number: 222300000,
        unit: 'single steps',
        background: IlluSteps,
      },
      {
        text: 'Throughout the entire trips, you have visited',
        number: 13,
        unit: 'countries',
        background: IlluCountries,
      },
      {
        text: 'Beside that, you also explored and wandered over',
        number: 36, 
        unit: 'cities/states',
        background: IlluCities,
      },
      {
        text: 'You have spent your time on cloud for',
        number: 113700,
        unit: 'minutes',
        background: IlluClouds,
      },
      {
        text: 'According to the conveyor, you have brought',
        number: 504,
        unit: 'kgs of baggage',
        background: IlluBaggage,
      },

    ];

    return (
      <BaseScreen>
        <ScrollView>
          <Header colors={[ theme.color.black, theme.color.blue ]} style={{ height: 200 }} >
            <NavBar>
              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                <HeaderIonicon name="md-arrow-back" size={16} color={theme.color.white} />
              </TouchableOpacity>
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Profile</ScreenTitle>
                </AlignCenter>
              </Flex>
              
              <DummyNavIcon />
            </NavBar>
          </Header>

          <OverlapingContainer>
            <ProfileContainer>
              <ProfileImage source={{ uri: 'http://i.pravatar.cc/160' }} />
              <ProfileCard>
                <Row style={{ alignItems: 'center' }}>
                  <Flex>
                    <ProfileSectionTitle>FULLNAME</ProfileSectionTitle>
                  </Flex>
                  <Flex>
                    <ProfileSectionTitle>LEADERBOARD NAME</ProfileSectionTitle>
                  </Flex>
                  <Flex>
                    <ProfileSectionTitle>NATIONALITY</ProfileSectionTitle>
                  </Flex>
                </Row>
                <Row>
                  <Flex>
                    <ProfileSectionContent numberOfLines={1}>{user.name}</ProfileSectionContent>
                  </Flex>
                  <Flex>
                    <ProfileSectionContent numberOfLines={1}>robbstark94</ProfileSectionContent>
                  </Flex>
                  <Flex>
                    <Row style={{ justifyContent: 'center' }}>
                      <ProfileSectionContent numberOfLines={1}>USA</ProfileSectionContent>
                      <Image source={{ uri: "http://www.countryflags.io/us/flat/16.png" }} style={{ width: 16, height: 16, flexShrink: 0 }}/>
                    </Row>
                  </Flex>
                </Row>

                <BorderDivider />

                <Row>
                  <Flex>
                    <ProfileSectionTitle>MILES REACHED</ProfileSectionTitle>
                    <ProfileSectionStats>{formatNumber(user.miles)}</ProfileSectionStats>
                  </Flex>
                  <Flex>
                    <ProfileSectionTitle>OWNED ITEMS</ProfileSectionTitle>
                    <ProfileSectionStats>{purchased_items.length}</ProfileSectionStats>
                  </Flex>
                  <Flex>
                    <ProfileSectionTitle>GLOBAL RANK</ProfileSectionTitle>
                    <ProfileSectionStats>{formatNumber(801)}</ProfileSectionStats>
                  </Flex>
                </Row>
              </ProfileCard>
            </ProfileContainer>

            <Container>
              <HeadingNavigation>
                <Subheading>Active Items</Subheading>
                <Text>See all ></Text>
              </HeadingNavigation>

              <ScrollView horizontal style={{ marginLeft: -32, marginRight: -32 }}>
                <ScrollPadding />
                {this.props.store.purchasedItemListStore.purchased_items.filter(item => !item.is_invalidated).map(item =>
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigate('itemDetails', { id: item.item.id })}
                    activeOpacity={0.7}
                  >
                    <ItemCard>
                      <Image source={IconDiscount} style={{ width: 48 }} resizeMode="contain" />
                      <Text numberOfLines={2} textAlign="center">{item.item.name}</Text>
                    </ItemCard>
                  </TouchableOpacity>
                )}
                <ScrollPadding />
              </ScrollView>


              <HeadingNavigation style={{ marginTop: 12 }}>
                <Subheading>Used / Expired Items</Subheading>
                <Text>See all ></Text>
              </HeadingNavigation>

              <ScrollView horizontal style={{ marginLeft: -32, marginRight: -32 }}>
                <ScrollPadding />
                {this.props.store.purchasedItemListStore.purchased_items.filter(item => item.is_invalidated).map(item =>
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigate('itemDetails', { id: item.item.id })}
                    activeOpacity={0.7}
                  >
                    <ItemCard>
                      <Image source={IconDiscount} style={{ width: 48 }} resizeMode="contain" />
                      <Text numberOfLines={2} textAlign="center">{item.item.name}</Text>
                    </ItemCard>
                  </TouchableOpacity>
                )}
                <ScrollPadding />
              </ScrollView>

              <BorderDivider />

              <Bold style={{ fontSize: 32, width: 200 }}>Your Journey with Us</Bold>

              {statistics.map(stat =>
                <StatisticCard key={stat.text}>
                  <Flex>
                    <Text>{stat.text}</Text>
                  </Flex>
                  <Flex style={{ marginLeft: 8 }}>
                    <StatisticNum>{Formatter(stat.number).toUpperCase()}</StatisticNum>
                    <StatisticUnit>{stat.unit.toUpperCase()}</StatisticUnit>
                  </Flex>
                  <StatisticBackground source={stat.background} resizeMode="contain" />
                </StatisticCard>
              )}

            </Container>
          </OverlapingContainer>
        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  padding-top: 32;
  padding-left: 32;
  padding-right: 32;
  padding-bottom: 32;
`;

const ProfileContainer = styled.View`
  margin-top: 32;
`;

const ProfileCard = Container.extend`
  background-color: ${theme.color.white};
  margin-left: 20;
  margin-right: 20;
  elevation: 4;
  margin-top: -40;
  padding-top: 72;
`;

const ProfileImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 40;
  align-self: center;
  elevation: 8;
`;

const HeadingNavigation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16;
`;

const Subheading = styled(Bold)`
  font-size: 16;
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

const OverlapingContainer = styled.ScrollView`
  margin-top: -144;
  padding-top: 12;
`;

const ScrollPadding = styled.View`
  width: 32;
  background-color: transparent;
`;

const ProfileSectionTitle = styled(Text)`
  text-align: center;
  font-size: 12;
`;

const ProfileSectionContent = styled(Bold)`
  text-align: center;
  font-size: 14;
  margin-left: 8;
  margin-right: 8;
`;

const ProfileSectionStats = styled(Bold)`
  font-size: 26;
  text-align: center;
  color: ${theme.color.yellow};
`;

const StatisticCard = styled(Row)`
  height: 120;
  align-items: center;
  background-color: ${theme.color.white};
  padding-top: 24;
  padding-bottom: 24;
  padding-left: 32;
  padding-right: 32;
  margin-top: 12;
  border-radius: 2;
  elevation: 2;
`;

const StatisticBackground = styled.Image`
  position: absolute;
  right: 0;
  height: 120;
`;

const StatisticNum = styled(LightText)`
  font-size: 36;
`;

const StatisticUnit = styled(Bold)`
  font-size: 14;
`;


