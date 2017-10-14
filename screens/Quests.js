// Quest page
import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
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
import Button, { SecondaryButton } from '../components/Button';

import IconDiscount from '../assets/icons/discount.png';

@inject('store')
@observer
export default class QuestsScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;

    return (
      <BaseScreen>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Header colors={[ theme.color.black, theme.color.blue ]}>
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
          </Header>

          <Container>

            <SectionHead>
              <SectionTitle>Quests in Progress</SectionTitle>
              <Ionicons name="ios-arrow-up" size={18} color={theme.color.gray} />
            </SectionHead>

            <ItemCard>
              <Row style={{ alignItems: 'center' }}>
                <ItemCardImage source={IconDiscount} resizeMode="contain"/>
                <ItemCardDescription>
                  <BigBold numberOfLines={1}>Fly 3 times in 6 months</BigBold>
                  <Text>Rewards: <Bold>4000</Bold> points</Text>
                </ItemCardDescription>
              </Row>
              <SecondaryButton title="See Details" />
            </ItemCard>

          </Container>

          <Container />
        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  z-index: 1;
  border-radius: 4;
  margin-top: 32;
  margin-left: 32;
  margin-right: 32;
`;

const BigBold = styled(Bold)`font-size: 14;`;

const ItemCard = styled.View`
  background-color: ${theme.color.white};
  border-radius: 4;
  elevation: 2;
  margin-bottom: 12;
  padding-top: 12;
  padding-left: 12;
  padding-right: 12;
  padding-bottom: 12;
`;

const ItemCardImage = styled.Image`
  width: 40;
  height: 40;
  margin-left: 8;
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

const SectionHead = styled(Row)`
  padding-bottom: 20;
`;

const SectionTitle = styled(Bold)`
  font-size: 16;
  flex: 1;
`;


