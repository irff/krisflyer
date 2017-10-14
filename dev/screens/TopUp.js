import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';
import { CreditCardInput } from 'react-native-credit-card-input';
import Timeline from 'react-native-timeline-listview'
import theme from '../constants/theme';
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
  DummyNavIcon,
  NavBar,
  HeaderIcon,
  HeaderIonicon,
} from '../components/common';

import { formatNumber } from '../utils';
import BaseScreen from '../components/BaseScreen';
import Divider, { BorderDivider } from '../components/Divider';
import ProgressBar from '../components/ProgressBar';
import Button, { SecondaryButton } from '../components/Button';

import IconDiscount from '../assets/icons/discount.png';

import TopUpBg from '../assets/illustrations/topUp.png';

@inject('store')
@observer
export default class TopUpScreen extends React.Component {
  
  state = {
    selected: 0,
  };

  setCCInput = () => {
    console.log(this.refs);
    this.refs['ccinput'].setValues({
      number: "5555 5555 5555 4444",
      expiry: "10/22",
      cvc: "123",
      type: "master-card",
      name: this.props.store.userStore.user.name,
    })
  }

  render() {
    const { goBack, navigate } = this.props.navigation;

    const { user } = this.props.store.userStore;
    const { items: paymentItems } = this.props.store.paymentStore;

    return (
      <BaseScreen>
        <ScrollView>
          <Header colors={[ theme.color.black, theme.color.blue ]}>
            <NavBar>
              <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
                <HeaderIonicon name="md-arrow-back" size={16} color={theme.color.white} />
              </TouchableOpacity>
              
              <Flex>
                <AlignCenter>
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Top Up Points</ScreenTitle>
                </AlignCenter>
              </Flex>

              <DummyNavIcon />
            </NavBar>

          </Header>
        	
          <Container>
            <TopUpCard source={TopUpBg} resizeMode="stretch">
              <Bold style={{ fontSize: 36 }}>{formatNumber(user.points)}</Bold>
              <Text>points owned</Text>
            </TopUpCard>

            <Bold>Top Up Amounts</Bold>
            {paymentItems.map((item, idx) =>
              <SelectionCard
                key={item.id}
                selected={idx == this.state.selected}
                activeOpacity={0.75}
                onPress={() => this.setState({ selected: idx })}
              >
                <Row style={{ alignItems: 'center' }}>
                  <Flex>
                    <Row style={{ alignItems: 'baseline' }}>
                      <PointsText>{formatNumber(item.points)}</PointsText>
                      <Text style={{ marginLeft: 4 }}>pts{' '}
                        {item.bonus > 0 && <Bold>(+ {item.bonus} pts)</Bold>}
                      </Text>
                    </Row>
                  </Flex>
                  <Bold style={{ fontSize: 16 }}>$ {item.amount}</Bold>
                </Row>
              </SelectionCard>
            )}

            <Bold style={{ marginTop: 16 }}>Credit Card Details</Bold>

            <CreditCardInput
              refs="ccinput"
              allowScroll
              cardImageFront={require('../assets/illustrations/cc.png')}
              cardImageBack={require('../assets/illustrations/cc-back.png')}
            />

            <Button
              style={{ marginTop: 16 }}
              title="Top Up" 
              onPress={() => this.props.store.paymentStore.topUpPoints(paymentItems[this.state.selected], {
                number: '5555555555554444',
                expMonth: 11,
                expYear: 22,
                cvc: '223',
              })}
            />
          
          </Container>

        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  z-index: 1;
  border-radius: 4;
  margin-top: 32;
  margin-bottom: 32;
  margin-left: 32;
  margin-right: 32;
`;

const TopUpCard = styled.ImageBackground`
  padding-top: 24;
  padding-left: 24;
  padding-right: 24;
  padding-bottom: 24;
  margin-bottom: 24;
  border-radius: 4;
`;

const SelectionCard = styled.TouchableOpacity`
  padding-top: 16;
  padding-left: 24;
  padding-right: 24;
  padding-bottom: 16;
  background-color: ${theme.color.white};
  border-width: ${props => props.selected ? 1 : 0};
  border-color: ${theme.color.yellow};
  margin-top: 8;
  border-radius: 4;
  elevation: 1;
  margin-bottom: 1;
`;

const PointsText = styled(LightText)`
  font-size: 24;
`;