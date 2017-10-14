import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import { Text, Bold } from './common';

const PrimaryButton = (props) => (
	<TouchableOpacity activeOpacity={0.7} {...props}>
		<Button>
			<ButtonText>{props.title}</ButtonText>
		</Button>
	</TouchableOpacity>
);

export const SecondaryButton = (props) => (
	<TouchableOpacity activeOpacity={0.7} {...props}>
		<Button secondary>
			<SecondaryButtonText>{props.title}</SecondaryButtonText>
		</Button>
	</TouchableOpacity>
);

const Button = styled.View`
	background-color: ${props => props.secondary ? theme.color.canvas : theme.color.yellow};
	border-radius: 4;
	align-items: center;
	padding-top: 6;
	padding-bottom: 6;
`;

const ButtonText = styled(Bold)`font-size: 14;`;
const SecondaryButtonText = styled(Text)`font-size: 14;`;

export default PrimaryButton;