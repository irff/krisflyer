import React from 'react';
import { ImageBackground, ScrollView } from 'react-native';

import BaseScreen from '../components/BaseScreen';

import MilestonesMock from '../assets/mocks/milestones.jpg';

export default class MilestonesScreen extends React.Component {
	render() {
		return (
			<BaseScreen>
				<ImageBackground source={MilestonesMock} resizeMode="cover" style={{
					flex: 1,
				}} />
			</BaseScreen>
		);
	}
}