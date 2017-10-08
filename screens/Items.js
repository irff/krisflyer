import React from 'react';
import { ScrollView, Image, View, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
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
export default class ItemsScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;

    return (
      <BaseScreen>
        <ScrollView style={{ flex: 1 }}>
          <Header colors={[ theme.color.black, theme.color.blue ]}>
            <NavBar>
              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                <HeaderIonicon name="md-arrow-back" size={16} color={theme.color.white} />
              </TouchableOpacity>
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Buy Items</ScreenTitle>
                </AlignCenter>
              </Flex>

              <HeaderIcon name="user" size={16} color={theme.color.white } />
            </NavBar>

            <HeaderInfoContainer style={{ marginTop: 32, marginBottom: 44 }}>
              <InfoContainer>
                <InfoTitle>Your Miles</InfoTitle>
                <NumericText>{this.props.store.userStore.user.miles}</NumericText>
              </InfoContainer>

              <VerticalDivider />

              <InfoContainer>
                <InfoTitle>Your Points</InfoTitle>
                <NumericText>{this.props.store.userStore.user.points}</NumericText>
              </InfoContainer>
            </HeaderInfoContainer>

            <SearchBoxContainer>
              <Ionicons name="ios-search" size={18} color={theme.color.yellow} />
              <SearchInput
                underlineColorAndroid="transparent"
                returnKeyType="search"
                placeholder="Search items..."
                autoCorrect={false}
                placeholderTextColor={theme.color.black}
              />
            </SearchBoxContainer>
          </Header>
          <Container>
            {this.props.store.itemListStore.items.map(item =>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigate('itemDetails', { id: item.id })}
                key={item.id}
              >
                <ItemCard>
                  <ItemCardImage source={IconDiscount} />
                  <ItemCardDescription item={item}>
                    <Bold style={{ color: item.isMilesEnough ? theme.color.black : theme.color.lightGray }}>{item.name}</Bold>
                    <Text style={{ color: item.isMilesEnough ? theme.color.black : theme.color.lightGray }}>{item.price} points</Text>
                  </ItemCardDescription>
                  <ItemCardArrow item={item}>
                    <Ionicons name="md-arrow-forward" color={theme.color.yellowLight} size={24} />
                  </ItemCardArrow>
                </ItemCard>
              </TouchableOpacity>
            )}
          </Container>
        </ScrollView>
        
        {/* <FooterContainer>
          <Button title="Redeem" />
        </FooterContainer> */}
      </BaseScreen>
    );
  }
}

const HeaderInfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.View`
  align-items: center;
  margin-right: 12;
  margin-left: 12;
`;

const InfoTitle = styled(Text)`
  color: ${theme.color.white};
  font-size: 16;
`;

const NumericText = styled(Text)`
  color: ${theme.color.white};
  font-size: 30;
`;

const VerticalDivider = styled.View`
  height: 32;
  width: 1;
  background-color: ${theme.color.white};
`;

const Container = styled.View`
  background-color: ${theme.color.white};
  flex: 1;
  padding-top: 48;
  padding-left: 32;
  padding-right: 32;
  padding-bottom: 32;
`;

const ItemCard = styled.View`
  flex-direction: row;
  flex: 1;
  border-radius: 4;
  elevation: 2;
  margin-bottom: 12;
`;

const ItemCardImage = styled.Image`
  width: 48;
  height: 48;
  margin-left: 24;
  margin-top: 24;
  margin-bottom: 24;
  margin-right: 20;
`;

const ItemCardDescription = styled.View`
  margin-top: 24;
  margin-bottom: 24;
  flex: 1;
`;

const ItemCardArrow = styled.View`
  background-color: ${props => props.item.isMilesEnough ? theme.color.yellow : theme.color.lightGray };
  padding-left: 16;
  padding-right: 16;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 4;
  border-bottom-right-radius: 4;
`;

const FooterContainer = styled.View`
  background-color: ${theme.color.white};
  padding-top: 24;
  padding-left: 32;
  padding-right: 32;
  padding-bottom: 24;
  border-color: ${theme.color.divider};
  border-top-width: 1;
`;

const SearchBoxContainer = styled.View`
  background-color: ${theme.color.white};
  elevation: 4;
  height: 56;
  padding-left: 24;
  padding-right: 24;
  border-radius: 2;
  margin-left: 20;
  margin-right: 20;
  margin-bottom: -28;

  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  margin-left: 18;
  flex: 1;
  font-family: app-regular;
  font-size: 16;
`;