import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import Expo, { Constants, LinearGradient } from 'expo';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';
import Timeline from 'react-native-timeline-listview'
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
import Button, { SecondaryButton } from '../components/Button';

import IconDiscount from '../assets/icons/discount.png';

@inject('store')
@observer
export default class MilestonesScreen extends React.Component {
  
  data = [
	{
		title: 'Registration',
		description: '•	You are now a KrisFlyer member\n• Get extra 500 points',
		lineColor: theme.color.yellowLight,
		done: true,
		checkpoint: true,
	},
	{
		title: 'Reach 3,000 miles',
		description: '• Get extra 1,000 points',
		lineColor: theme.color.yellowLight,
		done: true,
	},
	{
		title: 'Reach 8,000 miles',
		description: '• Get extra 2,000 points',
		lineColor: theme.color.yellowLight,
		done: true,
	},
	{
		title: 'Reach 15,000 miles',
		description: '• Get extra 4,000 points',
		lineColor: theme.color.yellowLight,
		done: true,
	},
	{
		title: 'Reach 25,000 miles',
		description: '• You are now KrisFlyer Elite Silver member\n• Get 5% extra miles when you reach 25,000 miles\n• Get extra 8,000 points',
		checkpoint: true,
		lineColor: theme.color.yellowLight,
		done: true,
	},
	{
		title: 'You are here',
		description: '26,028 points',
		user: true,
	},
	{
		title: 'Reach 35,000 miles',
		description: '• Get extra 5,000 points',
	},
	{
		title: 'Reach 50,000 miles',
		description: '• You are now KrisFlyer Elite Gold member\n• Get 10% extra miles when you reach 50,000 miles\n• Get extra 15,000 points',
		checkpoint:true,
	},
  ];

  renderCircle = (data) => {
  	if (data.checkpoint) return (
  		<TimelineCircle size={18} color={data.lineColor || undefined}>
  			<Foundation name="crown" size={12} color={theme.color.white} />
  		</TimelineCircle>
  	);

  	if (data.user) return (<TimelineCircle color={theme.color.blue} />);

  	return (<TimelineCircle color={data.lineColor || undefined} />);
  }

  renderDetail = (data, rowID) => {

  	if (data.checkpoint) {
  		return (
  			<View style={{ opacity: data.done ? 0.5 : 1 }}>
  				<CheckpointTitle>{data.title}</CheckpointTitle>
  				<Text>{data.description}</Text>
  			</View>
  		);
  	}


  	if (data.user) {
  		return (
  			<View style={{ opacity: data.done ? 0.5 : 1 }}>
	  			<UserPointer>
	  				{data.title}{' '}
	  				<Text style={{ color: theme.color.white }}>{data.description} </Text>
	  			</UserPointer>
	  		</View>
  		);
  	}

  	return (
  		<View style={{ opacity: data.done ? 0.5 : 1 }}>
			<Bold>{data.title}</Bold>
			<Text>{data.description}</Text>
		</View>
  	)
  }
	

  render() {
    const { goBack, navigate } = this.props.navigation;

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
                  <ScreenTitle color={theme.color.white} numberOfLines={1}>Quests</ScreenTitle>
                </AlignCenter>
              </Flex>

              <DummyNavIcon />
            </NavBar>

          </Header>

          <OverlapingContainer>
          	<Container>
          		<Timeline
          			data={this.data}
          			renderTime={() => null}
          			renderCircle={this.renderCircle}
          			renderDetail={this.renderDetail}
          			circleColor={theme.color.yellow}
          			lineColor={theme.color.yellow}
          			separator={false}
          		/>
          	</Container>
          </OverlapingContainer>

        </ScrollView>
      </BaseScreen>
    );
  }
}

const Container = styled.View`
  z-index: 1;
  border-radius: 4;
  margin-top: 32;
  background-color: ${theme.color.white};
  z-index: 1;
  border-radius: 4;
  margin-bottom: 32;
  margin-left: 32;
  margin-right: 32;
  padding-top: 20;
  padding-left: 20;
  padding-right: 20;
  padding-bottom: 20;
  elevation: 2;
`;

const OverlapingContainer = styled.ScrollView`
  margin-top: -144;
  padding-top: 12;
`;

const TimelineCircle = styled.View`
	position: absolute;
	width: ${props => props.size || 14};
	height: ${props => props.size || 14};
	background-color: ${props => props.color || theme.color.yellow};
	left: ${props => 21 - props.size / 2 || 14};
	border-radius: ${props => props.size / 2 || 7};
	align-items: center;
	justify-content: center;
`;

const UserPointer = styled(Bold)`
	background-color: ${theme.color.blue};
	border-radius: 20;
	padding-top: 3;
	padding-bottom: 3;
	padding-left: 12;
	padding-right: 12;
	color: ${theme.color.white};
`;

const CheckpointTitle = styled(Bold)`
	padding-top: 3;
	padding-bottom: 3;
	padding-left: 12;
	padding-right: 12;
	border-radius: 4;
	background-color: ${theme.color.yellow};
`;