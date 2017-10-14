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
  state = {
    sections: [ true, false, false, false ],
  }

  toggleSection = id => () => this.setState({
    sections: [
      ...this.state.sections.slice(0, id),
      !this.state.sections[id],
      ...this.state.sections.slice(id+1),
    ],
  });

  render() {
    const { goBack, navigate } = this.props.navigation;
    const quests =  this.props.store.questListStore.quests;
    const sectionState = this.state.sections;

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
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Quests</ScreenTitle>
                </AlignCenter>
              </Flex>

              <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('inventory')}>
                <HeaderIcon name="user" size={16} color={theme.color.white } />
              </TouchableOpacity>
            </NavBar>

          </Header>

          <Container>

            <TouchableOpacity activeOpacity={0.75} onPress={this.toggleSection(0)}>
              <SectionHead>
                <SectionTitle>Quests in Progress</SectionTitle>
                <Ionicons name={`ios-arrow-${sectionState[0] ? 'up' : 'down'}`} size={18} color={theme.color.gray} />
              </SectionHead>
            </TouchableOpacity>

            {sectionState[0] &&
              quests.filter(q => q.progress > 0 && q.progress < 1 && !q.is_expired).map((quest, idx) =>
              <QuestCard key={idx}>
                <Row style={{ alignItems: 'center' }}>
                  <QuestCardImage source={IconDiscount} resizeMode="contain"/>
                  <QuestCardDescription>
                    <BigBold numberOfLines={1}>{quest.title}</BigBold>
                    <Text>Rewards: <Bold>{quest.reward}</Bold> points</Text>
                  </QuestCardDescription>
                </Row>
                <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                  <Flex>
                    <ProgressBar width={quest.progress} />
                  </Flex>
                  <Text style={{ marginLeft: 8 }}>{Math.floor(quest.progress * 100)} %</Text>
                </Row>
                <SecondaryButton title="See Details" />
              </QuestCard>
            )}

            <TouchableOpacity activeOpacity={0.75} onPress={this.toggleSection(1)}>
              <SectionHead>
                <SectionTitle>Available Quests</SectionTitle>
                <Ionicons name={`ios-arrow-${sectionState[1] ? 'up' : 'down'}`} size={18} color={theme.color.gray} />
              </SectionHead>
            </TouchableOpacity>

            {sectionState[1] &&
              quests.filter(q => q.progress === 0 && !q.is_expired).map((quest, idx) =>
              <QuestCard key={idx}>
                <Row style={{ alignItems: 'center' }}>
                  <QuestCardImage source={IconDiscount} resizeMode="contain"/>
                  <QuestCardDescription>
                    <BigBold numberOfLines={1}>{quest.title}</BigBold>
                    <Text>Rewards: <Bold>{quest.reward}</Bold> points</Text>
                  </QuestCardDescription>
                </Row>
                <SecondaryButton title="See Details" />
              </QuestCard>
            )}

            <TouchableOpacity activeOpacity={0.75} onPress={this.toggleSection(2)}>
              <SectionHead>
                <SectionTitle>Finished Quests</SectionTitle>
                <Ionicons name={`ios-arrow-${sectionState[2] ? 'up' : 'down'}`} size={18} color={theme.color.gray} />
              </SectionHead>
            </TouchableOpacity>

            {sectionState[2] &&
              quests.filter(q => q.progress === 1).map((quest, idx) =>
              <QuestCard key={idx}>
                <Row style={{ alignItems: 'center' }}>
                  <QuestCardImage source={IconDiscount} resizeMode="contain"/>
                  <QuestCardDescription>
                    <BigBold numberOfLines={1}>{quest.title}</BigBold>
                    <Text>Rewards: <Bold>{quest.reward}</Bold> points</Text>
                  </QuestCardDescription>
                </Row>
                <SecondaryButton title="See Details" />
              </QuestCard>
            )}

            <TouchableOpacity activeOpacity={0.75} onPress={this.toggleSection(3)}>
              <SectionHead>
                <SectionTitle>Expired Quests</SectionTitle>
                <Ionicons name={`ios-arrow-${sectionState[3] ? 'up' : 'down'}`} size={18} color={theme.color.gray} />
              </SectionHead>
            </TouchableOpacity>

            {sectionState[3] &&
              quests.filter(q => q.progress < 1 && q.is_expired).map((quest, idx) =>
              <QuestCard key={idx}>
                <Row style={{ alignItems: 'center' }}>
                  <QuestCardImage source={IconDiscount} resizeMode="contain"/>
                  <QuestCardDescription>
                    <BigBold numberOfLines={1}>{quest.title}</BigBold>
                    <Text>Rewards: <Bold>{quest.reward}</Bold> points</Text>
                  </QuestCardDescription>
                </Row>

                {quest.progress > 0 &&
                  <Row style={{ alignItems: 'center', marginBottom: 16 }}>
                    <Flex>
                      <ProgressBar width={quest.progress} disabled />
                    </Flex>
                    <Text style={{ marginLeft: 8 }}>{Math.floor(quest.progress * 100)} %</Text>
                  </Row>}
                <SecondaryButton title="See Details" />
              </QuestCard>
            )}

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

const QuestCard = styled.View`
  background-color: ${theme.color.white};
  border-radius: 4;
  elevation: 2;
  margin-bottom: 12;
  padding-top: 12;
  padding-left: 12;
  padding-right: 12;
  padding-bottom: 12;
`;

const QuestCardImage = styled.Image`
  width: 40;
  height: 40;
  margin-left: 8;
  margin-right: 20;
`;

const QuestCardDescription = styled.View`
  margin-top: 24;
  margin-bottom: 24;
  margin-right: 8;
  flex: 1;
`;

const QuestCardProgressView = styled.View`
  padding-top: 3;
  padding-bottom: 3;
  padding-right: 3;
  padding-left: 3;
  margin-right: 20;
  border-radius: 2;
  background-color: ${theme.color.yellow};
`;

const SectionHead = styled(Row)`
  margin-top: 8;
  padding-bottom: 20;
`;

const SectionTitle = styled(Bold)`
  font-size: 16;
  flex: 1;
`;


