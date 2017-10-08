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
export default class QuestsScreen extends React.Component {
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
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Quests</ScreenTitle>
                </AlignCenter>
              </Flex>

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('inventory')}>
                <HeaderIcon name="user" size={16} color={theme.color.white } />
              </TouchableOpacity>
            </NavBar>

            <OverflowingContainer>

              <ItemCard>
                <ItemCardActiveIndicator active />
                <ItemCardImage source={IconDiscount} resizeMode="contain"/>
                <ItemCardDescription>
                  <BigBold numberOfLines={1}>Fly 3 times in 6 months</BigBold>
                  <Text>Rewards: <Bold>4000</Bold> points</Text>
                </ItemCardDescription>
                <ItemCardProgressView>
                  <Bold>33%</Bold>
                </ItemCardProgressView>
              </ItemCard>

              <ItemCard>
                <ItemCardActiveIndicator />
                <ItemCardImage source={IconDiscount} resizeMode="contain"/>
                <ItemCardDescription>
                  <BigBold numberOfLines={1}>Try new stopover holiday package</BigBold>
                  <Text>Rewards: <Bold>2500</Bold> points</Text>
                </ItemCardDescription>
                {/*<ItemCardProgressView>
                  <Bold>33%</Bold>
                </ItemCardProgressView>*/}
              </ItemCard>

              <ItemCard>
                <ItemCardActiveIndicator active />
                <ItemCardImage source={IconDiscount} resizeMode="contain"/>
                <ItemCardDescription>
                  <BigBold numberOfLines={1}>Shop the total of $400 in KrisFlyer partners</BigBold>
                  <Text>Rewards: <Bold>2000</Bold> points</Text>
                </ItemCardDescription>
                <ItemCardProgressView>
                  <Bold>75%</Bold>
                </ItemCardProgressView>
              </ItemCard>

              <ItemCard>
                <ItemCardActiveIndicator />
                <ItemCardImage source={IconDiscount} resizeMode="contain"/>
                <ItemCardDescription>
                  <BigBold numberOfLines={1}>Book our car rental for min. 1 day</BigBold>
                  <Text>Rewards: <Bold>1400</Bold> points</Text>
                </ItemCardDescription>
              </ItemCard>

            </OverflowingContainer>
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

const OverflowingContainer = styled.View`
  z-index: 1;
  border-radius: 4;
  margin-top: 32;
  margin-left: 32;
  margin-right: 32;
`;

const BigBold = styled(Bold)`font-size: 14;`;

const ItemCard = styled.View`
  background-color: ${theme.color.white};
  flex-direction: row;
  border-radius: 4;
  elevation: 2;
  margin-bottom: 12;
  align-items: center;
`;

const ItemCardActiveIndicator = styled.View`
  width: 4;
  background-color: ${props => (props.active ? theme.color.yellow : theme.color.white)};
  border-top-left-radius: 4;
  border-bottom-left-radius: 4;
  align-self: stretch;
`;

const ItemCardImage = styled.Image`
  width: 40;
  height: 40;
  margin-left: 20;
  margin-right: 20;
`;

const ItemCardDescription = styled.View`
  margin-top: 24;
  margin-bottom: 24;
  margin-right: 8;
  flex: 1;
`;

const ItemCardProgressView = styled.View`
  padding-top: 3;
  padding-bottom: 3;
  padding-right: 3;
  padding-left: 3;
  margin-right: 20;
  border-radius: 2;
  background-color: ${theme.color.yellow};
`;



