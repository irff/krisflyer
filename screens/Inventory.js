// Inventory Screen of a specific User (having multiple items)
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
export default class InventoryScreen extends React.Component {
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
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Owned Items</ScreenTitle>
                </AlignCenter>
              </Flex>

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('inventory')}>
                <HeaderIcon name="user" size={16} color={theme.color.white } />
              </TouchableOpacity>
            </NavBar>
          </Header>

          <Container>
            <HeadingNavigation>
              <Subheading>Active Items</Subheading>
              <Text>See all ></Text>
            </HeadingNavigation>

            <ScrollView horizontal style={{ marginLeft: -24, marginRight: -24 }}>
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
            </ScrollView>


            <HeadingNavigation style={{ marginTop: 12 }}>
              <Subheading>Used / Expired Items</Subheading>
              <Text>See all ></Text>
            </HeadingNavigation>

            <ScrollView horizontal style={{ marginLeft: -24, marginRight: -24 }}>
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
            </ScrollView>

          </Container>
        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  background-color: ${theme.color.white};
  flex: 1;
  padding-top: 32;
  padding-left: 32;
  padding-right: 32;
  padding-bottom: 32;
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


