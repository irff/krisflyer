import React from 'react';
import { Image, ScrollView } from 'react-native';

import BaseScreen from '../components/BaseScreen';

import MilestonesMock from '../assets/mocks/milestones.jpg';

export default class MilestonesScreen extends React.Components {
	render() {
		return (
			<BaseScreen>
				<ScrollView style={{ flex: 1 }} >
					<Image source={MilestonesMock} /> 
				</ScrollView>
			</BaseScreen>
		);
	}
}