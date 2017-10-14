// Detail of a specific item
import React from 'react';
import { ScrollView, Image, View, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
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
  DummyNavIcon,
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
export default class ItemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props.navigation.state.params;
    this.item = props.store.itemListStore.items.find(item => item.id === id);
  }

  confirm = () => {
    Alert.alert(
      'Redeem Points',
      `Are you sure to redeem ${this.item.price} points for ${this.item.name}?`,
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: this.redeem,
        }
      ]
    )
  }

  redeem = () => {
    try {
      this.item.purchaseItem();
      this.props.navigation.navigate('inventory');      
    } catch (e) {
      Alert.alert('Redeem failed', e.message);
    }
  }

  render() {
    const { goBack } = this.props.navigation;

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
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>{this.item.name}</ScreenTitle>
                </AlignCenter>
              </Flex>

              <DummyNavIcon />
            </NavBar>
          </Header>

          <Container>
            <Row style={{ marginBottom: 24 }}>
              <Image source={IconDiscount} style={{ width: 52, height: 52, marginTop: 7 }} resizeMode="contain" />
              <Flex style={{ marginLeft: 24 }}>
                <BigBold>{this.item.name}</BigBold>
                <Bold>{this.item.price} points</Bold>
                <Text>{(this.item.miles_required == 0) ? "no minimum miles required" : `required to reach ${this.item.miles_required} miles first`}</Text>
              </Flex>
            </Row>

            <Bold>Description</Bold>
            {this.item.description.split('\n').map(desc => <Text key={desc}>{desc}</Text>)}

            <Bold style={{ marginTop: 16 }}>Terms & Conditions</Bold>
            {this.item.terms.split('\n').map(desc => <Text key={desc}>{desc}</Text>)}

          </Container>
        </ScrollView>

        <FooterContainer>
          <Button title="Redeem" onPress={this.confirm} />
        </FooterContainer>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  background-color: ${theme.color.ivory};
  flex: 1;
  padding-top: 32;
  padding-left: 32;
  padding-right: 32;
  padding-bottom: 32;
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

const BigBold = styled(Bold)`
  font-size: 18;
`;

